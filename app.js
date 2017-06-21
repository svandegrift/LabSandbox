var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var socket_io = require('socket.io');

var fs = require('fs');

var app = express();
app.io = socket_io();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
// set locals, only providing error in development
res.locals.message = err.message;
res.locals.error = req.app.get('env') === 'development' ? err : {};

// render the error page
res.status(err.status || 500);
res.render('error');
});

//READING & WRITING FILES
// Writing Files
/*
fs.writeFile('files/text.txt', "This is a test", function(err){
  if(err){
    return console.log(err);
  }

  console.log("The file was saved!");
});

//Read the file back to the Console

fs.readFile('files/text.txt','utf8',function(err, data){
  if(err){
    throw err;
  };
  if(data){
    console.log(data);
  }else{
    console.log("data not retrieved");   
  };
});
*/

//ARRAY TEST WRITE/READ
/*
var name = ['Steven', 'Matt', 'David'];
var name_file = JSON.stringify(name);
var retrieved;
fs.writeFile('files/names.txt', name_file,function(err){
  if(err) throw err;
  console.log("Date saved.");
  
});

fs.readFile('files/names.txt','utf8',function(err,data){
  if(err) throw err;
  retrieved = JSON.parse(data);
  console.log("Data Retrieved")
  console.log(retrieved);
  
});
*/
var totalButton = 0;
app.io.on("connection", function(socket)
{
  var buttonNum = 0;
  var name;
  console.log("Client Online");

  socket.on('name', function(Username){
    if(Username){
       name = Username;
      console.log('name recieved:', name);
    }; 
  });
  socket.on('pushed', function(data){
    console.log("Button pushed. Notifying Clients");
    socket.broadcast.emit('notify', "A Client pushed the button");
    //To Update ALL sockets use app.io.sockets.ex; for all but itself use socket.broadcast.ex;
    
    
  });
});


module.exports = app;