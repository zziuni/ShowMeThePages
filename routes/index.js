/*
 * GET home page.
 */
var jqtpl = require( 'jqtpl' ),
    env = require( '../src/env' ),
    util = require( '../src/utillity' ),
    pt = require( '../src/presentation' ),
    store = require( '../src/store/smtpStore.js');
//    , socket = require('socket');

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
exports.index = function( req, res ){
    "use strict";
    var render = {
        title: 'SMTP Overview',
        menu1Cls: 'active'
    };
    res.render( 'index', render );
};

exports.newSlide = function( req, res ){
    "use strict";
    var render = {
        title: 'New Slide',
        menu3Cls: 'active'
    };
    res.render( 'newSlide', render );
};

exports.slides = function( req, res ){
    "use strict";

    var runRender = function( data ){
        var render = {
            title: 'Slide List',
            menu4Cls: 'active',
            slideshows: data
        };
        res.render( 'slides', render );
    };
    store.selectAll( runRender );
};

exports.editSlide = function( req, res ){
    "use strict";
    var id = req.params.slideId;
    var runRender = function( data ){
        var render = {
            title: 'Edit Slide',
            menu2Cls: 'active',
            id: data._id,
            slideTitle: data.title,
            mdContents: data.mdContents
        };
        res.render( 'editSlide', render );
    };
    store.selectOne( id, runRender );
};

exports.updateSlide = function( req, res ){
    "use strict";
    var runRender = function( data ){
        var render = {
            path: '/slides'
        };
        res.render( 'redirectView', render );
    };
    store.updateOne( req.body, runRender );
};

exports.showSlide = function( req, res ){
    "use strict";
    var slideId = req.params.slideId;
    var runRender =  function( data ){
        var htmlContents = env.util.makeHtmlFromMarkdown( data.mdContents );
        var host = req.header( 'host' );

        host = env.util.getMybeLocalHost( host );
        var mobileUrl = 'http://' + host + '/m/' + slideId;

        var callback = function( shortUrl ){
            var render = {
                title: 'Slide Title',
                shortUrl: shortUrl,
                slideTitle: data.title,
                contents: htmlContents
            };
            res.render( 'showSlide', render );
        };
        env.util.getShortUrl( mobileUrl, callback );
    };

    store.selectOne( slideId, runRender );

    if( !pt.isShowRoom( slideId ) ){
        env.log.debug( 'this showRoom was not. : ' + slideId + ' and add.' );
        pt.addShowRoom( slideId );
    }else{
        env.log.debug( 'this showRoom was. : ' + slideId + ' and do not add.' );
    }

};

exports.insertSlide = function( req, res ){
    "use strict";
    var runRender = function(){
        var render = {
            path: '/slides'
        };
        res.render( 'redirectView', render );
    };
    store.insert( req.body, runRender );
};

exports.removeSlide = function( req, res ){
    "use strict";
    var runRender = function(){
        env.log.info( 'removed' );
        var render = {
            path: '/slides'
        };
        res.render( 'redirectView', render );
    };
    store.remove( req.params.slideId, runRender );
};

exports.mobilePoll = function( req, res ){
    "use strict";
    res.render( 'mobilePoll', {title: 'title'} );
};