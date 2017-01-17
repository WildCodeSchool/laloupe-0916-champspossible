function homeController(partnerService, newsService, $timeout) {

    this.partnerService = partnerService;
    this.newsService = newsService;

    this.greaterThan = function(prop, val) {

        return function(item) {
            return item[prop] > val;
        }
    }

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
            constrain_width: false, // Does not change width of dropdown to that of the activator
            hover: true, // Activate on hover
            gutter: 0, // Spacing from edge
            belowOrigin: false, // Displays dropdown below the button
            alignment: 'left' // Displays dropdown with edge aligned to the left of button
        });

        $(".button-collapse").sideNav();

    });
}
