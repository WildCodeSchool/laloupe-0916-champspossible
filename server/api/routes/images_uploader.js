module.exports = function(app) {
    'use strict';

    var formidable = require('formidable'),
        fs = require('fs-extra'),
        qt = require('quickthumb'),
        im = require('imagemagick'),
        mmm = require('mmmagic').Magic;

    app.post('/picture', function(req, res) {
      /*
        Change wdth & hgth as needed, post any image to /api/picture and it'll be saved to public/uploads/
      */

        var
            wdth = 200,
            hgth = 150,
            new_location = 'public/uploads/';

        new formidable.IncomingForm()
            .parse(req, function(err, fields, files) {
                if (err) {
                    console.error(err);
                }
            })

        .on('file', function(name, f) {
            var temp_path = f.path;
            var file_name = f.name;
            if (!fs.existsSync(new_location)) {
                fs.mkdirSync(new_location);
            }
            var magic = new mmm();
            magic.detectFile(temp_path, function(err, result) {
                if (err) {
                    console.log(err);
                } else {
                    if (wdth !== 0 && !isNaN(Number(wdth)) && hgth !== 0 && !isNaN(Number(hgth))) {
                        fs.copy(temp_path, new_location + file_name, function(err) {
                            if (err) {
                                console.error(err);
                            } else {
                                fs.unlink(temp_path, function(err) {
                                    if (err) {
                                        console.error(err);
                                    } else {
                                        im.crop({
                                            srcPath: new_location + file_name,
                                            dstPath: new_location + 'img_' + file_name,
                                            width: Number(wdth),
                                            height: Number(hgth),
                                            quality: 1,
                                            gravity: "North"
                                        }, function(err, stdout, stderr) {
                                            if (err) {
                                                console.log(err);
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                }
            });
        })

        .on('end', function(fields, files) {
            if (!res.headersSent) {
                res.sendStatus(200);
            } else {
                res.end();
            }
        });
    });
};
