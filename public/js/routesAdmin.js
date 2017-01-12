const routes = ($routeProvider, $httpProvider) => {
    $routeProvider
        .when('/', {
            templateUrl: '../views/admin/main.html',
        })
        .when('/login', {
            templateUrl: '../views/admin/login.html',
            controller: 'loginController',
            controllerAs: 'vm'
        })
        .when('/accueil', {
            templateUrl: '../views/admin/accueil.html',
        })
        .when('/campus', {
            templateUrl: '../views/admin/campus.html',
            controller: 'campusController',
            controllerAs: 'vm'
        })
        .when('/offres', {
            templateUrl: '../views/admin/offres.html',
            controller: 'offreController',
            controllerAs: 'vm'
        })
        .when('/partenaires', {
            templateUrl: '../views/admin/partenaires.html',
            controller: 'partnerController',
            controllerAs: 'vm'
        })
        .when('/news', {
            templateUrl: '../views/admin/news.html',
            controller: 'newsController',
            controllerAs: 'vm'
        })
        .otherwise({
            redirectTo: '/'
        });

    $httpProvider.interceptors.push(($q, $location, $rootScope, $window, sessionFactory) => {
        return {
            request(config) {

                config.headers = config.headers || {};
                if ($window.localStorage.token) {
                    sessionFactory.token = $window.localStorage.token;
                    sessionFactory.user = JSON.parse($window.localStorage.getItem('currentUser'));
                    config.headers.authorization = $window.localStorage.token;
                }
                return config;
            },
            responseError(response) {
                if (response.status === 401 || response.status === 403) {
                    $rootScope.$emit('loginStatusChanged', false);
                    $location.path('/login');
                }
                return $q.reject(response);
            }
        };
    });
};

const loginStatus = ($rootScope, $window, sessionFactory) => {

    if ($window.localStorage.currentUser) {
        sessionFactory.user = JSON.parse($window.localStorage.getItem('currentUser'));
    }

    $rootScope.$on('loginStatusChanged', (event, isLogged) => {
        $window.localStorage.setItem('currentUser', JSON.stringify(sessionFactory.user));
        $window.localStorage.token = sessionFactory.token;
        sessionFactory.isLogged = isLogged;
    });
};

const checkIsConnected = ($q, $http, $location, $window, $rootScope) => {
    let deferred = $q.defer();

    $http.get('/api/loggedin').success(() => {
        $rootScope.$emit('loginStatusChanged', true);
        // Authenticated
        deferred.resolve();
    }).error(() => {
        $window.localStorage.removeItem('token');
        $window.localStorage.removeItem('currentUser');
        $rootScope.$emit('loginStatusChanged', false);
        // Not Authenticated
        deferred.reject();
        $location.url('/login');
    });

    return deferred.promise;
};
