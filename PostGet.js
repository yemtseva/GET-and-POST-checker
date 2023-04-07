var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 45112);

app.get('/',function(req,res){
  var parms = [];
  for (var p in req.query){
    parms.push({'name':p,'value':req.query[p]})
  }
  var context = {};
  context.dataList = parms;
  res.render('GET', context);
});

app.post('/', function(req,res){
  var parms = [];
  for (var p in req.body){
    parms.push({'name':p,'value':req.body[p]})
  }
  console.log(parms);
  console.log(req.body);
  var context = {};
  context.dataList = parms;
  res.render('POST', context);
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
