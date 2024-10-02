import express from 'express';
import { MongoClient, ObjectId } from 'mongodb'; 
import dotenv from 'dotenv';
import cors from 'cors';

// load environment variable from .env
dotenv.config();

const URL = process.env.MONGO_DB_URL; 
const dbName = process.env.MONGO_DB; 

const app = express();
const port = 3000;
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

const client = new MongoClient(URL);
// mongo DB connections
app.get('/api/characters', async (req, res) => {
    
    try {
        // const client = new MongoClient(URL);
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

app.get('/api/characters/:id', async (req, res) => {
    try {
        // const client = new MongoClient(URL);
        await client.connect()
        const db = client.db(dbName);
        console.log("character ID collection: ", db); 
        const collection = db.collection('characters');

        const characterId = +req.params.id; 
        const character = await collection.findOne({"id": characterId}); 

        if (character) {
            res.json(character)
        } else {
            res.status(404).send('Character not found'); 
        }


    } catch (error) {
        console.error("Error fetching: ", error);
        res.status(500).send('server error. ')
    }
});
    
app.get('/api/planets/:id', async (req, res) => {
    try {
        // const client = new MongoClient(URL);
        await client.connect()
        const db = client.db(dbName);
        const collection = db.collection('planets');

        const planetId = +req.params.id; 
        const planet = await collection.findOne({'id': planetId}); 

        if (planet) {
            res.json(planet)
        } else {
            res.status(404).send('Planet not found'); 
        }


    } catch (error) {
        console.error("Error fetching: ", error);
        res.status(500).send('server error. ')
    }
});


app.get('/api/planets', async (req, res) => {
    
    try {
        // const client = new MongoClient(URL);
        await client.connect();
        const db = client.db(dbName);
        console.log("Connected to Db ", db);
        const collection = db.collection('planets'); 
        const planets = await collection.find().toArray(); 
        res.json(planets);

    } catch (error) {
        console.error("Error fetching: ", error);
    }
});




app.listen(port,() =>(console.log("listening")))

