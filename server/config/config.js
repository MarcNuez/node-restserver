

//puerto


process.env.PORT = process.env.PORT || 3000;

//entorno

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//base de datos


let urlDB;

// if(process.env.NODE_ENV === 'dev'){
    // urlDB = 'mongodb://localhost:27017/cafe';
// }else{
    urlDB = 'mongodb+srv://marcnut:marcnut29@cluster0.haex7.mongodb.net/cafe?authSource=admin&replicaSet=atlas-gy0c1n-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true';
// }


process.env.URLDB = urlDB;


