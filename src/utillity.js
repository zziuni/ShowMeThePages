/**
 * Created by JetBrains WebStorm.
 * User: luigi.byun(@zziuni)
 * Date: 12. 9. 29.
 * Time: 오전 12:29
 */
var os = require( 'os' );
var fm = require( 'github-flavored-markdown' );
var surl = require( 'shorturl' );

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

Utillity.prototype.getMybeLocalHost = function( host ){
    "use strict";
    if( !host ){return false;}
    if( host.indexOf( 'localhost' ) === 0 ){
        var localIps = this.getLocalIps();
        host = localIps[0] + ':' + this.getPort();
    }
    return host;
};

Utillity.prototype.getShortUrl = function( url, callback ){
    "use strict";
    surl( url, callback );
};

var convertToHtmlFromMarkdown = function( markdown ){
    "use strict";
    return fm.parse( markdown );
};

Utillity.prototype.makeHtmlFromMarkdown = function( markdown ){
    "use strict";
    if( !markdown ){ return false; }
    var html = convertToHtmlFromMarkdown( markdown );
    html = html.replace( /<hr \/>/gi, "</section>\n<section>" );
    html = "<Section>" + html + "</Section>";
    return html;
};

module.exports = new Utillity();