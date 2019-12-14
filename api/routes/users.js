var express = require('express');
var router = express.Router();
var users_controller = require('../controllers/usersController');
const {
    check
} = require('express-validator');

const valid_user = [
    check('nombre').isLength({
        min: 3
    })
    .custom((value, {
        req
    }) => {
        if (isNaN(value)) {
            return true;
        } else {
            throw new Error('Nombre no válido. Debe contener al menos 3 caracteres.')
        }
    }),

    check('apellidos').isLength({
        min: 3
    })
    .custom((value, {
        req
    }) => {
        if (isNaN(value)) {
            return true;
        } else {
            throw new Error('Apellidos no válidos. Deben contener al menos 3 caracteres.')
        }
    }),
    check('edad', 'Edad no válida. Debe estar comprendida entre 0 y 125.')
    .isInt({
        min: 0,
        max: 125
    }),

    check('dni', 'D.N.I no válido. Debe contener un total de 9 caracteres.').isLength({
        min: 9,
        max: 9
    }).isAlphanumeric(),

    check('cumple', 'Fecha de nacimiento no válida. Debe ser en formato yyyy-mm-dd.')
    .isISO8601(),

    check('colorFavorito', 'Color Favorito no válido. Debe contener al menos 3 caracteres.')
    .isLength({
        min: 3
    })
    .isAlpha(['es-ES']),
    check('sexo')
    .isIn(['Hombre', 'Mujer', 'Otro', 'No especificado']),
];

router.get('/', users_controller.users_list);
router.get('/:id', users_controller.users_getById);
router.post('/', valid_user, users_controller.users_create);

router.put('/:id', valid_user, users_controller.users_update_one);
router.delete('/:id', users_controller.users_delete_one);


module.exports = router;