function homeService($http) {

    this.$http = $http;

    this.create = (data) => {
        return this.$http.put('/api/homes/', data);
    };

    this.getAll = () => {
        return this.$http.get('/api/homes');
    };

    this.getOne = (id) => {
        return this.$http.get('/api/homes/' + id);
    };

    this.update = (id, data) => {
        return this.$http.put('/api/homes/' + id, data);
    };

    this.delete = (id) => {
        return this.$http.delete('/api/homes/' + id);
    };
}
