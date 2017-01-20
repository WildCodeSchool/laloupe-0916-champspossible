function offreController(offreService, $routeParams) {

    this.offreService = offreService;
    this.$routeParams = $routeParams

    this.load = () => {
        this.offreService.getAll().then((res) => {
            this.offres = res.data;
        });
    };

    this.load()

    this.offreFilter = (query) => {
        this.offreService.getAll().then((res) => {
            this.offres = res.data;
            console.log(this.offres[0]);
            // for (var i = 0; i < this.offres.length; i++) {
            //     if ((this.offres[i].filtre).match(query)) {
            //         this.offres.splice(i, 1)
            //
            //         console.log(this.offres[i])
            //     }
            //
            // }
        });
    };

    this.offreFilter($routeParams.query);
}
