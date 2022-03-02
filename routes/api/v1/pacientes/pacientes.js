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
        console.log("User request",req.user)
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
        const row = await pacienteModel.getById(id);
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
        const result =  await pacienteModel.deleteOne(id);
        res.status(200).json({status:"ok",result});
    }catch(ex){
        console.log(ex);
        res.status(500).json({status:'failed'});
    }
})

const allowedItemsNumbers = [10,15,20]

router.get('/facet/:page/:items',async(req,res)=>{
    const page = parseInt(req.params.page,'10');
    const items = parseInt(req.params.items,'10');

    if(allowedItemsNumbers.includes(items)){
        try {
            const pacientes = await pacienteModel.getFaceted(page,items);
            res.status(200).json({"docs":pacientes})
        } catch (ex) {
            console.log(ex);
            res.status(500).json({status:"failed"});
        }
    }else{
        res.status(403).json({status:'error',msg:'Not a valid items, only(10,15,20)'})
    }
});

router.get('/byname/:name/:page/:items',async(req,res)=>{
    const page = parseInt(req.params.page,'10');
    const items = parseInt(req.params.items,'10');
    const name = req.params.name;
    if(allowedItemsNumbers.includes(items)){
        try {
            const pacientes = await pacienteModel.getFaceted(page,items,{nombres:name});
            res.status(200).json({"docs":pacientes})
        } catch (ex) {
            console.log(ex);
            res.status(500).json({status:"failed"});
        }
    }else{
        res.status(403).json({status:'error',msg:'Not a valid items, only(10,15,20)'})
    }
});


router.put('/addtag/:id', async (req, res) => {
    try {
      const { tag } = req.body;
      const { id } = req.params;
      const result = await pacienteModel.updateAddTag(id, tag);
      res.status(200).json({
        status: 'ok',
        result
      });
    } catch (ex) {
      console.log(ex);
      res.status(500).json({ status: 'failed' });
    }

});

router.put('/addtagset/:id', async (req, res) => {
    try {
      const { tag } = req.body;
      const { id } = req.params;
      const result = await pacienteModel.updateAddTagSet(id, tag);
      res.status(200).json({
        status: 'ok',
        result
      });
    } catch (ex) {
      console.log(ex);
      res.status(500).json({ status: 'failed' });
    }
  });
  
  router.put('/removetag/:id', async (req, res) => {
    try {
      const { tag } = req.body;
      const { id } = req.params;
      const result = await pacienteModel.updatePopTag(id, tag);
      res.status(200).json({
        status: 'ok',
        result
      });
    } catch (ex) {
      console.log(ex);
      res.status(500).json({ status: 'failed' });
    }
  });
module.exports = router;