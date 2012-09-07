/*
 * GET home page.
 */
var jqtpl = require( 'jqtpl' ),
    clog = require( 'clog' ),
    pt = require( '../presentation' );
//    , socket = require('socket');

clog.prototype.configure( {'log level': 5} );

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
    res.render( 'index', { title: 'SMTP Overview', menu1Cls: 'active'} );
};

exports.newSlide = function( req, res ){
    "use strict";
    res.render( 'newSlide', {title: 'New Slide', menu3Cls: 'active'} );
};

exports.slides = function( req, res ){
    "use strict";
    var slideshows = require( '../data_mongo' ).selectAll( function( data ){
        res.render( 'slides', { title: 'Slide List', menu4Cls: 'active', slideshows: data } );
    } );

};

exports.editSlide = function( req, res ){
    "use strict";
    require( '../data_mongo' ).select( req.params.slideId, function( data ){
        res.render( 'editSlide',
            {title: 'Edit Slide', menu2Cls: 'active', id: data._id, slideTitle: data.title, mdContents: data.mdContents} ); //
    } );
};

exports.updateSlide = function( req, res ){
    "use strict";
    require( '../data_mongo' ).update( req.body, function( data ){
        res.render( 'redirectView', { path: '/slides' } );
    } );
};

exports.showSlide = function( req, res ){
    "use strict";
    clog.debug( 'call showSlide' );

    var slideId = req.params.slideId;
    require( '../data_mongo' ).select( slideId,
        function( data ){
            clog.debug( 'mongo select callback' );
            var ghm = require( "github-flavored-markdown" );
            var shorturl = require( 'shorturl' );

            var htmlContents = ghm.parse( data.mdContents );
            htmlContents = htmlContents.replace( /<hr \/>/gi, "</section>\n<section>" );
            htmlContents = "<Section>" + htmlContents + "</Section>";

            var a = req.connection.address();
            for( var o in a ){
                if( a.hasOwnProperty( o ) ){
                    clog.debug( 'now host name : ' + a[o] );
                }
            }
            var mobileUrl = 'http://' + req.header( 'host' ) + '/m/' + slideId;
            shorturl( mobileUrl, function( shortUrl ){
                console.log( shortUrl );
                res.render( 'showSlide',
                    {
                        title: 'Slide Title',
                        shortUrl: shortUrl,
                        slideTitle: data.title,
                        contents: htmlContents
                    } );
            } );

        }
    );
    if( !pt.isShowRoom( slideId ) ){
        clog.debug( 'this showRoom was not. : ' + slideId + ' and add.' );
        pt.addShowRoom( slideId );
    }else{
        clog.debug( 'this showRoom was. : ' + slideId + ' and do not add.' );
    }

};

exports.insertSlide = function( req, res ){
    "use strict";
    require( '../data_mongo' ).insert( req.body, function(){} );
    res.render( 'redirectView', { path: '/slides'} );
};

exports.removeSlide = function( req, res ){
    "use strict";
    require( '../data_mongo' ).remove( req.params.slideId, function(){
        console.log( 'remove' );
    } );
    res.render( 'redirectView', { path: '/slides' } );
};

exports.mobilePoll = function( req, res ){
    "use strict";
    res.render( 'mobilePoll', {title: 'title'} );
};