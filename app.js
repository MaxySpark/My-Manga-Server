const express = require('express');
const engines = require('consolidate');
const app = express();
const fs = require('fs');
const path = require('path');
const getChapter = require('./lib/read_chapter');
const manga = require('./lib/manga');
const readDir = require('./lib/readfile');

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + "/views");
app.use(express.static('files'));
app.use('/ext', express.static(path.join(__dirname, 'views/ext')));

//folder read begins
var folderList = [];
readDir(folderUpdate);

function folderUpdate(folders){
    folderList = folders;
    // console.log(folderList);
}
//folder read ends

//setTimeout
setTimeout(function() {

    app.get('/',function(req, res){
        res.render('index');
    });

    app.use('/online',function(req, res, next) {
        var search = req.query.search;
        var chap = req.query.chap;
        var chap_to = req.query.chap_to;    
        if(search){
            console.log(search);
            manga(search,chap,chap_to,next);
        }
    })

    app.get('/online',function(req, res){
        res.render('online');
    });


    fs.readdir('./files/',function(err, files){
        var fileObj = [];
        var inc = 0;
        if (err) {
            return console.error(err);
        }
        console.log(files);
        files.forEach(function(file){
            fileObj.push({
                "name": file,
                "id" : ++inc
            });
        });
        console.log(fileObj);
        app.get('/offline',function(req, res){
                res.status(200);
                res.render('offline',{"dirList":fileObj});
        });

        app.get('/offline/:id',function(req, res){
            var id = parseInt(req.params.id,10)-1;
            console.log(id);
            var chapterList = getChapter(files[id]);
            var chapObj = [];
            var inc = 0;        
            chapterList.forEach(function(element){
                chapObj.push({
                    "name" : element,
                    "id" : ++inc
                });
            });
            res.render('chapter',{"chapterList":chapObj, "manga":files[id] });
        });

    });

    app.get('/manga',function(req, res){
            var manga = req.query.manga;
            var chapter_name = req.query.chap_name;
            var images = 0;
            var imgarr = [];
            fs.readdir(__dirname+'/files/'+manga+'/'+chapter_name+'/',function(err, files){
                if (err) {
                    return console.error(err);
                }
                console.log(files);
                images = files.length;
            });
            for(var i = 1;i<=images;i++) {
                imgarr.push(i+".jpg");
            }

        res.render('manga',{"images":imgarr});

    });

    app.listen(3000, function() {
        console.log("Server running at port 3000!");
    });

},8000);
