function partnerController(partnerService, $timeout) {

    this.partnerService = partnerService;
    this.filter = '';

    this.load = () => {
        this.partnerService.getAll().then((res) => {
            this.partners = res.data;
            $(".button-collapse").sideNav();
        });
    };

    this.load();
    $(document).ready(function() {});
}
