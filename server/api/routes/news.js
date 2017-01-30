import express from 'express';
import News from '../models/news.js';
import Auth from '../middlewares/authorization.js';

let router = express.Router();

module.exports = (app) => {

    var news = new News();

    router.get('/', news.findAll);

    router.get('/:id', news.findById);

    router.post('/', Auth.hasAuthorization, news.create);

    router.put('/:id', Auth.hasAuthorization, news.update);

    router.delete('/:id', Auth.hasAuthorization, news.delete);

    app.use('/news', router);

};
