class navbarController {

    constructor(sessionFactory, $rootScope, $window, $location, ephemereService) {
        this.isLogged = sessionFactory.isLogged;
        this.sessionFactory = sessionFactory;
        this.$rootScope = $rootScope;
        this.$location = $location;
        this.ephemereService = ephemereService;
        this.load();
        $rootScope.$on('loginStatusChanged', (event, isLogged) => {
            this.isLogged = isLogged;
            this.user = sessionFactory.user;
        });
    }

    load() {
        this.ephemereService.getAll().then((res) => {
            this.ephemeres = res.data;
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
