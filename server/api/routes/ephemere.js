import express from 'express';
import Ephemere from '../models/ephemere.js';
import Auth from '../middlewares/authorization.js';

let router = express.Router();

module.exports = (app) => {

    var ephemere = new Ephemere();

    router.get('/', ephemere.findAll);

    router.get('/:id', ephemere.findById);

    router.post('/', Auth.hasAuthorization, ephemere.create);

    router.put('/:id', Auth.hasAuthorization, ephemere.update);

    router.delete('/:id', Auth.hasAuthorization, ephemere.delete);

    app.use('/ephemere', router);

};
