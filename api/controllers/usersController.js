var db = require('../db');
require('express-validator')

db.connect('mongodb://localhost:27017', function (err) {
    if (err) {
        throw ('Fallo en la conexión con la db')
    }
});


module.exports.users_list = function (req, res,next) {
    db.get().db('apidb').collection('users').find().toArray(function (err, result) {
        if (err) {
            next(new Error('Fallo en la conexión con la BD')) ;

        } else {
            res.send(result);
        }
    });
}

module.exports.users_create = function (req, res,next) {
    const errors = validationResult(req);
 if (!errors.isEmpty()) {
 return res.status(422).json({ errors: errors.array() });
 }
 if (db.get() === null) {
    next(new Error('La conexión no está establecida'));
    return;
    }
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
            next(new Error('Fallo en la conexión con la BD')) ;
        } else {
            res.send(result)
        }
    });
}
module.exports.users_update_one = 
function (req, res, next)  {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
    }
    
    if (db.get() === null) {
        next(new Error('La conexión no está establecida'));
        return;
    }
    const id = req.params.id;
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
        _id: new mongo.ObjectId(id)
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

    db.get().db('apidb').collection('users').deleteOne({
        _id: new mongo.ObjectId(id)
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