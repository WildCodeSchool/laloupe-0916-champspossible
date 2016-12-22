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

    this.update = (partner) => {
        this.partnerService.update(partner._id, partner).then(() => {
            this.load();
        });
    };

    this.delete = (partner) => {
        this.partnerService.delete(partner._id).then(() => {
            this.load();
        });
    };
}
