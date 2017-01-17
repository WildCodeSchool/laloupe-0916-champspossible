import express from 'express';
import Offre from '../models/offre.js';
import Auth from '../middlewares/authorization.js';

let router = express.Router();

module.exports = (app) => {

    var offre = new Offre();

    router.get('/', offre.findAll);

    router.get('/:id', offre.findById);

    router.post('/', offre.create);

    router.put('/:id', offre.update);

    router.delete('/:id', offre.delete);

    app.use('/offre', Auth.hasAuthorization, router);

};
