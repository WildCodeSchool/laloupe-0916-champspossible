function partnerController(partnerService) {

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
        var uploadfiles = document.querySelector('#uploadImage-' + index);
        var files = uploadfiles.files;
        for (var i = 0; i < files.length; i++) {
            var url = '/api/picture';
            var xhr = new XMLHttpRequest();
            var fd = new FormData();
            xhr.open("POST", url, true);
            xhr.onload = () => {
                var urlImage = '/uploads/img_' + document.getElementById('uploadImage-' + index).value.split(/(\|\/)/g).pop().replace('C:\\fakepath\\', '');
                partner.logo = urlImage;
                this.partnerService.update(partner._id, partner).then(() => {
                    this.load();
                    // $route.reload();
                });
            };
            fd.append("upload_file", files[i]);
            xhr.send(fd);
        }
    }

    this.delete = (partner) => {
        this.partnerService.delete(partner._id).then(() => {
            this.load();
        });
    };
}
