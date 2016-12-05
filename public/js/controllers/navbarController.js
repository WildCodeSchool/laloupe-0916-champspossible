class navbarController {

    constructor(sessionFactory, $rootScope, $window, $location) {
        this.isLogged = sessionFactory.isLogged;
        this.sessionFactory = sessionFactory;
        this.$rootScope = $rootScope;
        this.$location = $location;
        $(".button-collapse").sideNav();
        $('.js-scrollTo').on('click', function() { // Au clic sur un élément
            var page = $(this).attr('href'); // Page cible
            var speed = 500; // Durée de l'animation (en ms)
            $('html, body').animate({
                scrollTop: $(page).offset().top - 100
            }, speed); // Go
            return false;
        });
        $(window).scroll(function() {
            if ($(window).scrollTop() > $('#accueil').height()) {
                $('.navbar-fixed').addClass('navbar-color');
            }
            if ($(window).scrollTop() < $('#accueil').height()) {
                $('.navbar-fixed').removeClass('navbar-color');
            }
        });
        $rootScope.$on('loginStatusChanged', (event, isLogged) => {
            this.isLogged = isLogged;
            this.user = sessionFactory.user;
        });
    }

    logout() {
        this.sessionFactory.isLogged = false;
        this.sessionFactory.user = {};
        this.sessionFactory.token = null;
        this.$rootScope.$emit('loginStatusChanged', false);
        this.isLogged = false;
        this.$location.path('/login');
    }

}
