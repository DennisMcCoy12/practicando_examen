var express =require('express');
var router = express.Router();
var fileModel =require('../filemodel');

var condCollection =fileModel.getCondominios();

/*router.get('/',function(req, res){
    res.json({
        "uno":"dos",
        "tres":"cuatro"
    });
});*/

router.get('/all', function(req,res){
    condCollection=fileModel.getCondominios();
    res.json(condCollection);
});

router.post('/new', function(req,res){
    condCollection=fileModel.getCondominios();
    var newCondominios=Object.assign(
        {},
        req.body,
        {
            "disponibles": parseInt(req.body.disponibles),
            "cuota":parseFloat(req.body.cuota)

        }
    );
    var condoExist=condCollection.find(
        function(o,i){
            return o.codigo===newCondominios.codigo;
        }
    )
    if(!condoExist){
        condCollection.push(newCondominios);
        fileModel.setCondominios(
            condCollection,
            function(err, savedSuccesfully){
                if(err){
                    res.status(400).json({"error prru":"prrux2"});
                }else{
                    res.json(newCondominios);
                }
            }
            );

    }else{
        res.status(400).json({"error prru":"prrux2"});
    }

});

router.delete(
    '/delete/:condcodigo',
    function(req,res){
        condCollection=fileModel.getCondominios();
        var condcodigoToDelete=req.params.condcodigo;
        var newCondCollection=condCollection.filter(
            function(o,i){
                return condcodigoToDelete!=o.codigo;
            }
        );
        condCollection=newCondCollection;
        fileModel.setCondominios(
            condCollection,
            function(err,savedSuccesfully){
                if(err){
                    res.status(400).json({"error prru":"prrux2"});
                }else{
                    res.json({"newCondQty":condCollection.length});
                }
            }
        )
    }
);

router.put('/update/:condcodigo',
  function(req, res){
      condCollection = fileModel.getCondominios();
      var condcodigoToModify = req.params.condcodigo;    
      var amountToAdjust = parseInt(req.body.ajustar);
      var adjustType = req.body.tipo || 'SUB';
      var adjustHow = (adjustType == 'ADD' ? 1 : -1);
      var modCondominios = {};
      var newCondominiosArray = condCollection.map(
        function(o,i){
          if( condcodigoToModify === o.codigo){
             o.disponibles += ( amountToAdjust * adjustHow );
             modCondominios = Object.assign({}, o);
          }
          return o;
        }
      );
    condCollection = newCondominiosArray;
    fileModel.setCondominios(
      condCollection,
      function (err, savedSuccesfully) {
        if (err) {
          res.status(400).json({ "error": "prru" });
        } else {
          res.json(modCondominios);
        }
      }
    );
  }
);

module.exports = router;