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

exports.slideshow = {
    "title" : 'test 2',
    "mdContent" : '2',
    "htmlContent" : '2',
    "createdDate" : '2',
    "modifiedDate" : '2',
    "pwd" : ''
};

exports.insert = function( slideshow ){
    if(!slideshow){return;}
    slideshows.insert( slideshow );
};

exports.selectAll = function( ){
    return slideshows.find();
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