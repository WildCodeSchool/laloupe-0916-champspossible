import express from 'express';
import Partner from '../models/partner.js';
import Auth from '../middlewares/authorization.js';

let router = express.Router();

module.exports = (app) => {

    var partner = new Partner();

    router.get('/', partner.findAll);

    router.get('/:id', partner.findById);

    router.post('/', partner.create);

    router.put('/:id', partner.update);

    router.delete('/:id', partner.delete);

    app.use('/partners', Auth.hasAuthorization, router);

}
