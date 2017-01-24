function offreService($http) {

    this.$http = $http;

    this.create = (data) => {
        return this.$http.post('/api/offre', data);
    };

    this.getAll = () => {
        return this.$http.get('/api/offre');
    };

    this.getOne = (id) => {
        return this.$http.get('/api/offre/' + id);
    };

    this.update = (id, data) => {
        return this.$http.put('/api/offre/' + id, data);
    };

    this.delete = (id) => {
        return this.$http.delete('/api/offre/' + id);
    };

}
