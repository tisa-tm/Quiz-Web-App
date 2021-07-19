const express = require('express');
require('dotenv').config({ path: require('find-config')('.env') });
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.ATLAS_URI, {
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