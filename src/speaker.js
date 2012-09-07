/**
 * Created by JetBrains WebStorm.
 * User: luigi.byun(@zziuni)
 * Date: 12. 9. 5.
 * Time: 오후 11:11
 */
var clog = require( 'clog' );
clog.configure( {'log level': 5} );

exports.setListener = function( io, callbackForAudience ){
    "use strict";

    io.of( '/speaker' ).on( 'connection', function( speaker ){
        clog.debug( '=> A speaker connected..' );

        speaker.on( 'disconnect', function(){
            clog.debug( '=> A speaker disconnect.' );
        } );

        speaker.on( 'good slide', function( data ){
            clog.debug( 'speaker is trigger ' );
            speaker.volatile.emit( 'create ball', {} );
        } );

        callbackForAudience(io, speaker );
    } );
};