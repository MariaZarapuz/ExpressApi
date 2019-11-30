var db = require('../db');

db.connect('mongodb://localhost:27017', function (err) {
    if (err) {
        throw ('Fallo en la conexión con la db')
    }
});


module.exports.users_list = function (req, res) {
    db.get().db('apidb').collection('users').find().toArray(function (err, result) {
        if (err) {
            throw (' Fallo en la conexión con la BD');

        } else {
            res.send(result);
        }
    });
}

module.exports.users_create = function (req, res) {
    const user = {};
    user.nombre = req.body.nombre;
    user.apellidos = req.body.apellidos;
    user.edad = req.body.edad;
    user.dni = req.body.dni;
    user.cumple = req.body.cumple;
    user.colorFavorito = req.body.colorFavorito;
    user.sexo = req.body.sexo;
    user.notas = req.body.notas;

    db.get().db('apidb').collection('users').insertOne(user, function (err, result) {
        if (err) {
            throw ('Fallo en la conexión con la BD');
        } else {
            res.send(result)
        }
    });
}
module.exports.users_update_one = function (req, res, next) {
    if (db.get() === null) {
        next(new Error('La conexión no está establecida'));
        return;
    }
    const id = req.params.id;
    var ObjectId = require('mongodb');
    const update = {
        $set: {
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            edad: req.body.edad,
            dni: req.body.dni,
            cumple: req.body.cumple,
            colorFavorito: req.body.colorFavorito,
            sexo: req.body.sexo,
            notas: req.body.notas
        }
    };

    db.get().db('apidb').collection('users').updateOne({
        _id: ObjectId(id)
    }, update, function (err, result) {
        if (err) {
            next(new Error('Fallo en la conexión con la BD'));
            return
        } else {
            res.send(result);
        }
    });
};

module.exports.users_delete_one = function (req, res, next) {
    console.log(req.params)
    if (db.get() === null) {
        next(new Error('La conexión no está establecida'));

        return;
    }

    const id = req.params.id;
    var ObjectId = require('mongodb');


    db.get().db('apidb').collection('users').deleteOne({
        _id: ObjectId(id)
    }, function (err, result) {
        console.log(id, "filter")
        if (err) {
            next(new Error('Fallo en la conexión con la BD'));
            return
        } else {
            res.send(result);
        }
    });
};