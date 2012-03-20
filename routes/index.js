
/*
 * GET home page.
 */
var jqtpl = require('jqtpl');

exports.index = function(req, res){
    res.render('index', { title: 'Express' })
};

exports.show = function( req, res ){
    res.render( 'show', {title: 'show page', name: 'this name'} );
};

exports.shows = function(req, res){
//    res.send('shows page', {title: 'show Page'});
    res.render( 'show.html', {title: 'show'} );
}

exports.getShow = function(req, res){
    var tpl = '<div>${name}</div>';
    jqtpl.template('getShow', tpl);
    var result = jqtpl.tmpl('getShow', {name: 12333333});
    res.send(result);

}