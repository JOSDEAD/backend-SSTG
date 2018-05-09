var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:1234@localhost:5432/SSTG';
var db = pgp(connectionString);


module.exports = {
  obtenerPersonas: obtenerPersonas,
  obtenerEstudiantes:obtenerEstudiantes,
  obtenerProfesores:obtenerProfesores
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
db.any('select p.cedula,p.email,p.nombre_completo,p.telefono,p.usuario,'+
        'p.contrasenna,e.carnet,e.carrera from persona as p  inner join '+
        'estudiante as e on p.cedula=e.cedula ')
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
    db.any('select p.cedula,p.email,p.nombre,p.apellidos,p.telefono,p.usuario,'+
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