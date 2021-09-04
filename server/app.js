const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config({ path: require('find-config')('.env') });
require('./connection/connection');

const quizRouter = require('./routes/quiz');
const userRouter = require('./routes/user');

const app = express();

app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000',optionSuccessStatus:200}));
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header('Access-Control-Allow-Credentials', true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cookie"
  );
  res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET,OPTIONS');
  next();
});
  
app.use('/quiz', quizRouter);
app.use('/user', userRouter);

module.exports = app;


