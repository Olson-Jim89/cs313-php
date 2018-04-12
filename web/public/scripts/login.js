function login() {
	var username = $("#username").val();
	var password = $("#password").val();

	var params = {
		username: username,
		password: password
	};

	$.post("/login", params, function(result) {
		if (result && result.success) {
			$("#status").text("Successfully logged in.");
			
			getportal();
		} else {
			$("#status").text("Error logging in.");
		}
	});
}

function getportal(){
	$.post("/getportal", function(categories) {
		console.log(categories);
		if (categories) {
			$("#status").text("portal loaded");	
			$("#content").text(categories);	
		} else {
			$("#status").text("portal not found");
		}
	});
}



function logout() {
	$.post("/logout", function(result) {
		if (result && result.success) {
			$("#status").text("Successfully logged out.");
		} else {
			$("#status").text("Error logging out.");
		}
	});
}

function editmode() {
	$.get("/getServerTime", function(result) {
		if (result && result.success) {
            $("#status").text("Edit mode");
			enableEdit();
			
		} else {
			$("#status").text("Got a result back, but it wasn't a success. Your reponse should have had a 401 status code.");
		}
	});
}