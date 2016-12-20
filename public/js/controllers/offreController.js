function offreController(offreService) {

    this.offreService = offreService;

    this.load = () => {
        this.offreService.getAll().then((res) => {
            this.offres = res.data;
        });
    };
}
