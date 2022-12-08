const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/test', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const duckSchema = new mongoose.Schema({
  name: String,
  price: String,
  description: String,
  location: String,
  img: Buffer,
  is_bought: Boolean,
  is_favorite: Boolean
});

duckSchema.virtual('id')
  .get(function () {
    return this._id.toHexString();
  });

duckSchema.set('toJSON', {
  virtuals: true
});

const Duck = mongoose.model('duck', duckSchema);

app.get('/api/favorites', async (req, res) => {
  try {
    let favorites = await Duck.find({
      is_favorite: true
    });
    console.log('duck' + favorites);
    res.send(favorites);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/ducks', async (req, res) => {
  try {
    let ducks = await Duck.find();
    console.log('duck' + ducks);
    res.send(ducks);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/ducks/:id', async (req, res) => {
  try {
    let duck = await Duck.find({
      _id: req.params.id
    });
    console.log('duck' + duck);
    res.send(duck[0]);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/ducks', async (req, res) => {
  const duck = new Duck({
    name: req.body.name,
    price: req.body.price,
    img: req.body.img,
    description: req.body.description,
    location: req.body.location,
    is_bought: req.body.is_bought ? true : false,
    is_favorite: req.body.is_favorite ? true : false
  });
  try {
    await Duck.save();
    console.log('duck' + duck);
    res.send(duck);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/ducks/:id', async (req, res) => {
  try {
    await Duck.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.listen(3000, () => console.log('Server listening on port 3000!'));