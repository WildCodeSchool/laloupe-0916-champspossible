function partnerController(partnerService, $timeout) {

    this.partnerService = partnerService;

    this.load = () => {
        this.partnerService.getAll().then((res) => {
            this.partners = res.data;
        });
    };

    this.load();

    this.create = () => {
        this.partnerService.create(this.partner).then(() => {
            this.partner = '';
            this.load();
        });
    };

    this.update = (partner, index) => {
            if (partner.sortAccueil == 0 || (partner.sortAccueil <= this.partners.filter(function(obj) {
                return obj.sortAccueil != 0;
            }).length && this.partners.filter(function(obj) {
                return obj.sortAccueil != 0 && obj.sortAccueil == partner.sortAccueil;
            }).length === 1)) {
            var uploadfiles = document.querySelector('#uploadImage-' + index);
            var files = uploadfiles.files;
            if (files.length > 0) {
                for (var i = 0; i < files.length; i++) {
                    var url = '/api/picture';
                    var xhr = new XMLHttpRequest();
                    var fd = new FormData();
                    xhr.open("POST", url, true);
                    xhr.onload = () => {
                        var urlImage = '/uploads/img_' + document.getElementById('uploadImage-' + index).value.split(/(\|\/)/g).pop().replace('C:\\fakepath\\', '');

                        partner.logo = urlImage;
                        console.log(partner);
                        this.partnerService.update(partner._id, partner).then(() => {
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
                this.partnerService.update(partner._id, partner).then(() => {
                    // $timeout(() => {
                    this.load();
                    // }, 1000)
                    // $route.reload();

                });
            }
        } else {
            alert('Ordre de tri invalide');
        }
    };

    this.delete = (partner) => {
        this.partnerService.delete(partner._id).then(() => {
            this.load();
        });
    };

    var openFile = function(event) {
        var input = event.target;

        var reader = new FileReader();
        reader.onload = function() {
            var output = document.getElementById('output');
            var dataURL = reader.result;
            output.src = dataURL;
        };
        reader.readAsDataURL(input.files[0]);
    };

}
