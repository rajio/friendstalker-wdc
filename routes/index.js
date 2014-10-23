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
			req.session.accessToken = response.access_token;
			req.session.expires = response.expires ? res.expires : 0;
			res.send(200);
		});
});
/* functions like this return 3 things:  A layout A View and a json object
that is the Second parameter of the. render function.*/ 
router.get('/test', function(req, res) {
	res.render('test', {sometext: 'This text  has been inserted as a JsoN object from index.js' });
});

router.get('/',function(req,res){
	res.render(index.handlebars)
});

/* GET home page. */
router.get('/index', function(req, res) {
	res.render('index');
});
router.get("/fish",function(req,res){
	res.send("hello")
});

/*fubction to return json data*/ 
// router.get("/model/friends.json",function(req,res){
// 	data.getData(function(jsonData){
// 		res.send(jsonData);
// 	});
// });

router.get("/model/friends.json",function(req,res){
	//send a fb request for the friends edge of the current user node 
	//using th3e long term access token associated with this user
	var accessToken = req.session.accessToken;
	if(!accessToken){
		console.log('access token not available');
		res.send(404);
	}else{
		FB.api("/me/friends",{access_token:accessToken},
			function(response){
				if (response && !response.error){
					console.log('received:'+JSON.stringify(response.data));
					//for each friend in the response add the location data
					processFriends(response.data,accessToken,function(locationData){
						console.log('finished processing friends'+JSON.stringify(locationData));
						res.send(JSON.stringify(locationData));
					});
				}else{
					console.log(response.error);
					res.send(500);
				}
			})
	}
});

function processFriends(friends,accessToken,callback){
	console.log('processing friends '+ friends);
	var friendCount = friends.length;
	var friendsProcessed = 0;
	var locationData = {friends: []} 
	var friendIndex = 0;
	console.log("debug: variables created sucessfully!")
	while(friendIndex<friendCount){
		var friend = friends[friendIndex];
		console.log("debug: "+friend+"is being processed, from processFriends()")
    //get friends location and add to the location data
    console.log("debug: calling the getFriendsLocation() function now!")
    getFriendLocations(friend,accessToken,function(name,locations){
      //get friends will call this back callback with name of friend and 
      //location
      //add code to add these places to the locationData object here
      var placeIndex = 0;
      var placeCount = locations.length;
      while(placeIndex<placeCount){
      	place = locations[placeIndex].place.location;
      	console.log('adding place'+JSON.stringify(place));
      	var markerInfo = {
      		name:name,
      		lat:place.latitude,
      		lng:place.longitude
      	};
      	locationData.friends.push(markerInfo);
      	placeIndex++;
      }
      friendsProcessed++;
      //if we've processed all the fri3ends return the location data 
      if (friendsProcessed == friendCount){
      	callback(locationData);
      }
      // friendIndex++;
  })
friendIndex++;}
}

function getFriendLocations(friend, accessToken, callback){
	console.log('getting information for '+ friend.name);
	FB.api("/" + friend.id + "/tagged_places",
		{access_token:accessToken},
		function(placesResponse){
			if (placesResponse && !placesResponse.error){
				console.log(placesResponse.data);
				callback(friend.name,placesResponse.data);
			}else{
				console.log("error");
				res.send(500);
			}
		}
		)
};


module.exports = router;
/*tehshhzst*/