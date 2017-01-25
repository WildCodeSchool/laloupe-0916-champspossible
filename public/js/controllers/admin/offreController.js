function offreController(offreService, $timeout) {

    this.offreService = offreService;
    this.query = '';
    this.order = '-_id';
    this.load = () => {
        this.offreService.getAll().then((res) => {
            this.offres = res.data;
        });
    };
    this.load();

    this.create = () => {
            this.offreService.create({order: 0, filtre: ''}).then(() => {
            this.load();
        });
    };

    this.update = (offre, index) => {
        if (offre.ordre == 0 || (offre.ordre <= this.offres.filter(function(obj) {
                return obj.ordre != 0;
            }).length && this.offres.filter(function(obj) {
                return obj.ordre != 0 && obj.ordre == offre.ordre;
            }).length === 1)) {
            var uploadfiles = document.querySelector('#uploadImage-' + index);
            var files = uploadfiles.files;
            if (files.length > 0) {
                for (var i = 0; i < files.length; i++) {
                    var url = '/api/picture2';
                    var xhr = new XMLHttpRequest();
                    var fd = new FormData();
                    xhr.open("POST", url, true);
                    xhr.onload = () => {
                        var urlImage = '/uploads/img_' + document.getElementById('uploadImage-' + index).value.split(/(\|\/)/g).pop().replace('C:\\fakepath\\', '');
                        offre.logo = urlImage;
                        this.offreService.update(offre._id, offre).then(() => {
                            $timeout(() => {
                                this.load();
                            }, 1000);
                            // $route.reload();

                        });
                    };
                    fd.append("upload_file", files[i]);
                    xhr.send(fd);
                }
            } else {
                this.offreService.update(offre._id, offre).then(() => {
                    this.load();
                });
            }
        } else {
            alert('Ordre de tri invalide');
        }
    };
    this.delete = (offre) => {
        this.offreService.delete(offre._id).then(() => {
            this.load();
        });
    };

}
