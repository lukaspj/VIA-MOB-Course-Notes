/**
 * Created by Lukas on 17-07-2016.
 */
var express = require('express');
var router = express.Router();
var fs = require("fs");
var multer = require('multer');
var upload = multer();
var Zip = require('node-zip');

/* GET home page. */
router.post('/:handinNr', upload.single('handinPackage'), function(req, res, next) {
  var handinFolder = __dirname + "/../hand-ins/" + req.params.handinNr + "/" + req.body.student + "/";

  var fileName;
  var i;

  try {
    fs.accessSync(__dirname+"/../hand-ins/");
  } catch (e) {
    fs.mkdirSync(__dirname+"/../hand-ins/");
  } finally {
    try {
      fs.accessSync(__dirname+"/../hand-ins/" + req.params.handinNr);
    } catch (e) {
      fs.mkdirSync(__dirname+"/../hand-ins/" + req.params.handinNr);
    } finally {
      try {
        fs.accessSync(__dirname+"/../hand-ins/" + req.params.handinNr + "/" + req.body.student);
      } catch (e) {
        fs.mkdirSync(__dirname + "/../hand-ins/" + req.params.handinNr + "/" + req.body.student);
      }
    }
  }
  var tryRename = (j) => {
    try {
      var stats = fs.statSync(handinFolder + j + "-" + req.file.originalname);
      tryRename(++j);
    } catch (e) {
      fs.writeFileSync(handinFolder + j + "-" + req.file.originalname, req.file.buffer);
      console.log("[HandIn] : " + req.body.student + " uploaded file: " + j + "-" + req.file.originalname);
      res.redirect('back');
    }
  }
  tryRename(0);
});

router.get("/get-all/:handinNr", function(req, res, next) {
  var zip = new Zip();
  var dirs = fs.readdirSync(__dirname + "/../hand-ins/" + req.params.handinNr);
  dirs.forEach((dir, index) => {
    var files = fs.readdirSync(__dirname + "/../hand-ins/" + req.params.handinNr + "/" + dir);
    files.forEach((file,index) => {
      var content = fs.readFileSync(__dirname + "/../hand-ins/" + req.params.handinNr + "/" + dir + "/" + file);
      zip.file(dir + "/" + file, content);
    });
  });
  zip.file(__dirname + "/../hand-ins/" + req.params.handinNr);
  var data = zip.generate({base64:false,compression:'DEFLATE'});
  res.set('Content-Type', 'application/zip')
  res.set('Content-Disposition', 'attachment; filename=handin-' + req.params.handinNr + '.zip');
  res.set('Content-Length', data.length);
  res.end(data, 'binary');
});

module.exports = router;
