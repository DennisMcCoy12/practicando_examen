var fs=require('fs');

var exportObject={};

var filePath="model_data.json";

var data={
    condominios:[]
};

exportObject.getData=function(){
    return data;
}

exportObject.setData=function(newData, handler){
    saveToFile(newData, function(err, success){
        if(err){
            handler(err, false);
        }else{
            data=Object.assign({},newData);
            handler(null,true);
        }
    });//savetofile)

}//setData

exportObject.getCondominios=function(){
    return data.condominios;
}

exportObject.setCondominios=function(newCondominos,handler){
    var newData=Object.assign({},data,{condominios:newCondominos});
    exportObject.setData(newData,function(err,success){
        if(err){
            handler(err, false);
        }else{
            data=Object.assign({},newData);
            handler(null,true);
        }
    });//setdata
}

var saveToFile=function(collToSave,handler){
    fs.writeFile(
        filePath,
        JSON.stringify(collToSave),
        function(err){
            if(err){
                console.log(err);
                handler(err, null);
            }else{
                handler(null, true);
            }
        }
    );
}

var loadFromFile=function(handler){
    fs.readFile(
        filePath,
        'utf8',
        function(err, data){
            if(err){
                console.log(err);
                handler(err, null);
            }else{
                handler(null,JSON.parse(data));
            }
        }
    );

}

loadFromFile(
    function(err, savedCollection){
        if(err){
            return;
        }else{
            data=savedCollection;
            return;
        }
    }
);

module.exports=exportObject;