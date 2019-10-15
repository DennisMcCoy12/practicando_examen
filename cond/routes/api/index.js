var express =require('express');
var router = express.Router();

var condominiosApiRoutes= require('./condominios/index');

router.use('/cnd', condominiosApiRoutes );

module.exports=router;