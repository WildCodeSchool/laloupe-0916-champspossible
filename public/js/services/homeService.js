function homeService($http) {

    this.$http = $http;

    this.create = (data) => {
        return this.$http.post('/api/home', data);
    };

    this.getAll = () => {
        return this.$http.get('/api/home');
    };

    this.getOne = (id) => {
        return this.$http.get('/api/home/' + id);
    };

    this.update = (id, data) => {
        return this.$http.put('/api/home/' + id, data);
    };

    this.delete = (id) => {
        return this.$http.delete('/api/home/' + id);
    };

}
