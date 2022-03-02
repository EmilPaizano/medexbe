const ObjectId = require("mongodb").ObjectId;
const getDb = require("../mongodb");
let db = null;
class Pacientes {
    collection = null;
    constructor(){
        getDb()
            .then((database)=>{
                db = database;
                this.collection = db.collection('Pacientes');
                if(process.env.MIGRATE === "true"){
                    //por si ocupa algo
                }
            })
            .catch((err)=>{
                console.error(err);
            });
    }

    //CREACION DE UN NUEVO REGISTRO DE PACIENTE (Ya que mongodb utiliza promesas, las funciones deben ser asincronas)
    async new (nombres,apellidos,identidad,telefono,correo){
        const newPaciente = {
            nombres,
            apellidos,
            identidad,
            telefono,
            correo
        };
        const rlst = await this.collection.insertOne(newPaciente);
        return rlst;
    }

    //LECTURA DE TODOS LOS REGISTROS DE PACIENTES
    async getAll (){
        const cursor = this.collection.find({});
        const documents = await cursor.toArray(); //combierte los datos que recibe en JSON para poder manejarlos con JS
        return documents;
    }

    async getFaceted(page,items,filter={}){
        const cursor = this.collection.find(filter)
        const totalItems = await cursor.count();
        cursor.skip((page-1)*items); //Esta funcion skip() recive como parametro la cantidad de elementos que se van a saltar de un arreglo.
        cursor.limit(items);
        const rslt = await cursor.toArray();
        return {
            totalItems,
            page,items,
            totalPages:(Math.ceil(totalItems/items)),
            rslt};

    }

    async getById(id){
        const _id = new ObjectId(id);
        const filter = {_id};
        const myDocument = await this.collection.findOne(filter);
        return myDocument;
    }

    async updateOne(id,nombres,apellidos,identidad,telefono,correo){
        const filter = {_id:new ObjectId(id)};
        const updateCmd = {
            '$set':{ // $set permite a mongo identificarlo como una actualizacion y no como un reempleazo del documento ya existente
                nombres,
                apellidos,
                identidad,
                telefono,
                correo
            }
        }
        const rslt = await this.collection.updateOne(filter,updateCmd);
        return rslt;
    }

    async deleteOne(id){
        const filter = {_id:new ObjectId(id)};
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


module.exports = Pacientes;