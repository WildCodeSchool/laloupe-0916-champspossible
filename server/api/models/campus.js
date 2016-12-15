import mongoose from 'mongoose';

const campusSchema = new mongoose.Schema({
    titre: String,
    texte: String,
    logo: Number,
    ordre: Number,
    filtre: Array
});

let model = mongoose.model('Campus', campusSchema);

export default class Campus {

    findAll(req, res) {
        model.find({}, (err, campus) => {
            if (err) {
                res.sendStatus(403);
            } else {
                res.json(campus);
            }
        });
    }

    findById(req, res) {
        model.findById(req.params.id, (err, campus) => {
            if (err || !campus) {
                res.sendStatus(403);
            } else {
                res.json(campus);
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
            (err, campus) => {
                if (err) {
                    res.status(500).send(err.message);
                } else {
                    res.json(campus);
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
        }, (err, campus) => {
            if (err || !campus) {
                res.status(500).send(err.message);
            } else {
                res.json(campus);
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
        })
    }
}
