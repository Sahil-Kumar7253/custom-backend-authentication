const express = require('express');
const app = express();
const port = 3000;
const cookieParser = require("cookie-parser");
const {logReqRes} = require('./middleware/index'); 

const { connectDB } = require('./connection');
const userRoute = require("./routes/userRoutes");

const {checkForAuthentication} = require("./middleware/authMiddleware");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Connect to the database
connectDB("mongodb://localhost:27017/authdb")
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Database connection error:', err));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.use(checkForAuthentication);

app.use(logReqRes('log')); 
app.use("/",userRoute);