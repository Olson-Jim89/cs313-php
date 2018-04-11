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
	
	$.post("/getportal", function(result) {
		if (result.rowCount >= 1) {
			$("#status").text("portal loaded");	
				
				drawPortal(result,1);
		} else {
			$("#status").text("portal not found");
		}
	});
}

function getlinks(){
	
	$.post("/getportal", function(result) {
		if (result.rowCount >= 1) {
			$("#status").text("portal loaded");	
				
				drawPortal(result,1);
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

function getServerTime() {
	$.get("/getServerTime", function(result) {
		if (result && result.success) {
            $("#status").text("Server time: " + result.time);
			enableEdit();
			
		} else {
			$("#status").text("Got a result back, but it wasn't a success. Your reponse should have had a 401 status code.");
		}
	}).fail(function(result) {
		$("#status").text("Could not get server time.");
	});
}