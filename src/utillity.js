/**
 * Created by JetBrains WebStorm.
 * User: luigi.byun(@zziuni)
 * Date: 12. 9. 29.
 * Time: 오전 12:29
 */
var os = require( 'os' );

var Utillity = function(){
    "use strict";
};

var port = process.argv[2] || 3000;

Utillity.prototype.test = function(){
    "use strict";
    console.log( 'test ' );
};

Utillity.prototype.getLocalIps = function(){
    "use strict";
    var ifaces = os.networkInterfaces();
    var local_IPs = [];
    for( var dev in ifaces ){
        if( ifaces.hasOwnProperty( dev ) && dev.indexOf( 'en' ) === 0 ){
            ifaces[ dev ].forEach( function( details ){
                if( details.family === 'IPv4' ){
                    local_IPs.push( details.address );
                }
            } );
        }
    }
    return local_IPs;
};

Utillity.prototype.getPort = function(){
    "use strict";
    return port;
};

module.exports = new Utillity();