/**
 * Created by Lukas on 17-07-2016.
 */
var express = require('express');
var router = express.Router();

[1, 2].forEach((current, index) => {
    router.get('/day-' + current, function(req, res, next) {
        res.render('notes/day-' + current, { title: 'MOB: Lecture notes day ' + current });
    });
});

module.exports = router;
