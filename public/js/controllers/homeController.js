function homeController(partnerService, newsService, $timeout) {

    this.partnerService = partnerService;
    this.newsService = newsService;


    this.load = () => {
        this.partnerService.getAll().then((res) => {
            this.partners = res.data;
        });

        this.newsService.getAll().then((res) => {
            this.news = res.data;

            $timeout(() => {
                $('.carousel').carousel({
                    dist: 0,
                    shift: 0,
                    padding: 120,
                });
                autoplay();

                function autoplay() {
                    $('.carousel').carousel('next');
                    setTimeout(autoplay, 4500);
                }
            });
        });
    };

    this.load();

    $(document).ready(function() {
        $('.slider').slider({
            full_width: true,
            full_height: true
        });

        $('.dropdown-button').dropdown({
            inDuration: 300,
            outDuration: 225,
            constrain_width: false,
            hover: true,
            gutter: 0,
            belowOrigin: false,
            alignment: 'left'
        });

        $(".button-collapse").sideNav();

    });
}
