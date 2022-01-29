const express = require("express");
const router =  express.Router();

const Pacientes = new require("../../../../dao/pacientes/pacientes.model");
const pacienteModel = new Pacientes();

router.get('/',(req,res)=>{
    res.status(200).json({
        status:"ok",
        updates: "pacientes"
    });
});

router.get("/all",async(req,res)=>{
    try{
        const rows = await pacienteModel.getAll();
        res.status(200).json({status:"ok",pacientes:rows});
    }catch(Ex){
        console.log(Ex);
        res.status(500).json({status:"failed"});
    }
});

router.get('/byid/:id',async(req,res)=>{
    try{
        const { id } = req.params;
        const row = await pacienteModel.getById(parseInt(id));
        res.status(200).json({status:"ok",paciente:row});

    }catch(ex){
        console.log(ex);
        res.status(500).json({status:"failed"});
    }
});

router.post('/new',async(req,res)=>{
    const {nombres,apellidos,identidad,email,telefono}= req.body;
    rslt = await pacienteModel.new(nombres,apellidos,identidad,telefono,email)
    res.status(200).json({
        status:"ok",
        nombres,
        apellidos,
        identidad,
        email,
        telefono
    });
});

router.put('/update/:id',async(req,res)=>{
    try{
        const {nombres,apellidos,identidad,email,telefono} = req.body;
        const { id } = req.params;
        const result = await pacienteModel.updateOne(id,nombres,apellidos,identidad,telefono,email);
        res.status(200).json({status:"ok",result});
    }catch(ex){
        console.log(ex);
        res.status(500).json({ status: 'failed' });

    }
});


router.delete('/delete/:id',async(req,res)=>{
    try{
        const {id}= req.params;
        const result =  await pacienteModel.deleteOne(parseInt(id));
        res.status(200).json({status:"ok",result});
    }catch(ex){
        console.log(ex);
        res.status(500).json({status:'failed'});
    }
})
module.exports = router;