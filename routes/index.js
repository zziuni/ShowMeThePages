
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};

exports.show = function( req, res ){
//    res.render( 'show', {title: 'show'} );
    res.send('showId:' + req.params.showId);
}