/**
 * Created by Lukas on 17-07-2016.
 */
var express = require('express');
var router = express.Router();
var fs = require("fs");
var multer = require('multer');
var upload = multer();
var Zip = require('express-zip');

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
  };
  tryRename(0);
});

router.get("/get-all/:handinNr", function(req, res, next) {
  var zipFiles = [];
  var dirs = fs.readdirSync(__dirname + "/../hand-ins/" + req.params.handinNr);
  dirs.forEach((dir, index) => {
    var files = fs.readdirSync(__dirname + "/../hand-ins/" + req.params.handinNr + "/" + dir);
    files.forEach((file,index) => {
      zipFiles.push({
        path: __dirname + "/../hand-ins/" + req.params.handinNr + "/" + dir + "/" + file,
        name: dir + "/" + file
      });
    });
  });
  res.zip(zipFiles, "Handin-" + req.params.handinNr + ".zip");
});

router.get("/get-:studentName/:handinNr", function(req, res, next) {
  var zipFiles = [];
  var files = fs.readdirSync(__dirname + "/../hand-ins/" + req.params.handinNr + "/" + req.params.studentName);
  files.forEach((file,index) => {
    zipFiles.push({
      path: __dirname + "/../hand-ins/" + req.params.handinNr + "/" + req.params.studentName + "/" + file,
      name: req.params.studentName + "/" + file
    });
  });
  res.zip(zipFiles, "Handin-" + req.params.studentName + "-" + req.params.handinNr + ".zip");
});

router.get("/list-all/:handinNr", function(req, res, next) {
  var dirs = fs.readdirSync(__dirname + "/../hand-ins/" + req.params.handinNr);
  var resultHTML = "<p>Total students with hand-ins: <strong>" + dirs.length +"</strong></p>";
  dirs.forEach((dir, index) => {
    resultHTML += "<p><strong>" + dir + "</strong><ul>";
    var files = fs.readdirSync(__dirname + "/../hand-ins/" + req.params.handinNr + "/" + dir);
    files.forEach((file,index) => {
      resultHTML += "<li>" + file + "</li>";
    });
    resultHTML += "</ul></p>";
  });
  res.send(resultHTML);
});

module.exports = router;
