  window.fbAsyncInit = function() {
    FB.init({
      appId      : '698526993563552',
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
    FB.getLoginStatus(function(response){
      console.log(JSON.stringify(response));
        if(response.status == "connected"){
            //send access token to server
            authToServer(response,
              function(){
                //after logged in
                //get friends data and add to map
                addFriendToMap();
              });
        }
    });
  }