const express = require("express");
const { MongoClient, ObjectId } = require ("mongodb"); 
const dotenv = require('dotenv');

// load environment variable from .env
dotenv.config();

const URL = process.env.MONGO_DB_URL; 
const dbName = process.env.MONGO_DB; 

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// mongo DB connections
app.get('/api/characters', async (req, res) => {
    
    try {
        const client = new MongoClient(URL);
        await client.connect();
        const db = client.db(dbName);
        console.log("Connected to Db ", db);
        const collection = db.collection('characters'); 
        console.log("Connected to collection  ", collection);
        const characters = await collection.find().toArray(); 
        res.json(characters);

    } catch (error) {
        console.error("Error fetching: ", error);
    }
});


app.listen(port,() =>(console.log("listening")))

