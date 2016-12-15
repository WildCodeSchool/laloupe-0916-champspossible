function homeController(homeService) {

    this.homeService = homeService;

    this.load = () => {
        this.homeService.getAll().then((res) => {
            this.homes = res.data;
        });
    };

    this.create = () => {
        this.homeService.create(this.home).then(() => {
            this.home = '';
            this.load();
        });
    };

    this.update = (home) => {
        this.homeService.update(home._id, home.lienImg, home.lienClick, home.ordre).then(() => {
            this.load();
        });
    };

    this.delete = (home) => {
        this.homeService.delete(home._id).then(() => {
            this.load();
        });
    };
  }
