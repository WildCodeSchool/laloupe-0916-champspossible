function ephemereController(ephemereService) {

    this.ephemereService = ephemereService;

    this.load = () => {
        this.ephemereService.getAll().then((res) => {
            this.ephemeres = res.data;
        });
    };
    this.load();

    this.create = () => {
        this.ephemereService.create(this.ephemere).then(() => {
            this.ephemere = '';
            this.load();
        });
    };

    this.update = (ephemere, index) => {
        this.ephemereService.update(ephemere._id, ephemere).then(() => {
            this.load();
        });
    };

    this.delete = (ephemere) => {
        this.ephemereService.delete(ephemere._id).then(() => {
            this.load();
        });
    };
}
