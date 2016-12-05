const routes = ($routeProvider, $httpProvider) => {

    $routeProvider
        .when('/', {
            templateUrl: 'views/accueil.html',
            controller: 'mainController',
            controllerAs: 'vm'
        })
        .when('/campus', {
            templateUrl: 'views/campus.html',
            controller: 'mainController',
            controllerAs: 'vm'
        })
        .when('/offre', {
            templateUrl: 'views/offre.html',
            controller: 'mainController',
            controllerAs: 'vm',
        })
        .when('/partenaires', {
            templateUrl: 'views/partenaires.html',
            controller: 'mainController',
            controllerAs: 'vm',
        })
        .when('/candidatures', {
            templateUrl: 'views/candidatures.html',
            controller: 'mainController',
            controllerAs: 'vm',
        })
        .when('/rejoindre', {
            templateUrl: 'views/rejoindre.html',
            controller: 'mainController',
            controllerAs: 'vm',
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'loginController',
            controllerAs: 'vm'
        })
        .otherwise({
            redirectTo: '/'
        })

    $httpProvider.interceptors.push(($q, $location, $rootScope, $window, sessionFactory) => {
        retur.when('/deletePartenaire', {
                templateUrl: 'views/admin/deletePartenaire.html',
                controller: 'deletePartenaire',
                controllerAs: 'vm',
                resolve: {
                    connected: checkIsConnected
                }
            })
            .otherwise({
                redirectTo: '/'
            }) n {
                request(config) {

                        config.headers = config.headers || {};
                        if ($window.localStorage.token) {
                            sessionFactory.token = $window.localStorage.token
                            sessionFactory.user = JSON.parse($window.localStorage.getItem('currentUser'));
                            config.headers.authorization = $window.localStorage.token
                        }
                        return config
                    },
                    responseError(response) {
                        if (response.status === 401 || response.status === 403) {
                            $rootScope.$emit('loginStatusChanged', false);
                            $location.path('/login')
                        }
                        return $q.reject(response)
                    }
            }
    })

}

const loginStatus = ($rootScope, $window, sessionFactory) => {

    if ($window.localStorage.currentUser) {
        sessionFactory.user = JSON.parse($window.localStorage.getItem('currentUser'));
    }

    $rootScope.$on('loginStatusChanged', (event, isLogged) => {
        $window.localStorage.setItem('currentUser', JSON.stringify(sessionFactory.user));
        $window.localStorage.token = sessionFactory.token;
        sessionFactory.isLogged = isLogged;
    })

}

const checkIsConnected = ($q, $http, $location, $window, $rootScope) => {
    let deferred = $q.defer()

    $http.get('/api/loggedin').success(() => {
        $rootScope.$emit('loginStatusChanged', true);
        // Authenticated
        deferred.resolve()
    }).error(() => {
        $window.localStorage.removeItem('token');
        $window.localStorage.removeItem('currentUser');
        $rootScope.$emit('loginStatusChanged', false);
        // Not Authenticated
        deferred.reject()
        $location.url('/login')
    })

    return deferred.promise
}
