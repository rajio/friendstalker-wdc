var express = require('express');
var router = express.Router();
var config = require('../config')
var FB = require('fb');
var data = require('./data')

router.post('/auth',function(req,res){
	console.log('received short-lived token');
	//verify app id
	//exchange for long access token
	FB.api('oauth/access_token',
		{grant_type:'fb_exchange_token',
		client_id: config.facebook.appId,
		client_secret: config.facebook.appSecret,
		fb_exchange_token: req.body.authResponse.accessToken},
		function(response){
			if(!response || response.error){
				console.log(!response ? "error occurred":response.error);
				return;
			}
			console.log('long term token obtained');
		})
})
/* functions like this return 3 things:  A layout A View and a json object
 that is the Second parameter of the. render function.*/ 
router.get('/test', function(req, res) {
	res.render('test', {sometext: 'This text  has been inserted as a JsoN object from index.js' });
});

router.get('/',function(req,res){
	res.render(index.handlebars)
})

/* GET home page. */
router.get('/index', function(req, res) {
  res.render('index');
});
router.get("/fish",function(req,res){
	res.send("hello")
});

/*fubction to return json data*/ 
router.get("/model/friends.json",function(req,res){
	data.getData(function(jsonData){
		res.send(jsonData);
	});
});

module.exports = router;
/*tehshhzst*/