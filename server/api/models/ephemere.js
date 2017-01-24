import mongoose from 'mongoose';

const ephemereSchema = new mongoose.Schema({
    titreEphemere: String,
    lienEphemere: String,
    cacheEphemere: {
        type: Boolean,
        default: false
    }
});

let model = mongoose.model('Ephemere', ephemereSchema);

export default class Ephemere {

    findAll(req, res) {
        model.find({}, (err, ephemeres) => {
            if (err) {
                res.sendStatus(403);
            } else {
                res.json(ephemeres);
            }
        });
    }

    findById(req, res) {
        model.findById(req.params.id, (err, ephemere) => {
            if (err || !ephemere) {
                res.sendStatus(403);
            } else {
                res.json(ephemere);
            }
        });
    }

    create(req, res) {
        model.create({
                titreEphemere: req.body.titreEphemere,
                lienEphemere: req.body.lienEphemere,
                cacheEphemere: req.body.cacheEphemere
            },
            (err, ephemere) => {
                if (err) {
                    res.status(500).send(err.message);
                } else {
                    res.json(ephemere);
                }
            });
    }

    update(req, res) {
        model.update({
            _id: req.params.id
        }, {
            titreEphemere: req.body.titreEphemere,
            lienEphemere: req.body.lienEphemere,
            cacheEphemere: req.body.cacheEphemere
        }, (err, ephemere) => {
            if (err || !ephemere) {
                res.status(500).send(err.message);
            } else {
                res.json(ephemere);
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
