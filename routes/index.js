const express=require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');          // getting controller from controllers folder 


router.get('/', homeController.home);         // this means for "/" path ie home use homecontrollers home function 
//router.get('/color',homeController.homeInDark);          // see line 5-7 of home_controller
router.use('/users', require('./users'));       // this handels the other route 
router.use('/posts', require ('./posts'));
router.use('/comments', require ('./comments'));

router.use('/api',require('./api'));

module.exports = router ;


console.log('routes loaded');