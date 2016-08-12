/**
 * Created by Lukas on 17-07-2016.
 */
var express = require('express');
var router = express.Router();
var fs = require('fs');

[1, 2, 3, 4, 5, 6].forEach((current, index) => {
    router.get('/day-' + current, function(req, res, next) {
        res.render('notes/day-' + current, { title: 'MOB: Lecture notes day ' + current });
    });
});

var files = fs.readdirSync(__dirname + "/../views/notes/code-examples");
files.forEach((current, index) => {
  var file = current.substring(0, current.length - 4);
   router.get('/code-example-' + file, (req, res, next) => {
       res.render('notes/code-examples/' + file, { title: 'Code Example: ' + file});
   });
});

module.exports = router;
