/**
 * Created by JetBrains WebStorm.
 * User: luigi.byun(@zziuni)
 * Date: 12. 3. 28.
 * Time: 오후 9:32
 */
var mongo= require('mongolian');


var server = new mongo;

// Get database
var db = server.db("awesome_blog")

// Get some collections
var posts = db.collection("posts")
var comments = db.collection("comments")

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