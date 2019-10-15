var express =require('express');
var router = express.Router();
var fileModel =require('../filemodel');

var condCollection =fileModel.getCondominios();

router.get('/',function(req, res){
    res.json({
        "uno":"dos",
        "tres":"cuatro"
    });
});

module.exports = router;