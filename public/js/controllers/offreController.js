function offreController(offreService, $routeParams) {

    this.offreService = offreService;
    this.filter = '';
    if($routeParams.filter) {
      this.filter = $routeParams.filter;
    }
    this.load = () => {
        this.offreService.getAll().then((res) => {
            this.offres = res.data;
        });
    };

    this.load();
}
