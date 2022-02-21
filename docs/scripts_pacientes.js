require('dotenv').config();
const getDb = require('../dao/mongodb');

const names = [
    'FULANITO',
    'MENGANITO',
    'SUTANITO',
    'LULU',
    'PACO',
    'HUGO',
    'LUIS',
    'DONALD'
];

const surnames =[
    'MKQUACK',
    'RICO',
    'DTAL',
    'DE LA SANTA CRUZ',
    'MELGAR',
    'CABILO',
    'CADILLO',
    'CHE'
];

const pacientes =50;
const pacientesArr = [];

for (var i =0 ;i<pacientes;i++){
    const anio = ((new Date().getTime() % 2) === 0) ? 1980 + Math.floor(Math.random() * 20) : 2000 + Math.floor(Math.random() * 23);
    const secuencia = String(Math.ceil(Math.random()*99999)).padStart(5,'0');
    const nombres =names[Math.floor(Math.random()*(8))];
    const apellidos = surnames[Math.floor(Math.random()*(8))];
    const correo = (`${nombres}.${apellidos}@mail.com`).toLocaleLowerCase();
    const telefono = `${(20000000 + Math.floor(Math.random()* 10000000))}`;

    const doc = {
        nombres,
        apellidos,
        identidad:`0601${anio}${secuencia}`,
        telefono,
        correo
    }
    pacientesArr.push(doc);
}

getDb().then(db=>{
    const pacientes =  db.collection("Pacientes");
    pacientes.insertMany(pacientesArr,(err,rslts)=>{
        if(err){
            console.log(err);
        }
        console.log(rslts);
        return;
    })
});