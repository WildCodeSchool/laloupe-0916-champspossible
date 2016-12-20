const routes = ($routeProvider, $httpProvider) => {
    $routeProvider
        .when('/', {
            templateUrl: 'views/accueil.html',
            controller: 'homeController',
            controllerAs: 'vm'
        })
        .when('/campus', {
            templateUrl: 'views/campus.html',
            controller: 'campusController',
            controllerAs: 'vm'
        })
        .when('/actualites', {
            templateUrl: 'views/actualites.html',
        })
        .when('/offres', {
            templateUrl: 'views/offres.html',
            controller: 'offreController',
            controllerAs: 'vm',
        })
        .when('/partenaires', {
            templateUrl: 'views/partenaires.html',
            controller: 'partnerController',
            controllerAs: 'vm',
        })
        .when('/candidatures', {
            templateUrl: 'views/candidatures.html',
            // controller: 'mainController',
            // controllerAs: 'vm',
        })
        .when('/rejoindre', {
            templateUrl: 'views/rejoindre.html',
            // controller: 'mainController',
            // controllerAs: 'vm',
        })
        .otherwise({
            redirectTo: '/'
        })
};
