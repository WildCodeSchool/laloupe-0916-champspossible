import express from 'express';
import Campus from '../models/campus.js';
import Auth from '../middlewares/authorization.js';

let router = express.Router();

module.exports = (app) => {

    var campus = new Campus();

    router.get('/', campus.findAll);

    router.get('/:id', campus.findById);

    router.post('/', campus.create);

    router.put('/:id', campus.update);

    router.delete('/:id', campus.delete);

    app.use('/campus', Auth.hasAuthorization, router);

};
