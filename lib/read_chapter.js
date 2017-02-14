const fs = require('fs');
var chapterlist = [];
function getChapter(manga) {
    console.log(manga);
    fs.readdir(__dirname+'/../files/'+manga,function(err, files){
        if (err) {
            return console.error(err);
        }
        console.log(files);
        chapterlist = files;
    });
    return chapterlist;
}

module.exports = getChapter; 