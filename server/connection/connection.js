const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://admin:LRs8p3lsplGwSsp0@quiz.wp8vv.mongodb.net/Quiz?retryWrites=true&w=majority";

async function listDatabases(client){
  databasesList = await client.db().admin().listDatabases();
  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function connection(){
    const client = new MongoClient(uri);
    try {
        const connection = await client.connect();
        const db = client.db('Quiz');
        // const Quiz = db.collection('Quiz');
        // const User = db.collection('User');
        // const Score = db.collection('Score');
        // console.log(quiz);
        // await  listDatabases(client);
        if(connection){
          console.log("connection successful"+ connection);
        }
    } 
    catch (e) {
        console.error(e);
    } 
    // finally {
    //     await client.close();
    // }
   
  }
  
  connection().catch(console.error);
  