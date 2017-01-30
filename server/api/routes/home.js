import express from 'express';
import Home from '../models/home.js';
import Auth from '../middlewares/authorization.js';

let router = express.Router();

module.exports = (app) => {

    var home = new Home();

    router.get('/', home.findAll);

    router.get('/:id', home.findById);

    router.post('/', Auth.hasAuthorization, home.create);

    router.put('/:id', Auth.hasAuthorization, home.update);

    router.delete('/:id', Auth.hasAuthorization, home.delete);

    app.use('/home', router);

};
