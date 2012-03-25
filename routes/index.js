
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
};

exports.getShow = function(req, res){
    var tpl = '<div>${name}</div>';
    jqtpl.template('getShow', tpl);
    var result = jqtpl.tmpl('getShow', {name: 12333333});
    res.send(result);

};

exports.testting = function(req, res){
    res.render('test',
        {
            test01:'1test',
            test02: function(){
                return 1 + 3;
            },
            test03: 'notest',
            test04: ['a', 'b', 'c', 'd'],
            test05: '<div id="test">test</div>',
            test06: {name: 'name', url: 'google.com'}
        }

    );
};
