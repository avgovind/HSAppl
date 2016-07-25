/**
 * Created by govind on 7/23/16.
 */

var express=require("express");
var restlayer = require('./RESTLayer');
var homeServer = require('./homeserver/homeserver');


//var upload = multer().array('file');

var app=express();

// The below code is required to enable Cross Origin REST Calls
// This is required as REST server listens on 3000 port
// where as the front-end's server listens on 8080
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//app.post('/rest/hsfileupload', upload.array('file'), function(req,res){
app.post('/rest/hsfileupload', function(req,res){

  console.log("#############$$$$$$$$$$$FILES", req.files);

  restlayer.fileUploadHandler(req, res, function (err, req, res) {

    console.log("#$$$$$$ RESP: ", req.files);
    //console.log("#$$$$$$ RESP: ", resp);

    res.end("File uploaded.");
  });
});

//app.post('/rest/hsfileupload', function(req,res){
//  console.log(req);
//  console.log(req.file);
//  console.log(req.files);
//
//  upload(req,res,function(err){
//    console.log("########################", err);
//    res.end("File uploaded.");
//  })
//});

homeServer.init();
restlayer.init();

app.listen(3000,function(){
  console.log("Working on port 3000");
});