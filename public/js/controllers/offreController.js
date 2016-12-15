function mainController(offreService) {

    this.offreService = offreService;

    this.load = () => {
        this.offreService.getAll().then((res) => {
            this.offres = res.data;
        });
    };

    this.create = () => {
        this.offreService.create(this.offre).then(() => {
            this.offre = '';
            this.load();
        });
    };

    this.update = (offre) => {
        this.offreService.update(offre._id, offre.titre, offre.texte, offre.logo, offre.ordre, offre.filtre).then(() => {
            this.load();
        });
    };

    this.delete = (offre) => {
        this.offreService.delete(offre._id).then(() => {
            this.load();
        });
    };
}
