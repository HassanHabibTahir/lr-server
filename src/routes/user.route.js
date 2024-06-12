const express = require('express');
const { userValidation } = require('../validations');
const validate = require('../middleware/validate');
const { userController } = require('../controllers');
const router = express.Router();
router.route('/').post(validate(userValidation), userController.createUser).get(userController.getUsers);

router
  .route('/:userId')
  .get(validate(userValidation.getUser), userController.getUser)
  .patch(validate(userValidation.updateUser), userController.updateUser)
  .delete(validate(userValidation.deleteUser), userController.deleteUser);

module.exports = router;
