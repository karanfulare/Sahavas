const express = require('express');
const router=express.Router();

const usersController = require('../controllers/users_controller');

router.get('/profile', usersController.profile);
router.get('/profile/edit',usersController.edit);
router.get('/register', usersController.register);
router.get('/signin',usersController.signin);


module.exports = router;           // if router.use requires a middleware fun but got a object error is there re write this line save and run 