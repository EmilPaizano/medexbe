const getDb = require("../db");
let db = null;
class Pacientes {
    constructor(){
        getDb()
            .then((database)=>{
                db = database;
                if(process.env.MIGRATE === "true"){
                    const createStatement ="CREATE TABLE IF NOT EXISTS pacientes (id INTEGER PRIMARY KEY AUTOINCREMENT,identidad TEXT, nombres TEXT,apellidos ,email TEXT,telefono TEXT);";
                    db.run(createStatement);
                }
            })
            .catch((err)=>{
                console.error(err);
            });
    }

    new (nombres,apellidos,identidad,telefono,correo){
        return new Promise((accept,reject)=>{
            db.run(
                'INSERT INTO pacientes (identidad,nombres,apellidos,email,telefono) VALUES(?,?,?,?,?);',
                [identidad,nombres,apellidos,correo,telefono],
                (err,rslt)=>{
                    if(err){
                        console.error(err);
                        reject(err);
                    }else{
                        accept(rslt)
                    }
                }
            )
        })
    }

    getAll (){
        return new Promise((accept,reject)=>{
            db.all("SELECT * FROM pacientes",(err,rows)=>{
                if(err){
                    console.error(err);
                    reject(err);
                }else{
                    accept(rows);
                }
            });
        });
    }

    getById(id){
        return new Promise((accept,reject)=>{
            db.get('SELECT * FROM pacientes WHERE id = ?',[id],(err,row)=>{
                if(err){
                    console.error(err);
                    reject(err);
                }else{
                    accept(row);
                }
            });
        });
    }

    updateOne(id,nombres,apellidos,identidad,telefono,correo){
        return new Promise((accept,reject)=>{
            const sqlUpdate="UPDATE pacientes SET nombres = ?,apellidos = ?, identidad = ?, telefono=?,email=? WHERE id= ?;";
            db.run(
                sqlUpdate,
                [nombres,apellidos,identidad,telefono,correo,id],
                function(err){
                    if(err){
                        console.error(err);
                        reject(err);
                    }else{
                        accept(this);
                    }
                }
            );
        });
    }

    deleteOne(id){
        return new Promise((accept,reject)=>{
            const sqlDelete =  'DELETE FROM pacientes WHERE id = ?;';
            db.run(
                sqlDelete,
                [id],
                function(err){
                    if(err){
                        reject(err);
                    }else{
                        accept(err);
                    }
                }
            )
        })
    }
}


module.exports = Pacientes;