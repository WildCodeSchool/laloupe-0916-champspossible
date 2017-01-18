import express from 'express';
import Ephemere from '../models/ephemere.js';
import Auth from '../middlewares/authorization.js';

let router = express.Router();

module.exports = (app) => {

    var ephemere = new Ephemere();

    router.get('/', ephemere.findAll);

    router.get('/:id', ephemere.findById);

    router.post('/', ephemere.create);

    router.put('/:id', ephemere.update);

    router.delete('/:id', ephemere.delete);

    app.use('/ephemeres', router);

};
