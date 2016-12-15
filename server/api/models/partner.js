import mongoose from 'mongoose';

const partnerSchema = new mongoose.Schema({
    type: String,
    nom: String,
    logo: String,
    domaine: String,
    smallDescription: String,
    bigDescription: String,
    tel: String,
    mail: String,
    site: String,
    sortAccueil: Number,
});

let model = mongoose.model('Partner', partnerSchema);

export default class Partner {

    findAll(req, res) {
        model.find({}, (err, partners) => {
            if (err) {
                res.sendStatus(403);
            } else {
                res.json(partners);
            }
        });
    }

    findById(req, res) {
        model.findById(req.params.id, (err, partner) => {
            if (err || !partner) {
                res.sendStatus(403);
            } else {
                res.json(partner);
            }
        });
    }

    create(req, res) {
        model.create({
                type: req.body.type,
                nom: req.body.nom,
                logo: req.body.logo,
                domaine: req.body.domaine,
                smallDescription: req.body.smallDescription,
                bigDescription: req.body.bigDescription,
                tel: req.body.tel,
                mail: req.body.mail,
                site: req.body.site,
                sortAccueil: req.body.sortAccueil
            },
            (err, partner) => {
                if (err) {
                    res.status(500).send(err.message);
                } else {
                    res.json(partner);
                }
            });
    }

    update(req, res) {
        model.update({
            _id: req.params.id
        }, {
            type: req.body.type,
            nom: req.body.nom,
            logo: req.body.logo,
            domaine: req.body.domaine,
            smallDescription: req.body.smallDescription,
            bigDescription: req.body.bigDescription,
            tel: req.body.tel,
            mail: req.body.mail,
            site: req.body.site,
            sortAccueil: req.body.sortAccueil
        }, (err, partner) => {
            if (err || !partner) {
                res.status(500).send(err.message);
            } else {
                res.json(partner);
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
