var express = require('express');
var router = express.Router();
var db = require('../queries');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'SSTG'
  });
});

router.get('/personas', db.obtenerPersonas);
router.get('/profesores', db.obtenerProfesores);
router.get('/estudiantes', db.obtenerEstudiantes);
router.post('/crearEstudiante', db.crearEstudiante);
router.post('/crearProfesor', db.crearProfesor);
router.put('/actualizarEstudiante', db.actualizarEstudiante);
router.put('/actualizarProfesor', db.actualizarProfesor);
router.delete('/eliminarEstudiante/:cedula', db.eliminarEstudiante);
router.delete('/eliminarProfesor/:cedula', db.eliminarProfesor);
module.exports = router;