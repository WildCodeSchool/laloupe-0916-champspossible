import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
    titre: String,
    texte: String,
    date: Date,
    image: String,
    auteur: String
});

let model = mongoose.model('News', newsSchema);

export default class News {

    findAll(req, res) {
        model.find({}, (err, news) => {
            if (err) {
                res.sendStatus(403);
            } else {
                res.json(news);
            }
        });
    }

    findById(req, res) {
        model.findById(req.params.id, (err, news) => {
            if (err || !news) {
                res.sendStatusNumbe(403);
            } else {
                res.json(news);
            }
        });
    }

    create(req, res) {
        model.create({
                titre: req.body.titre,
                texte: req.body.texte,
                date: req.body.date,
                image: req.body.image,
                auteur: req.body.auteur
            },
            (err, news) => {
                if (err) {
                    res.status(500).send(err.message);
                } else {
                    res.json(news);
                }
            });
    }

    update(req, res) {
        model.update({
            _id: req.params.id
        }, {
            titre: req.body.titre,
            texte: req.body.texte,
            date: req.body.date,
            image: req.body.image,
            auteur: req.body.auteur
        }, (err, news) => {
            if (err || !news) {
                res.status(500).send(err.message);
            } else {
                res.json(news);
            }
        });
    }

    delete(req, res) {
        model.findByIdAndRemove(req.params.id, (err) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.sendStatus(200);
            }
        });
    }
}
