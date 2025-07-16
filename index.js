const express = require('express');
const app = express();
const port = 8000;
const { connectDB } = require('./connection');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to the database
connectDB('mongodb://localhost:27017/authdb')
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Database connection error:', err));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

