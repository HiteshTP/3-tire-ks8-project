const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/tireDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a Tire model
const tireSchema = new mongoose.Schema({
  brand: String,
  model: String,
  size: String,
  type: String,
  price: Number,
});

const Tire = mongoose.model('Tire', tireSchema);

// API Routes
app.get('/tires', async (req, res) => {
  const tires = await Tire.find();
  res.json(tires);
});

app.post('/tires', async (req, res) => {
  const newTire = new Tire(req.body);
  await newTire.save();
  res.status(201).json(newTire);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

