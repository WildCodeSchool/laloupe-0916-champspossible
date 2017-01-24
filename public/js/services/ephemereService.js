function ephemereService($http) {

    this.$http = $http;

    this.create = (data) => {
        return this.$http.post('/api/ephemere', data);
    };

    this.getAll = () => {
        return this.$http.get('/api/ephemere');
    };

    this.getOne = (id) => {
        return this.$http.get('/api/ephemere/' + id);
    };

    this.update = (id, data) => {
        return this.$http.put('/api/ephemere/' + id, data);
    };

    this.delete = (id) => {
        return this.$http.delete('/api/ephemere/' + id);
    };

}
