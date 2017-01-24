function partnerService($http) {

    this.$http = $http;

    this.create = (data) => {
        return this.$http.post('/api/partners/', data );
    };

    this.getAll = () => {
        return this.$http.get('/api/partners');
    };

    this.getOne = (id) => {
        return this.$http.get('/api/partners/' + id);
    };

    this.update = (id, data) => {
        return this.$http.put('/api/partners/' + id, data);
    };

    this.delete = (id) => {
        return this.$http.delete('/api/partners/' + id);
    };

}
