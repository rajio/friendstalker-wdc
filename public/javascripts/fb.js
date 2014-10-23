  window.fbAsyncInit = function() {
    FB.init({
      appId      : '1479563595657728',
      xfbml      : true,
      version    : 'v2.1'
    });
  };

  (function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));


function checkLoginState(){
  FB.getLoginStatus(function(response) {
    console.log(JSON.stringify(response));
  if (response.status === 'connected') {
    // remove facebook button
    var loginButton = document.getElementById("fbButton");
    loginButton.parentNode.removeChild(loginButton);

    //Send access token to server
    authToServer(response,function(){
      addFriendsToMap();
    });
  } else if (response.status === 'not_authorized') {
    // the user is logged in to Facebook, 
    // but has not authenticated your app
    console.log("App not authorised");
       FB.login(function(response){
         //recheck login state
         checkLoginState();
       },{scope: "user_friends"});
  } else {
    // the user isn't logged in to Facebook.
    console.log("Not logged in");
         FB.login(function(response){
         //recheck login state
         checkLoginState();
         },
         {scope: "user_friends"});
  }
 });
}

  function authToServer(auth, callback){
    var authReq = new XMLHttpRequest();

    authReq.onreadystatechange = function(){
      if (authReq.readyState==4 && authReq.status==200){
        console.log("logged in to server");
        callback();
      } 
    }
    authReq.open("POST", "http://localhost:3000/auth", true);
    authReq.setRequestHeader('Content-Type','application/json');
    authReq.send(JSON.stringify(auth));
  }

function addFriendsToMap(){
  var dataURL = "http://localhost:3000/model/friends.json";
  var friendsReq = new XMLHttpRequest();
 
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
friendsReq.open("GET",dataURL,true)
friendsReq.send();
}
//early logout function
function fbLogout(){
  FB.logout(function(response) {
    // user is now logged out
    console.log('user logged out')
  });
};








