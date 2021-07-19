const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');

// const connection = require('./connection');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
// app.use(connection.connection());

mongoose
  .connect("mongodb+srv://admin:LRs8p3lsplGwSsp0@quiz.wp8vv.mongodb.net/Quiz?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Database connected!"))
  .catch(err => console.log(err));
  
app.listen(port);
app.get('/', function (req, res) {
    res.send('Hello World!')
  })

const quizRouter = require('./routes/quiz');
const userRouter = require('./routes/user');

app.use('/quiz', quizRouter);
app.use('/user', userRouter);