import express from 'express';
import Offre from '../models/offre.js';
import Auth from '../middlewares/authorization.js';

let router = express.Router();

module.exports = (app) => {

    var offre = new Offre();

    router.get('/', offre.findAll);

    router.get('/:id', offre.findById);

    router.post('/', Auth.hasAuthorization, offre.create);

    router.put('/:id', Auth.hasAuthorization, offre.update);

    router.delete('/:id', Auth.hasAuthorization, offre.delete);

    app.use('/offre', router);

};
