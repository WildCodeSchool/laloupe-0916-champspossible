const routes = ($routeProvider) => {
    $routeProvider
        .when('/', {
            templateUrl: 'views/accueil.html',
            controller: 'homeController',
            controllerAs: 'vm'
        })
        .when('/campus', {
            templateUrl: 'views/campus.html',
        })

        .when('/offres', {
            templateUrl: 'views/offres.html',
            controller: 'offreController',
            controllerAs: 'vm',
        })

        .when('/offres/:filter', {
            templateUrl: 'views/offres.html',
            controller: 'offreController',
            controllerAs: 'vm',
        })

        // .when('/offres/:query', {
        //     templateUrl: 'views/offres.html',
        //     controller: 'offreController',
        //     controllerAs: 'vm',
        // })

        .when('/partenaires', {
            templateUrl: 'views/partenaires.html',
            controller: 'partnerController',
            controllerAs: 'vm',
        })
        .when('/candidatures', {
            templateUrl: 'views/candidatures.html',
            // controller: '',
            // controllerAs: 'vm',
        })
        .when('/rejoindre', {
            templateUrl: 'views/rejoindre.html',
            // controller: '',
            // controllerAs: 'vm',
        })
        .otherwise({
            redirectTo: '/'
        });
};
