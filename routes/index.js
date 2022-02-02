const express=require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');          // getting controller from controllers folder 
console.log('routes loaded');

router.get('/', homeController.home);         // this means for "/" path ie home use homecontrollers home function 
router.get('/color',homeController.homeInDark);

module.exports=router;