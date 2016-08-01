/**
 * Created by Lukas on 17-07-2016.
 */
var express = require('express');
var router = express.Router();

[1, 2, 3, 4, 5, 6, 7].forEach((current, index) => {
    router.get('/day-' + current, function(req, res, next) {
        res.render('slides/day-' + current, { title: 'MOB: Slides day ' + current });
    });
});

module.exports = router;
