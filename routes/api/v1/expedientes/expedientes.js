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
        const result = await expedienteModel.getById(id);
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

const allowedItemsNumbers = [10,15,20];

router.get('/facet/:page/:items', async (req,res)=>{
    const page = parseInt(req.params.page,'10');
    const items = parseInt(req.params.items,'10');

    if(allowedItemsNumbers.includes(items)){
        try {
            const expedientes =  await expedienteModel.getFacet(page,items);
            res.status(200).json({docs:expedientes})
        } catch (ex){
            console.log(ex);
            res.status(403).json({status:'Not a valid items, only(10,15,20)'});
        }
    }
});

router.get('/byobservation/:observation/:page/:items', async (req,res)=>{
    const page = parseInt(req.params.page,'10');
    const items = parseInt(req.params.items,'10');
    const observation = req.params.observation;

    if(allowedItemsNumbers.includes(items)){
        try {
            const expedientes =  await expedienteModel.getFacet(page,items,{"observacion":observation});
            res.status(200).json({docs:expedientes})
        } catch (ex){
            console.log(ex);
            res.status(403).json({status:'Not a valid items, only(10,15,20)'});
        }
    }
});


router.put('/addtag/:id', async (req, res) => {
    try {
      const { tag } = req.body;
      const { id } = req.params;
      const result = await expedienteModel.updateAddTag(id, tag);
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
      const result = await expedienteModel.updateAddTagSet(id, tag);
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
      const result = await expedienteModel.updatePopTag(id, tag);
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