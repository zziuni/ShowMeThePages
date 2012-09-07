/**
 * Created by JetBrains WebStorm.
 * User: luigi.byun(@zziuni)
 * Date: 12. 9. 7.
 * Time: 오후 6:57
 */
var env = require('../env');
var speaker = require('../../src/speaker');

module.exports = {
    setUp: function( callback ){
        "use strict";
        var app = env.express.createServer();
        this.io = env.sio.listen( app );
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