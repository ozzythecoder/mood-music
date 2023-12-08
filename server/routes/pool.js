const {MongoClient} = require('mongodb');

    const uri = 
        "mongodb+srv://sjohnamson:nBnJJBi1TF4FWa5I@moodmusiccluster.9p8vq5c.mongodb.net/?retryWrites=true&w=majority";

    const pool = new MongoClient(uri);

module.exports = pool; 