var MongoClient = require('mongodb').MongoClient;
mongo = require('mongodb')
var db = null;

module.exports.connect = function (url, callback) {
    if (db) {
        return callback();
    }
    const client = new MongoClient(url, {

        useUnifiedTopology: true
    });

    client.connect(function (err, result) {
        if (err) {
            return callback(err);
        }
        console.log('Conectado a BD');
        db = result;
        callback()
    });
};

module.exports.close = function (callback) {
    if (db) {
        db.close(function (err, result) {
            console.log('Desconectado de BD');
            db = null;
            callback(err)
        });
    }
};

module.exports.get = function () {
    return db;
}