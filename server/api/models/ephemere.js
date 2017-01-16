import mongoose from 'mongoose';

const ephemereSchema = new mongoose.Schema({
    titreEphemere: String,
    lienEphemere: String,
    cacheEphemere: Boolean
});

let model = mongoose.model('Ephemere', ephemereSchema);

export default class Ephemere {

    findAll(req, res) {
        model.find({}, (err, homes) => {
            if (err) {
                res.sendStatus(403);
            } else {
                res.json(homes);
            }
        });
    }

    findById(req, res) {
        model.findById(req.params.id, (err, home) => {
            if (err || !home) {
                res.sendStatus(403);
            } else {
                res.json(home);
            }
        });
    }

    create(req, res) {
        model.create({
                titreEphemere: req.body.lienImg,
                lienEphemere: req.body.lienClick,
                cacheEphemere: req.body.cacheEphemere
            },
            (err, home) => {
                if (err) {
                    res.status(500).send(err.message);
                } else {
                    res.json(home);
                }
            });
    }

    update(req, res) {
        model.update({
            _id: req.params.id
        }, {
            titreEphemere: req.body.lienImg,
            lienEphemere: req.body.lienClick,
            cacheEphemere: req.body.cacheEphemere
        }, (err, home) => {
            if (err || !home) {
                res.status(500).send(err.message);
            } else {
                res.json(home);
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
