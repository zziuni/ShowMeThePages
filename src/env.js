/**
 * Created by JetBrains WebStorm.
 * User: luigi.byun(@zziuni)
 * Date: 12. 9. 28.
 * Time: 오후 7:04
 */
var clog = require( 'clog' );
var utillity = require( './utillity' );

clog.configure( {"log level": 5} );

exports.log = clog;
exports.util = utillity;