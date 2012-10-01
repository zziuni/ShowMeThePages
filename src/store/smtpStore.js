/**
 * Created by JetBrains WebStorm.
 * User: luigi.byun(@zziuni)
 * Date: 12. 9. 29.
 * Time: 오후 6:38
 */
var mongod = require( './data_mongo.js' );

var Store = function(){
    "use strict";
};

Store.prototype.selectAll = function( callback ){
    "use strict";
    mongod.selectAll( callback );
};

Store.prototype.selectOne = function( id, callback ){
    "use strict";
    mongod.select(id, callback );
};

Store.prototype.updateOne = function( body, callback ){
    "use strict";
    mongod.update( body, callback );
};

Store.prototype.insert = function( body, callback){
    "use strict";
    mongod.insert( body, callback );
};

Store.prototype.remote = function( id, callback ){
    "use strict";
    mongod.remove( id, callback );
};

module.exports = new Store();