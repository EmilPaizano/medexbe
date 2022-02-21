const getDb = require("../db");
let db =  null;

class Expedientes{
    constructor(){
        getDb()
        .then((database)=>{
            db = database;
            if(process.env.MIGRATE === "true"){
                const createStatement = "CREATE TABLE IF NOT EXISTS expedientes(id INTEGER PRIMARY KEY AUTOINCREMENT,identidad TEXT,fecha TEXT, descripcion TEXT, observacion TEXT, registro TEXT,ultimaActualizacion TEXT);";
                db.run(createStatement);
            }
        })
        .catch((err)=>{
            console.error(err);
        })
    }

    new (identidad,fecha,descripcion,observacion,registro, ultimaActualizacion){
        return new Promise((accept,reject)=>{
            db.run(
                'INSERT INTO expedientes(identidad,fecha,descripcion,observacion,registro,ultimaActualizacion) VALUES(?,?,?,?,?,?);',
                [identidad,fecha,descripcion,observacion,registro, ultimaActualizacion],
                (err,rslt)=>{
                    if(err){
                        console.error(err);
                        reject(err);
                    }else{
                        accept(rslt);
                    }
                }
            );
        });
    }

    getAll(){
        return new Promise((accept,reject)=>{
            db.all('SELECT * FROM expedientes',(err,rslt)=>{
                if(err){
                    console.error(err);
                    reject(err);
                }else{
                    accept(rslt);
                }
            });
        });
    }

    getById(id){
        return new Promise((accept,reject)=>{
            db.get("SELECT * FROM expedientes WHERE id = ?",
            [id],
            (err,row)=>{
                if(err){
                    console.error(err);
                    reject(err);
                }else{
                    accept(row);
                }
            });
        });
    }

    updateOne(id,identidad,fecha,descripcion,observacion,registro, ultimaActualizacion){
        return new Promise((accept,reject)=>{
            const sqlUpdate="UPDATE expedientes SET identidad = ?,fecha = ?,descripcion = ? ,observacion = ?,registro = ?, ultimaActualizacion = ? WHERE id = ?;";
            db.run(sqlUpdate,
                [identidad,fecha,descripcion,observacion,registro, ultimaActualizacion,id],
                (err,rslt)=>{
                    if(err){
                        console.error(err);
                        reject(err);
                    }else{
                        accept(rslt);
                    }
            });
        });
    }

    deleteOne(id){
        return new Promise((accept,reject)=>{
            const sqlDelete = 'DELETE FROM expedientes WHERE id=?';
            db.run(
                sqlDelete,
                [id],
                (err,rslt)=>{
                    if(err){
                        console.log(err);
                        reject(err);
                    }else{
                        accept(rslt);
                    }
                }
            );
        });
    }
}

module.exports = Expedientes;