const {MongoClient} = require('mongodb');

    const uri = 
process.env.MONGODB_URI
    const pool = new MongoClient(uri);

module.exports = pool; 