import express from 'express';
import Partner from '../models/partner.js';
import Auth from '../middlewares/authorization.js';

let router = express.Router();

module.exports = (app) => {

    var partner = new Partner();

    router.get('/', partner.findAll);

    router.get('/:id', partner.findById);

    router.post('/', Auth.hasAuthorization, partner.create);

    router.put('/:id', Auth.hasAuthorization, partner.update);

    router.delete('/:id', Auth.hasAuthorization, partner.delete);

    app.use('/partners', router);

};
