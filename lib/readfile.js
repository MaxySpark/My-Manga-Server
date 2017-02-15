const fs = require('fs');
var folders = [];
function readDir(callback){
    fs.readdir(__dirname+'/../files/',function(err, files){
        if (err) {
            return console.error(err);
        }
        // console.log(files);
        files.forEach(function(element){
            fs.readdir(__dirname+'/../files/'+element+'/',function(err, subfiles){ 
                folders.push({
                    "dir_name" : element,
                    "sub_dir" : subfiles
                });
            });
        });
        setTimeout(function(){
            callback(folders);
        },5000);
    });
}

module.exports = readDir;