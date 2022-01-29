const express = require("express");
const router =  express.Router();

const Expedientes = require('../../../../dao/expedientes/expedientes.model');
const expedienteModel =  new Expedientes();

router.get('/',(req,res)=>{
    res.status(200).json({
        status:"ok",
        updates: "Expedientes"
    });
});

router.post("/new",async(req,res)=>{
    const {identidad,fecha,descripcion,observacion,registros, ultimaActualizacion} = req.body;
    try{
        result =  await expedienteModel.new(identidad,fecha,descripcion,observacion,registros, ultimaActualizacion);
        res.status(200).json({status:"ok", result});
    }catch(ex){
        res.status(500).json({status:"failed"});
    }

});

router.get("/all", async(req,res)=>{
    try{
        const result = await expedienteModel.getAll();
        res.status(200).json({status:"ok",expedientes:result});
    }catch(ex){
        console.log(ex);
        res.status(500).json({status:"failed"})
    }
});

router.get("/byid/:id",async(req,res)=>{
    try{
        const {id} = req.params;
        const result = await expedienteModel.getById(parseInt(id));
        res.status(200).json({status:"ok",result});
    }catch(ex){
        console.log(ex);
        res.status(500).json({status:"failed"})
    }
});

router.put("/update/:id", async(req,res)=>{
    try{
        const {identidad,fecha,descripcion,observacion,registros, ultimaActualizacion} = req.body;
        const {id} = req.params;
        const result = await expedienteModel.updateOne(id,identidad,fecha,descripcion,observacion,registros, ultimaActualizacion);
        res.status(200).json({status:"ok", result});
    }catch(ex){
        console.log(ex);
        res.status(500).json({status:"failed"})
    }
});

router.delete("/delete/:id", async(req,res)=>{
    try{
        const {id} = req.params;
        const result =  await expedienteModel.deleteOne(id);
        res.status(200).json({sattus:"ok",result})
    }catch(ex){
        console.log(ex);
        res.status(500).json({status:"failed"})
    }
});
module.exports = router;