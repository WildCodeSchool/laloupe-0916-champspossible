import mongoose from 'mongoose';

const homeSchema = new mongoose.Schema({
    lienImg: String,
    lienClick: String,
    ordre: {
        type: Number,
        default: 0,
        required: true
    },
});

let model = mongoose.model('Home', homeSchema);

export default class Home {

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
                lienImg: req.body.lienImg,
                lienClick: req.body.lienClick,
                ordre: req.body.ordre
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
            lienImg: req.body.lienImg,
            lienClick: req.body.lienClick,
            ordre: req.body.ordre
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
