//Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongojs = require('mongojs');

//Express
var app = express();

//Middleware
app.use(cors());
app.use(bodyParser.json());

//App start
const port = 3000;
app.listen(port, function(){
  console.log(`Listening on port ${port}`);
});

//Mango
var db = mongojs('species');
var birds = db.collection('birds');

//Endpoints
app.get('/api/sighting', function(req,res,next){

  if(req.query && Object.keys(req.query).length > 0) {
    // console.log(req.query);
    var searchObj = {};
    for(key in req.query){
      searchObj[key] = req.query[key];
    }
    // console.log(searchObj);
      birds.find(searchObj, function(err, result) {
        if (err) {
          res.send('err');
        } else{
          res.json(result);
        }
      });
  } else {
    birds.find({}, function(err, result) {
      if (err) {
        res.send('err');
      } else{
        res.json(result);
      }
    });
  }
});

app.post('/api/sighting', function(req, res, next){
  console.log('333333', req.body);
  birds.insert(req.body, function(err, result){
    if (err) {
      res.send('err');
    } else{
      res.json(result);
    }
  })
});

app.put('/api/sighting', function(req, res, next){
  console.log('1111111', req.query.id);
  console.log('222222', req.body);
  birds.update({_id:req.query.id}, {$set: req.body},
    function(err, result){
      if (err) {
        res.send(err);
      } else{
        res.json(result);
      }
  });
});
