function homeController(partnerService, newsService, homeService, offreService, $timeout) {

    this.partnerService = partnerService;
    this.newsService = newsService;
    this.homeService = homeService;
    this.offreService = offreService;

    this.transfert = (filtre) => {
        localStorage.setItem("filtre", filtre);
    };

    this.greaterThan = function(prop, val) {
        return function(item) {
            return item[prop] > val;
        };
    };

    this.load = () => {
        this.partnerService.getAll().then((res) => {
            this.partners = res.data;
        });

        this.homeService.getAll().then((res) => {
            this.homes = res.data;
            $timeout(() => {
                function autoplay() {
                    $('.carousel').carousel('next');
                    setTimeout(autoplay, 4500);
                }
                $('.carousel').carousel({
                    dist: 0,
                    shift: 0,
                    padding: 120,
                });
                autoplay();
            }, 0);
        });

        this.newsService.getAll().then((res) => {
            this.newss = res.data;
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
