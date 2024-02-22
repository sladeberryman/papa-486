require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 5500;
const { MongoClient, ServerApiVersion } = require('mongodb');

// set the view engine to ejs
let path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// use res.render to load up an ejs view file

let myTypeServer = "Type 1: Reformer";

// make MongoClient with MongoClientOptions object 
const client = new MongoClient(process.env.URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    const result = await client.db("papa-database").collection("papa-collection").find().toArray();

    console.log("papa-database result: ", result);

    return result;

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

app.get('/', async (req,res) => {

  let dbResult = await run();
  console.log("myResults:", dbResult[0].userName);
  res.render('index', {
    myTypeClient: myTypeServer,
    myView: dbResult

  });

});

app.get('/send', function (req, res) {
    res.send('Hello from the (polar) <em>Express</em><br><a href="/">take me home Tom Hanks</a>')
})

app.listen(port, () => {
  console.log(`PAPA is listening on port ${port}`)
})
