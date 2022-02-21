require('dotenv').config();
const getDb = require('../dao/mongodb');

const descripcionArr = [
    'Tos',
    'Dolor de cabeza',
    'Fiebre',
    'Dolor Muscular',
    'Cansancio',
    'Fatiga',
    'Dificultad para respirar',
    'Falta de apetito',
];

const observacionArr = [
    "covid",
    'refriado',
    'gripe',
    'dengue',
    'omicron',
    'zika',
    'h1n1'
]

const expedientes = 50;
const expedientesArr = [];

for (var i = 0 ; i < expedientes ; i++){
    const secuencia = String(Math.ceil(Math.random()*99999)).padStart(5,'0');
    const anio = ((new Date().getTime() % 2) === 0) ? 1980 + Math.floor(Math.random() * 20) : 2000 + Math.floor(Math.random() * 23);
    const fecha = new Date(Date.now()).toLocaleDateString();
    const descripcion = descripcionArr[Math.floor(Math.random()*8)];
    const observacion = observacionArr[Math.floor(Math.random()*7)];
    const registro =  String(Math.ceil(Math.random()*9999)).padStart(4,'0');
    const ultimaActualizacion = new Date(Date.now()).toLocaleDateString();
    const docs = {
        identidad : `0601${anio}${secuencia}`,
        fecha,
        descripcion,
        observacion,
        registro,
        ultimaActualizacion
    }
    expedientesArr.push(docs);
}

getDb().then(db=>{
    const expedientes = db.collection('Expedientes');
    expedientes.insertMany(expedientesArr,(err,rslts)=>{
        if(err){
            console.log(err);
        }
        console.log(rslts);
        return;
    }); 
});
