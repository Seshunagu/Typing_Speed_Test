const express = require('express');
const mongodb = require('mongodb');
const bodyParser = require('body-parser');
const cors=require('cors');

const app = express();
const port = 3000;

// MongoDB Connection String
const mongoURI = "mongodb://127.0.0.1:27017/";
const client = new mongodb.MongoClient(mongoURI);

app.use(bodyParser.json());
app.use(cors());
app.post('/saveData', async (req, res) => {
  try {
    await client.connect();
    const db = client.db('sasi');
    const collection = db.collection('seshu');

    const dataToInsert = {
      timeLeft: req.body.timeLeft,
      mistakes: req.body.mistakes,
      wpm: req.body.wpm,
      cpm: req.body.cpm,
    };

    const result = await collection.insertOne(dataToInsert);

    console.log('Inserted document with ObjectID:', result.insertedId);

    res.status(200).json({ success: true, message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
