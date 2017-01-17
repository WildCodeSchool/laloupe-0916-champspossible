function newsController(newsService) {

    this.newsService = newsService;

    this.load = () => {
        this.newsService.getAll().then((res) => {
            this.newss = res.data;
        });
    };

}
