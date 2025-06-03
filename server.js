const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Message = require('./models/Message');
const path = require('path');

const app = express();
const PORT = 3000;

// MongoDB Connection
mongoose.connect('mongodb+srv://muhammedminan6:UsEapOEP8ShqeJoL@cluster0.hhblpkg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

// API Endpoint
app.use(express.json()); // Needed to parse JSON requests

app.post('/submit-form', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Optional: add validation here too
    if (!name || !email || !message) {
      return res.status(400).send("All fields are required.");
    }

    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    res.send("Message submitted successfully!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error.");
  }
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
