function homeController(homeService, $timeout) {

    this.homeService = homeService;

    this.load = () => {
        this.homeService.getAll().then((res) => {
            this.homes = res.data;
        });
    };

    this.load();

    this.create = () => {
        this.homeService.create(this.home).then(() => {
            this.home = '';
            this.load();
        });
    };

    this.update = (home, index) => {
        if (home.ordre == 0 || (home.ordre <= this.homes.filter(function(obj) {
                return obj.ordre != 0;
            }).length && this.homes.filter(function(obj) {
                return obj.ordre != 0 && obj.ordre == home.ordre;
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

                        home.logo = urlImage;
                        this.homeService.update(home._id, home).then(() => {
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
                this.homeService.update(home._id, home).then(() => {
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


    this.delete = (home) => {
        this.homeService.delete(home._id).then(() => {
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
