var express = require('express');
var router = express.Router();
var users_controller = require('../controllers/usersController');



/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/', users_controller.users_list);
router.post('/', users_controller.users_create);

router.put('/:id', users_controller.users_update_one);
router.delete('/:id', users_controller.users_delete_one);


module.exports = router;