var marker = new google.maps.Marker({,
	position: new google.maps.LatLng(-34.9290, 138.6010),
	title: "Adelaide!",
	map: map
 });

var dataURL = "http://localhost:3000/model/friends.json";
var friendsReq = new XMLHttpRequest();

friendsReq.onreadystatechange = function() {
	if (friendsReq.readyState==4 && friendsReq.status==200) {
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

		}
	}
}