
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};

exports.show = function( req, res ){
    res.render( 'show', {title: 'show'} );
//    var showId = req.params.showId;
//    res.send('showId:' + showId);
};

exports.shows = function(req, res){
    res.send('shows page');
}