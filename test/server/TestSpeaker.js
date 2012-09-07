/**
 * Created by JetBrains WebStorm.
 * User: luigi.byun(@zziuni)
 * Date: 12. 9. 7.
 * Time: 오후 6:57
 */
var express = require('express');
var sio = require('socket.io');
var clog = require('clog');
var speaker = require('../../src/speaker');

module.exports = {
    setUp: function( callback ){
        "use strict";
        var app = express.createServer();
        var io = sio.listen( app );
        this.io = io;
        callback();
    },

    "setListener": function( t ){
        "use strict";
        t.expect( 1 );
        var io = this.io;
        t.doesNotThrow( function( ){
            speaker.setListener( io, function(){});
        }, Error, '#exception setListener');
        t.done();
    }
};