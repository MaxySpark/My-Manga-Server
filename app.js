const express = require('express');
const engines = require('consolidate');
const app = express();
const fs = require('fs');
const path = require('path');
app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + "/views");
app.use(express.static('files'));
app.use('/ext', express.static(path.join(__dirname, 'views/ext')));

app.get('/',function(req, res){
    res.render('index');
});

app.get('/online',function(req, res){
    res.render('online');
    var search = req.query.search;
    if(search){
        console.log(search);
    }
});


fs.readdir('./files/',function(err, files){
   if (err) {
      return console.error(err);
   }
   console.log(files);

   app.get('/offline',function(req, res){
        res.status(200);
        res.render('offline',{"dirList":files});
});
});

app.get('/manga',function(req, res){
    res.render('manga');
});

app.listen(3000, function() {
    console.log("Server running at port 3000!");
});