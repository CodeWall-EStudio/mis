var tmpl = {
	body : require('../../tpl/review/body.ejs'),
	main : require('../../tpl/review/main.ejs'),
	list : require('../../tpl/review/list.ejs')
}

var striker = $(window.striker);

var review = {}
module.exports = review;

striker.bind('review',function(e,d){

});