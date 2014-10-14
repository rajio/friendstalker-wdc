var map;
function initialize() {
	var dataURL = "http://localhost:3000/model/friends.json"
	var friendsReq = new XMLHttpRequest();
	var mapOptions = {
		center: new google.maps.LatLng(-34.9859652,138.7019549),
		zoom : 10,
		scrollwheel: true
	};
	map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);
	//getting json data
	friendsReq.onreadystatechange = function() {
 		if (friendsReq.readyState==4 && friendsReq.status==200) {
	    	console.log("returned from facebook server request")
		    var jsonData = JSON.parse(friendsReq.responseText);
		    var friends = jsonData.friends;
	    	var index = 0;
		    while (index < friends.length){
	    	var friend = friends[index];
	  	    var marker = new google.maps.Marker({
	            position: new google.maps.LatLng(
	                                     friend.lat,
	                                     friend.lng),
	            title: friend.name,
	            map: map
	        });
	        $("#content-wrapper").append('<div class="friend-box"><img class="friend-box-picture" src="images/1258567324578s.jpg" alt="profile picture"><div class="friend-box-statuses"><ul class="status-list"><li class="text-center">'+friend.name+'</li><li class="text-center">'+friend.lat+'</li><li class="text-center">'+friend.lng+'</li></ul></div><div class="friend-interface"><button type="button" class="btn btn-primary btn-sm my-button-styling">Message!</button><button type="button" class="btn btn-primary btn-sm my-button-styling">Action!</button></div></div>'); 
	      index++;
	    }
	  }
	}
	friendsReq.open("GET",dataURL,true);
	friendsReq.send();
 };

function addUser(){
	var postURL = "http://localhost:3000/addFriend"
	var formElement = document.getElementById("addForm");

	var addReq = new XMLHttpRequest();

	var name = formElement.elements['name'].value
	var lat = formElement.elements['lat'].value
	var lng = formElement.elements['lng'].value

	addReq.onreadystatechange = function(){
		if (friendsReq.readyState==4 && friendsReq.status==200)	{
			console.log("adding new marker");
			var marker = new google.maps.Marker({
				    position: new google.maps.LatLng(lat, lng),
				    title: friend.name,
				    map: map
				}); 
		}
	}
}
//var formData = {"name":name,"lat":lat,"lng":lng};
// addReq.open("POST",postURL,true);
// addReq.setRequestHeader('Content-Type', 'application/json');
// addReq.send(JSON.stringify(formData));

//addDomListener
google.maps.event.addDomListener(window, 'load', initialize);