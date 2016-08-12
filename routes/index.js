/**
 * Created by Lukas on 17-07-2016.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Course page for MOB' });
});

router.get('/apps', (req, res, next) => {
  res.render('notes/final-projects', {title: 'Final Projects'});
});

module.exports = router;
