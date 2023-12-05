const mongodb = require('mongodb')
const Mongoclient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectId;


let database;
async function getDataBase(){
    const client = await Mongoclient.connect('mongodb://127.0.0.1:27017/');

    database = client.db('library')
    if (!database) {
        console.log('database is not available ');
    }else{
        return database;
    }

}
module.exports = {
    getDataBase,
    ObjectID
}