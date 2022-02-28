const express = require('express');
const router=express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');

router.get('/profile/:id', passport.checkAuthentication , usersController.profile);
router.post('/update/:id', passport.checkAuthentication , usersController.update);
router.get('/sign-up', usersController.signUp);
router.get('/signin',usersController.signIn);

router.post('/create',usersController.create);

router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'user/signin'}
),usersController.createSession);

router.get('/sign-out',usersController.destroySession);


module.exports = router;           // if router.use requires a middleware func but got a object error is there re write this line save and run 