function campusController(campusService) {

    this.campusService = campusService;

    this.load = () => {
        this.campusService.getAll().then((res) => {
            this.campuss = res.data;
        });
    };

}
