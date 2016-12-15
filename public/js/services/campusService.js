function campusService($http) {

    this.$http = $http;

    this.create = (data) => {
        return this.$http.post('/api/campus', data)
    }

    this.getAll = () => {
        return this.$http.get('/api/campus')
    }

    this.getOne = (id) => {
        return this.$http.get('/api/campus/' + id)
    }

    this.update = (id, data) => {
        return this.$http.put('/api/campus/' + id, data)
    }

    this.delete = (id) => {
        return this.$http.delete('/api/campus/' + id)
    }

}
