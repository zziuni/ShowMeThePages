/**
 * Created by JetBrains WebStorm.
 * User: luigi.byun(@zziuni)
 * Date: 12. 3. 28.
 * Time: 오후 9:32
 */
var mongo = require( 'mongolian' ),
    env = require( './../env' ),
    mongo_user = process.env.MONGODB_USER,
    mongo_pwd = process.env.MONGODB_PWD,
    mongo_port = process.env.MONGODB_PORT;

env.log.debug( 'mongo connect :' + mongo_user + ', ' + mongo_pwd + ', ' + mongo_port );

var db = new mongo( 'mongo://' + mongo_user + ':' + mongo_pwd + '@localhost:' + mongo_port + '/smtp_db' ),
    AbjectId = mongo.ObjectId;
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

 */
var slideshows = db.collection( "slideshows" );

exports.insert = function( input, callback ){
    "use strict";
    if( !input ){return;}
    var slideshow = {
        "title": input.title,
        "mdContents": input.mdContents,
        "htmlContents": '',
        "createdDate": new Date(),
        "modifiedDate": '',
        "pwd": ''
    };

    slideshows.insert( slideshow, function( err, value ){
        callback();
    } );

};

exports.selectAll = function( callback ){
    "use strict";

    slideshows.find( {}, {"_id": 1, "title": 1, "createdDate": 1, "modifiedDate": 1} )
        .sort( {createdDate: -1} )
        .toArray( function( err, data ){
            var i, cdate, mdate;
            if( data ){
                for( i = data.length - 1; i >= 0; i -= 1 ){
                    cdate = data[i].createdDate;
                    mdate = data[i].modifiedDate;
                    data[i].createdDate = cdate.getFullYear() + '-' + cdate.getMonth() + '-' + cdate.getDate() + ' ' + cdate.toLocaleTimeString();
                    if( mdate ){
                        data[i].modifiedDate = mdate.getFullYear() + '-' + mdate.getMonth() + '-' + mdate.getDate() + ' ' + mdate.toLocaleTimeString();
                    }
                }
            }
            callback( data );
        }
    );
};

exports.select = function( slideId, callback ){
    "use strict";
    var sid = new AbjectId( slideId );
    slideshows.findOne( {"_id": sid }, function( err, data ){
        if( err ){ env.log.error( 'Error: can not select on DB:', err ); }
        callback( data );
    } );
};

exports.remove = function( slideId, callback ){
    "use strict";
    var sid = new AbjectId( slideId );
    slideshows.remove( {"_id": sid }, function( err, data ){
            if( err ){ env.log.error( 'Error: can not remove on DB: ', err );}
            callback( data );
        }
    );
};

exports.update = function( source, callback ){
    "use strict";
    var sid = new AbjectId( source.id );
    slideshows.findOne( {"_id": sid }, function( err, target ){
        target.title = source.title;
        target.mdContents = source.mdContents;
        target.modifiedDate = new Date();
        slideshows.update( {"_id": sid }, target, function( err, result ){
            callback( result );
        } );

    } );

};