/**
 * Created by JetBrains WebStorm.
 * User: luigi.byun(@zziuni)
 * Date: 12. 3. 28.
 * Time: 오후 9:32
 */
var mongo= require('mongolian');

var server = new mongo();
var objectId = mongo.ObjectId;
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
    slideshows.find({},{"_id":1,"title": 1,"createdDate" : 1, "modifiedDate" : 1} ).sort({createdDate: -1})
        .toArray(function(err, data){
            console.log("data.length=" + data.length);
            callback(data);
        }
    );
};

exports.select = function( slideId, callback ){
    var sid = new objectId(slideId) ;
    slideshows.findOne( {"_id": sid }, function(err, data){
        if(err){ console.log( err ); }
        callback(data)
    });
};

exports.remove = function( slideId, callback ){
    var sid = new objectId(slideId) ;
    slideshows.remove( {"_id": sid }, function(err, data){
            if(err){ console.log(err);}
            callback(data);
        }
    );
};

exports.editSlide = function( slideId, callback){
    var sid = new objectId(slideId) ;
    slideshows.findOne( {"_id": sid }, function(err, data){
        if(err){ console.log( err ); }
        callback(data)
    });
};

exports.update = function( source, callback ){

    var sid = new objectId(source.id) ;
    slideshows.findOne( {"_id": sid }, function(err, target){
        console.log(target);
        target.title = source.title;
        target.mdContents = source.mdContents;
        slideshows.update({"_id": sid }, target, function(err, result){
            callback(result);
        });

    });

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