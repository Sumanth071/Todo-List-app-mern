const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const todoRoutes = require('./routes/todoRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://ksumanthyadav120:Sumanth-db@suman.1lwpnwk.mongodb.net/todolist', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/todos', todoRoutes);

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
