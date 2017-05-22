"use strict";
var express  = require('express');
var app      = express();                               // create our app w/ express                    // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var mongodb = require('mongodb');
var client = mongodb.MongoClient;
var cors = require('cors');
let _db;
let locations;




// Configuration


var uri = 'mongodb://esika:4G%40mhU7Sb9i@ds143231.mlab.com:43231/na';
client.connect(uri,(err,db) => {

if(err){
  console.log('Erreur lors de la connection à BD');
  process.exit(1);
}

_db = db;
locations = _db.collection('locations');
console.log('Connection à la BD');


});
//mongo ds143231.mlab.com:43231/na -u esika -p 4G@mhU7Sb9i
/*var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connection esim');
});
*/




app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(cors());


app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

app.get('/api/locations',(req,res) => {

  console.log('Viewing locations')

locations.find().toArray((err,bisika) => {
  console.log(bisika);
  res.json(bisika);
});



});

app.get('/',function(req,res){
  res.json('Bienvenu sur esika');
});

app.post('/api/locations',function(req,res){

  console.log(req.body);


   locations.insert({
     name : req.body.name,
     location : {
       latitude: req.body.location.latitude,
       longitude: req.body.location.longitude
     },
     type: req.body.type,
     description: "",
     features: [""],
     creation_date: Date.now()
   });

   res.json('Dans le serveur');



});



app.listen(8080,function() {
  console.log("App listening on port 8080");



});
