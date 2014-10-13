	function validate(){
		var username_check,password_check, val_user, val_pass
		username_check = document.getElementById("username_input")
		password_check = document.getElementById("password_input")
		val_user = username_check.value
		val_pass = password_check.value
		
		document.getElementById("login_message").innerHTML = ""

		if (val_user === "" || val_pass === "")
			document.getElementById("login_message").innerHTML = "No user/pass detected"
		else
			document.getElementById("login_message").innerHTML = "Login success!"
}
function contenthider(){
	$("#content-wrapper").toggle("slide");	
	console.log("contenthider called");
};

function maphider(){
	console.log("maphider called");
	$("#map-canvas").toggle("slide");
}