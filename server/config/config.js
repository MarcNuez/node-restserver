

//puerto


process.env.PORT = process.env.PORT || 3000;

//entorno

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//Vencimiento del token

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;






//SEED de auth

process.env.SEED = process.env.SEED || 'secret';









//base de datos


let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://marcnut:marcnut29@cluster0.haex7.mongodb.net/cafe?authSource=admin&replicaSet=atlas-gy0c1n-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true';
}


process.env.URLDB = urlDB;


