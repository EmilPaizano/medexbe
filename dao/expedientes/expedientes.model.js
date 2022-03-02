
const ObjectId = require('mongodb').ObjectId;
const getDb = require("../mongodb");
let db =  null;

class Expedientes{
    collection = null;
    constructor(){
        getDb()
        .then((database)=>{
            db = database;
            this.collection = db.collection("Expedientes");
            if(process.env.MIGRATE = "true"){
                //por si se reqioere algo
            }
        })
        .catch((err)=>{
            console.error(err);
        })
    }

    async new(identidad,fecha,descripcion,observacion,registro, ultimaActualizacion){
        const newExpediente = {
            identidad,
            fecha,
            descripcion,
            observacion,
            registro,
            ultimaActualizacion
        }
        const rslt = await this.collection.insertOne(newExpediente)
    }
        
    async getAll(){
        const cursor =  this.collection.find({});
        const documents = await cursor.toArray();
        return documents;
    }

    async getFacet(page,items,filter={}){
        const cursor = this.collection.find(filter);
        const totalItems = await cursor.count();
        cursor.skip((page-1)*items);
        cursor.limit(items);
        const rslt = await cursor.toArray();
        return {
            totalItems,
            page,
            items,
            totalPages:(Math.ceil(totalItems/items)),
            rslt
        } 
    }

    async getById(id){
        const _id = new ObjectId(id);
        const filter = {_id};
        const myDocument = await this.collection.findOne(filter);
        return myDocument;
    }

    async updateOne(id,identidad,fecha,descripcion,observacion,registro, ultimaActualizacion){
        const filter ={_id:new ObjectId(id)};
        const updateCmd = {
            '$set':{
                identidad,
                fecha,
                descripcion,
                observacion,
                registro, 
                ultimaActualizacion
            }
        }
        const rslt =  await this.collection.updateOne(filter,updateCmd);
        return rslt;
    }

    async deleteOne(id){
        const filter = {_id: new ObjectId(id)};
        const rslt = await this.collection.deleteOne(filter);
        return rslt;

    }


    async updateAddTag(id, tagEntry){
        const updateCmd = {
          "$push": {
            tags: tagEntry
          }
        }
        const filter = {_id: new ObjectId(id)};
        return await this.collection.updateOne(filter, updateCmd);
      }

    async updateAddTagSet(id, tagEntry) {
        const updateCmd = {
          "$addToSet": {
            tags: tagEntry
          }
        }
        const filter = { _id: new ObjectId(id) };
        return await this.collection.updateOne(filter, updateCmd);
    }

    async updatePopTag(id){
        const deleteCmd = {
            "$unset":{
                "tags":""
            }
        }
        const filter = {"_id":new ObjectId(id)}
        const rslt = await this.collection.updateOne(filter,deleteCmd);
        return rslt;
    }
}

module.exports = Expedientes;