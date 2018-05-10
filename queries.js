var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:12345@localhost:5432/SSTG';
var db = pgp(connectionString);


module.exports = {
  obtenerPersonas: obtenerPersonas,
  obtenerEstudiantes: obtenerEstudiantes,
  obtenerProfesores: obtenerProfesores,
  crearEstudiante: crearEstudiante,
  crearProfesor: crearProfesor,
  actualizarEstudiante: actualizarEstudiante,
  actualizarProfesor: actualizarProfesor,
  eliminarEstudiante: eliminarEstudiante,
  eliminarProfesor: eliminarProfesor
};

function obtenerPersonas(req, res, next) {
  db.any('select * from persona')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Se han obtenido todas las personas'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function obtenerEstudiantes(req, res, next) {
  db.any('select p.cedula,p.email,p.nombre,p.apellidos,p.telefono,p.usuario' +
      ',p.contrasenna,e.carnet,e.carrera from persona as p  inner join ' +
      'estudiante as e on p.cedula=e.cedula')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Se han obtenido todos los estudiantes'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function obtenerProfesores(req, res, next) {
  db.any('select p.cedula,p.email,p.nombre,p.apellidos,p.telefono,p.usuario,' +
      'p.contrasenna from persona as p inner join profesor as pr on p.cedula=pr.cedula;')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Se han obtenido todos los profesores'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function crearEstudiante(req, res, next) {

  var cedula = req.body.cedula;
  var nombre = req.body.nombre;
  var apellidos = req.body.apellidos;
  var telefono = parseInt(req.body.telefono);
  var email = req.body.email;
  var usuario = req.body.usuario;
  var contrasenna = req.body.contrasenna;
  var carnet = req.body.carnet;
  var carrera = req.body.carrera;
  req.body.usuario = req.body.usuario.toString();
  db.any("SELECT Transaccion_InsertarPersonaEstudiante('" + cedula + "','" + nombre + "','" + apellidos + "','" + email + "','" + telefono + "','" + usuario + "','" + contrasenna + "','" + carnet + "','" + carrera + "')")
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Se inserto estudiante'
        });
    })
    .catch(function (err) {
      res.status(500).json(err)
    });
}

function crearProfesor(req, res, next) {

  var cedula = req.body.cedula;
  var nombre = req.body.nombre;
  var apellidos = req.body.apellidos;
  var telefono = parseInt(req.body.telefono);
  var email = req.body.email;
  var usuario = req.body.usuario;
  var contrasenna = req.body.contrasenna;
  req.body.usuario = req.body.usuario.toString();
  db.any("SELECT Transaccion_InsertarPersonaProfesor('" + cedula + "','" + nombre + "','" + apellidos + "','" + email + "','" + telefono + "','" + usuario + "','" + contrasenna + "')")
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Se inserto profesor'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function actualizarEstudiante(req, res, next) {
  var cedula = req.body.cedula;
  var nombre = req.body.nombre;
  var apellidos = req.body.apellidos;
  var telefono = parseInt(req.body.telefono);
  var email = req.body.email;
  var usuario = req.body.usuario;
  var carrera = req.body.carrera;
  db.any("Select ModificarEstudiante '" + cedula + "','" + nombre + "','" + apellidos + "','" + email + "','" + telefono + "','" + usuario + "','" + carrera + "')")
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Se actualizó datos del estudiante'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function actualizarProfesor(req, res, next) {
  var cedula = req.body.cedula;
  var nombre = req.body.nombre;
  var apellidos = req.body.apellidos;
  var telefono = parseInt(req.body.telefono);
  var email = req.body.email;
  var usuario = req.body.usuario;
  db.any("Select ModificarProfesor '" + cedula + "','" + nombre + "','" + apellidos + "','" + email + "','" + telefono + "','" + usuario + "')")
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Se actualizó datos del profesor'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function eliminarEstudiante(req, res, next) {
  var cedula = req.body.cedula;
  db.result("SELECT EliminarEstudiante '" + cedula + "')")
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Eliminar Estudiante ${result.rowCount}`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}

function eliminarProfesor(req, res, next) {
  var cedula = req.body.cedula;
  db.result("SELECT EliminarProfesor '" + cedula + "')")
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Eliminar Profesor ${result.rowCount}`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}