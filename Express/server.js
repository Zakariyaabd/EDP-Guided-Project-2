const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
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
        const character = await collection.findOne({ _id: new ObjectId(characterId) });

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

app.get('/api/characters/:id/films', async (req, res) => {
    try {
        // const client = new MongoClient(URL);
        await client.connect()
        const db = client.db(dbName);

        // const charactersCollection = db.collection('characters');
        const filmsCollection = db.collection('films');
        const filmsCharactersCollection = db.collection('films_characters')

        const characterId = +req.params.id;

        const filmCharEntry = await filmsCharactersCollection.find({ character_id: (characterId) }).toArray();
       

        if (filmCharEntry.length === 0) {
            return res.status(404).send('No films ID found');
        }

        const filmsId = filmCharEntry.map(entry => (entry.film_id));
        console.log("films ID: ", filmsId);
        const films = await filmsCollection.find({ id: { $in: filmsId } }).toArray();
        res.json(films);

    } catch (error) {
        console.error("Error fetching: ", error);
        res.status(500).send('server error. ')
    }
});




// app.get('/api/films/:id/characters'), async (req, res) => { 

//     try {
//         // const client = new MongoClient(URL);
//         await client.connect()
//         const db = client.db(dbName);

//         const charactersCollection = db.collection('characters');
//         const filmsCollection = db.collection('films');
//         const filmsCharactersCollection = db.collection('films_characters')
//         console.log ("chracters DB", charactersCollection);

//         const filmId = +req.params.id;
//         console.log("film ID", filmId)

//         const filmCharEntry = await filmsCharactersCollection.find({ film_id: (filmId) }).toArray();
//         console.log("film entry", filmCharEntry);

//         if (filmCharEntry.length === 0) {
//             return res.status(404).send('No films ID found');
//         }

//         const characterId = filmCharEntry.map(entry => (entry.character_id));
//         console.log("films ID: ", characterId);
//         const characters = await charactersCollection.find({ id: { $in: characterId } }).toArray();
//         res.json(characters);

//     } catch (error) {
//         console.error("Error fetching: ", error);
//         res.status(500).send('server error. ')
//     }
// }




app.listen(port, () => (console.log("listening")))

