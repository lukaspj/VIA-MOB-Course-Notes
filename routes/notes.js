/**
 * Created by Lukas on 17-07-2016.
 */
var express = require('express');
var router = express.Router();

[1, 2, 3].forEach((current, index) => {
    router.get('/day-' + current, function(req, res, next) {
        res.render('notes/day-' + current, { title: 'MOB: Lecture notes day ' + current });
    });
});

["pie-chart", "pie-chart-activity_main", "pie-chart-attrs"].forEach((current, index) => {
   router.get('/code-example-' + current, (req, res, next) => {
       res.render('notes/code-examples/' + current, { title: 'Code Example: ' + current});
   });
});

module.exports = router;
