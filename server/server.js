const express = require('express');
require('dotenv').config({ path: require('find-config')('.env') });
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT;

app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000',optionSuccessStatus:200}));
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header('Access-Control-Allow-Credentials', true);
  // res.setHeader("Access-Control-Max-Age", "1800");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cookie"
  );
  res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET,OPTIONS');
  next();
});

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
    res.json(req.cookies);
  })

const quizRouter = require('./routes/quiz');
const userRouter = require('./routes/user');

app.use('/quiz', quizRouter);
app.use('/user', userRouter);


