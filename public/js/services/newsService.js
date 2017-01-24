function newsService($http) {
    this.$http = $http;

    this.create = (data) => {
        return this.$http.post('/api/news/', data);
    };

    this.getAll = () => {
        return this.$http.get('/api/news');
    };

    this.getOne = (id) => {
        return this.$http.get('/api/news/' + id);
    };

    this.update = (id, data) => {
        return this.$http.put('/api/news/' + id, data);
    };

    this.delete = (id) => {
        return this.$http.delete('/api/news/' + id);
    };

}
