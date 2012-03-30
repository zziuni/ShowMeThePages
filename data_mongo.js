/**
 * Created by JetBrains WebStorm.
 * User: luigi.byun(@zziuni)
 * Date: 12. 3. 28.
 * Time: 오후 9:32
 */
var mongo= require('mongolian');

var server = new mongo();

//document define
/*
{
    "id" : '',
    "title" : '',
    "mdContent" : '',
    "htmlContent" : '',
    "createdDate" : '',
    "modifiedDate" : '',
    "pwd" : '',
    "showLog" : [
        {
            "shownDate" : '',
            "googCount" : '',
            "badCount" : ''
        }
    ]
}

{
    "title" : 'test 2',
    "mdContent" : '2',
    "htmlContent" : '2',
    "createdDate" : '2',
    "modifiedDate" : '2',
    "pwd" : '',
}

*/

//Get database
var db = server.db("smtp_db");
var slideshows = db.collection("slideshows");

var slideshow = module.exprots = {
    "title" : '',
    "mdContents" : '',
    "htmlContents" : '',
    "createdDate" : '',
    "modifiedDate" : '',
    "pwd" : ''
};

exports.insert = function( input, callback ){
    if(!input){return;}
    var slideshow = {
        "title" : input.title,
        "mdContents" : input.mdContents,
        "htmlContents" : '',
        "createdDate" : new Date(),
        "modifiedDate" : '',
        "pwd" : ''
    };

    slideshows.insert( slideshow, function(err, value){ console.log(err)} );
    callback();
};

exports.selectAll = function( callback ){
    var result = [];
    slideshows.find({},{"title": 1,"createdDate" : 1, "modifiedDate" : 1} ).sort({createdDate: -1})
        .toArray(function(err, data){
            console.log("data.length=" + data.length);
            callback(data);
        }
    );
};

exports.select = function( query ){
    return slideshows.findOne( query );
};

exports.remove = function( query ){
    return slideshows.remove( query );
};

exports.update = function( query, data ){
    return slideshows.update( query, data );
};

/*
 // Insert some data
posts.insert({
    pageId: "hallo",
    title: "Hallo",
    created: new Date,
    body: "Welcome to my new blog!"
})

// Get a single document
posts.findOne({ pageId: "hallo" }, function(err, post) {
    //...
})

// Document cursors
posts.find().limit(5).sort({ created: 1 }).toArray(function (err, array) {
    // do something with the array
})
posts.find({ title: /^hal/ }).forEach(function (post) {
    // do something with a single post
}, function(err) {
    // handle errors/completion
})


//exports.createConnect = createConnect;

*/