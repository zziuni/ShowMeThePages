
/*
 * GET home page.
 */
var jqtpl = require('jqtpl');
/*
 editSlide
 index
 insertSlide
 mobilePoll
 newSlide
 removeSlide
 updateSlide
 slides
 showSlide
 */
exports.index = function(req, res){
    res.render('index', { title: 'SMTP Overview', menu1Cls: 'active'})
};

exports.newSlide = function(req, res){
    res.render('newSlide', {title: 'New Slide', menu3Cls: 'active'});
};

exports.slides = function(req, res){
    var slideshows = require('../data_mongo').selectAll(function( data ){
        res.render( 'slides', {title: 'Slide List', menu4Cls: 'active', slideshows: data } );
    });

};

exports.editSlide = function(req, res){
    require('../data_mongo').select(req.params.slideId, function(data){
        res.render( 'editSlide', {title: 'Edit Slide', menu2Cls: 'active', id:data._id, slideTitle: data.title, mdContents: data.mdContents} ); //
    });
};

exports.updateSlide = function(req, res){
    require('../data_mongo').update(req.body, function( data ){
        res.render( 'updateSlide');
    });
};

exports.showSlide = function(req, res){
    require('../data_mongo').select(req.params.slideId,
        function(data){
            var ghm = require("github-flavored-markdown");
            var short = require('shorturl');

            var htmlContents = ghm.parse(data.mdContents);
            htmlContents = htmlContents.replace(/<hr \/>/gi, "</section>\n<section>");
            htmlContents  = "<Section>" + htmlContents  + "</Section>"

            var mobileUrl = 'http://' + req.header('host') + '/m/' + req.params.slideId;
            short(mobileUrl, function(shortUrl){
                console.log(shortUrl);
                res.render('showSlide',
                {
                    title: 'Slide Title',
                    shortUrl: shortUrl,
                    slideTitle: data.title,
                    contents: htmlContents
                });
            });

        }
    );
};

exports.insertSlide = function(req, res){
    require('../data_mongo').insert(req.body, function(){} );
    res.render( 'insertSlide' );
};

exports.removeSlide = function(req, res){
    require('../data_mongo').remove(req.params.slideId, function(){
        console.log('remove');
    });
    res.render('removeSlide');
};

exports.mobilePoll = function(req, res){
    res.render('mobilePoll', {title: 'title'});
};