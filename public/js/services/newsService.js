function newsService($http) {

    this.$http = $http;

    this.createNews = (data) => {
        return this.$http.post('/api/news', data);
    };

    this.getAllNews = () => {
        return this.$http.get('/api/news');
    };

    this.getOneNews = (id) => {
        return this.$http.get('/api/news/' + id);
    };

    this.updateNews = (id, data) => {
        return this.$http.put('/api/news/' + id, data);
    };

    this.deleteNews = (id) => {
        return this.$http.delete('/api/news/' + id);
    };

}
