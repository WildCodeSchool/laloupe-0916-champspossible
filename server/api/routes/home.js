import express from 'express';
import Home from '../models/home.js';
import Auth from '../middlewares/authorization.js';

let router = express.Router();

module.exports = (app) => {

    var home = new Home();

    router.get('/', home.findAll);

    router.get('/:id', home.findById);

    router.post('/', home.create);

    router.put('/:id', home.update);

    router.delete('/:id', home.delete);

    app.use('/home', router);

};
