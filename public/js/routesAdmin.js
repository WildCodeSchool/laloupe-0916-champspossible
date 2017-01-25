const routes = ($routeProvider, $httpProvider) => {
    $routeProvider
        .when('/', {
            templateUrl: '../views/admin/main.html',
            resolve: {
                connected: checkIsConnected
            }
        })
        .when('/login', {
            templateUrl: '../views/admin/login.html',
            controller: 'loginController',
            controllerAs: 'vm'
        })
        .when('/accueil', {
            templateUrl: '../views/admin/accueil.html',
            controller: 'homeController',
            controllerAs: 'vm',
            resolve: {
                connected: checkIsConnected
            }
        })
        .when('/offres', {
            templateUrl: '../views/admin/offres.html',
            controller: 'offreController',
            controllerAs: 'vm',
            resolve: {
                connected: checkIsConnected
            }
        })
        .when('/partenaires', {
            templateUrl: '../views/admin/partenaires.html',
            controller: 'partnerController',
            controllerAs: 'vm',
            resolve: {
                connected: checkIsConnected
            }
        })
        .when('/news', {
            templateUrl: '../views/admin/news.html',
            controller: 'newsController',
            controllerAs: 'vm',
            resolve: {
                connected: checkIsConnected
            }
        })
        .when('/ephemere', {
            templateUrl: '../views/admin/ephemere.html',
            controller: 'ephemereController',
            controllerAs: 'vm',
            resolve: {
                connected: checkIsConnected
            }
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

    $http.get('/api/loggedin').then(() => {
        $rootScope.$emit('loginStatusChanged', true);
        // Authenticated
        deferred.resolve();
    }).catch(() => {
        $window.localStorage.removeItem('token');
        $window.localStorage.removeItem('currentUser');
        $rootScope.$emit('loginStatusChanged', false);
        // Not Authenticated
        deferred.reject();
        $location.url('/login');
    });

    return deferred.promise;
};
