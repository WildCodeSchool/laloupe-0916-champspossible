function mainController(campusService) {

    this.campusService = campusService;

    this.load = () => {
        this.campusService.getAll().then((res) => {
            this.campuss = res.data;
        });
    };

    this.create = () => {
        this.campusService.create(this.campus).then(() => {
            this.campus = '';
            this.load();
        });
    };

    this.update = (campus) => {
        this.campusService.update(campus._id, campus.titre, campus.texte, campus.logo, campus.ordre, campus.filtre).then(() => {
            this.load();
        });
    };

    this.delete = (campus) => {
        this.campusService.delete(campus._id).then(() => {
            this.load();
        });
    };
}
