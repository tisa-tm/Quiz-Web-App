const app = require('./app');
const port = process.env.PORT || 5000;


app.listen(port);
app.get('/', function (req, res) {
  console.log("Server is now running");
  });

