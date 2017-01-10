function partnerController(partnerService, $timeout) {

    this.partnerService = partnerService;

    this.load = () => {
        this.partnerService.getAll().then((res) => {
            this.partners = res.data;
            $timeout(() => {
                $('.dropdown-button').dropdown({
                    inDuration: 300,
                    outDuration: 225,
                    constrain_width: false, // Does not change width of dropdown to that of the activator
                    hover: true, // Activate on hover
                    gutter: 0, // Spacing from edge
                    belowOrigin: false, // Displays dropdown below the button
                    alignment: 'left' // Displays dropdown with edge aligned to the left of button
                });

                $(".button-collapse").sideNav();
            }, 0);
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
                    $timeout(() => {this.load();}, 500)
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
