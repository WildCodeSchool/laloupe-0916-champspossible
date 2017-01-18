import mongoose from 'mongoose';

const offreSchema = new mongoose.Schema({
    titre: String,
    texte: String,
    logo: String,
    ordre: {
        type: Number,
        default: 0,
        required: true
    },
    filtre: String
});

let model = mongoose.model('Offre', offreSchema);

export default class Offre {

    findAll(req, res) {
        model.find({}, (err, offres) => {
            if (err) {
                res.sendStatus(403);
            } else {
                res.json(offres);
            }
        });
    }

    findById(req, res) {
        model.findById(req.params.id, (err, offres) => {
            if (err || !offres) {
                res.sendStatus(403);
            } else {
                res.json(offres);
            }
        });
    }

    create(req, res) {
        model.create({
                titre: req.body.titre,
                texte: req.body.texte,
                logo: req.body.logo,
                ordre: req.body.ordre,
                filtre: req.body.filtre
            },
            (err, offres) => {
                if (err) {
                    res.status(500).send(err.message);
                } else {
                    res.json(offres);
                }
            });
    }

    update(req, res) {
        model.update({
            _id: req.params.id
        }, {
            titre: req.body.titre,
            texte: req.body.texte,
            logo: req.body.logo,
            ordre: req.body.ordre,
            filtre: req.body.filtre
        }, (err, offre) => {
            if (err || !offre) {
                res.status(500).send(err.message);
            } else {
                res.json(offre);
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
