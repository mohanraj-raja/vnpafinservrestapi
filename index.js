
const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const mongoClient = require('mongodb').MongoClient

const url = "mongodb+srv://admin:admin@cluster0-cwkdp.mongodb.net/test?retryWrites=true&w=majority";


app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

app.get('/newsadd', async function(req,res)
{
  res.sendfile('addnews.html');
});

app.post('/addnews',async function(req,res)
{
  try
  {
    console.log(req);
  console.log(req.body);
  const client = await mongoClient.connect(url);
  let news = req.body;
  news.postedOn=new Date();
  console.log(news);
  let db = client.db("vnpsfinserv")
  let result = await db.collection('news').insertOne(news);
  res.send(result);}
  catch(err)
  {
    res.send(err)
  }

});


app.get('/simpleget', async function(req, res) {
  console.log('login');
  let client = await mongoClient.connect(url);
  let db = client.db("NodeLearn");
  let users = await db.collection("users").find({ "_id": req.body.email, "password": req.body.password });
  if (users != undefined) {
    res.send(1);
  }
  else {
    res.send(-1);
  }
});

app.get('/get',async function(req, res)
{
res.send("test");
});

app.get('/getusers', async function(req, res) {
  console.log('getusers');
  let client = await mongoClient.connect(url);
  let db = client.db("NodeLearn");
  let users = await db.collection("users").find().toArray();
  console.log(users);
  client.close();
  res.send(users);
}
);

app.post('/createAccount', async function(req, res) {
  console.log('createAccount');
  let account = req.body;
  console.log(req.body);
  let client = await mongoClient.connect(url);
  let db = client.db("NodeLearn");
  await db.collection("users").insertOne(account);
  client.close()
  res.send(account)
});

app.get('/login', async function(req, res) {
  console.log('login');
  let client = await mongoClient.connect(url);
  let db = client.db("NodeLearn");
  let users = await db.collection("users").find({ "_id": req.body.email, "password": req.body.password });
  if (users != undefined) {
    res.send(1);
  }
  else {
    res.send(-1);
  }
});

app.listen(8082)
console.log('hosted on 8082')