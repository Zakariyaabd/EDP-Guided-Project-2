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

        const characterId = req.params.id; 
        const character = await collection.findOne({_id: new ObjectId(characterId)}); 

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


//Jeffs Work
// FILMS API


app.get('/api/films', async (req, res) => {
    
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('films'); 
        console.log("Connected to collection  ", collection);
        const films = await collection.find().toArray(); 
        res.json(films);

    } catch (error) {
        console.error("Error fetching: ", error);
    }
});
    
//FILMS/:ID API

app.get('/api/films/:id', async (req, res) => {
    try {
        await client.connect()
        const db = client.db(dbName);
        console.log("Films ID collection: ", db); 
        const collection = db.collection('films');

        const filmsId = +req.params.id; 
        const films = await collection.findOne({id: (filmsId)}); 

        if (films) {
            res.json(films)
        } else {
            res.status(404).send('Character not found'); 
        }
    } catch (error) {
        console.error("Error fetching: ", error);
        res.status(500).send('server error. ')
    }
});

//FILMS/:ID/PLANETS API
//NOT WORKING
/*
app.get('/api/films/:id/planets', async (req, res) => {
    try {
        await client.connect()
        const db = client.db(dbName);

        const planetsCollection = db.collection('planets');
        const planetsFilmsCollection = db.collection('planets_films')

        const filmsId = +req.params.id;

        const planetFilmEntry = await planetsFilmsCollection.find({ films_id: (filmsId) }).toArray();
       

        if (planetsFilmEntry.length === 0) {
            return res.status(404).send('No planets ID found');
        }

        const planetsId = planetFilmEntry.map(entry => (entry.planets_id));
        console.log("planets ID: ", planetsId);
        const planets = await planetsCollection.find({ id: { $in: planetsId } }).toArray();
        res.json(planets);

    } catch (error) {
        console.error("Error fetching: ", error);
        res.status(500).send('server error. ')
    }
});

*/

app.listen(port,() =>(console.log("listening")))

