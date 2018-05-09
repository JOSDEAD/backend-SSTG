var express = require('express');
var router = express.Router();
var db = require('../queries');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SSTG' });
});

router.get('/personas',db.obtenerPersonas);
router.get('/profesores',db.obtenerProfesores);
router.get('/estudiantes',db.obtenerEstudiantes);
module.exports = router;
