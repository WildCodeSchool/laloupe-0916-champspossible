function navbarController(sessionFactory, $rootScope, $window, $location, ephemereService) {

    this.isLogged = sessionFactory.isLogged;
    this.sessionFactory = sessionFactory;
    this.ephemereService = ephemereService;
    this.$rootScope = $rootScope;
    this.$location = $location;

    $rootScope.$on('loginStatusChanged', (event, isLogged) => {
        this.isLogged = isLogged;
        this.user = sessionFactory.user;
    });

    this.logout = () => {
        this.sessionFactory.isLogged = false;
        this.sessionFactory.user = {};
        this.sessionFactory.token = null;
        this.$rootScope.$emit('loginStatusChanged', false);
        this.isLogged = false;
        this.$location.path('/login');
    };

    this.load = () => {
        this.ephemereService.getAll().then((res) => {
            this.ephemeres = res.data;
        });
    }

    this.load();

}
