
const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const mongoClient = require('mongodb').MongoClient;
const cors = require('cors');

const url = "mongodb+srv://admin:admin@cluster0-cwkdp.mongodb.net/test?retryWrites=true&w=majority";


app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

app.use(function (req, res, next) {
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,X-Auth-Token");
     res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
     next();
 });

app.get('/newsadd', async function(req,res)
{
  res.sendfile('addnews.html');
});

app.post('/addnews',async function(req,res)
{
  try
  {
  const client = await mongoClient.connect(url,{ useNewUrlParser: true,useUnifiedTopology: true});
  let news = req.body;
  news.postedOn=new Date();
  console.log(req.body);
  let db = client.db("vnpsfinserv")
  let result = await db.collection('news').insertOne(news);
  res.send(result);}
  catch(err)
  {
    res.send(err)
  }

});

app.get('/getNews',async function(req,res)
{
try
  {
  const client = await mongoClient.connect(url,{ useNewUrlParser: true,useUnifiedTopology: true });
  let db = client.db("vnpsfinserv")
  let users = await db.collection("news").find().sort( { postedOn: -1 } ).toArray();
  res.send(users);}
  catch(err)
  {
    res.send(err)
  }
});

app.get('/get',async function(req, res)
{
res.send("test");
});



app.listen(8082)
console.log('hosted on 8082')