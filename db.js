
const mongoose = require('mongoose');



async function getDataBase(){

   mongoose.connect('mongodb://127.0.0.1:27017/library')
   .then(()=>{
    console.log('database connection established');
   }).catch(()=>{
    console.log('database connection Error!');
   })

}
module.exports = {
    getDataBase
   
}