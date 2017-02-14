const express = require('express');
const engines = require('consolidate');
const app = express();
const fs = require('fs');

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + "/views");
app.use(express.static('files'));
var images = 0;
var imgarr =[];

app.get('/',function(req, res){
    res.render('index');
});

app.get('/online',function(req, res){
    res.render('index');
    var search = req.query.search;
    if(search){
        console.log(search);
    }
});

app.get('/offline',function(req, res){
    
    res.send(200);
});


// fs.readdir('./img/',function(err, files){
//    if (err) {
//       return console.error(err);
//    }
//    console.log(files.length);
//    images = files.length;
//    for(var i = 1;i<=images;i++) {
//        imgarr.push(i+".jpg");
//    }
//    app.get('/manga',function(req, res){
//     res.status(200);
//     res.render('manga',{"images":imgarr});
// });
// });


app.listen(3000, function() {
    console.log("Server running at port 3000!");
});