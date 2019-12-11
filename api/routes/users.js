var express = require('express');
var router = express.Router();
var users_controller = require('../controllers/usersController');
const {
    check
} = require('express-validator');

const valid_user = [
    check('nombre', 'Nombre no válido. Debe contener al menos 3 caracteres.')
    .isLength({
        min: 3
    })
    .isAlpha(['es-ES']),

    check('apellidos').custom((value, {
        req
    }) => {
        if (isNaN(value)) {
            return true;
        } else {
            throw new Error('Apellidos no válidos. Deben contener al menos 3 caracteres.')
        }
    }),
    check('edad')
    .isInt({
        min: 0,
        max: 125
    })
    .isAlpha(['es-ES']),
    check('dni')
    .isAlphanumeric(['es-ES'])
    .isLength({
        max: 9
    }),
    check('cumple')
    .isISO8601,
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
router.post('/', users_controller.users_create);

router.put('/:id', users_controller.users_update_one);
router.delete('/:id', users_controller.users_delete_one);


module.exports = router;