<!DOCTYPE html>
<html>
	<head>
		<title>03 Teach : Team Activity</title>
		<link rel="stylesheet" type="text/css" href="stylesheet.css"/> 
	</head>
	<body>
		<header>
			<h1>HTML FORM</h1>
		</header>
		<div class="content">
			<form action="submiteddata.php" target="_blank" method="post">
				Name:<br>
				<input type="text" name="name" style="width:340px; height:40px; font-size:20pt;"/><br>
				Email:<br>
				<input type="text" name="email"/><br>
				<br>Major:<br>
					<input type="radio" name="major" value="Computer Science">Computer Science<br>
					<input type="radio" name="major" value="Web Design and Development">Web Design and Development<br>
					<input type="radio" name="major" value="Computer information Technology">Computer information Technology<br>
					<input type="radio" name="major" value="Computer Engineering">Computer Engineering<br>
				<br>Which continents have you visited.<br>
					<input type="checkbox" name="places[]" value="North America">North America<br>
					<input type="checkbox" name="places[]" value="South America">South America<br>
					<input type="checkbox" name="places[]" value="Europe">Europe<br>
					<input type="checkbox" name="places[]" value="Asia">Asia<br>
					<input type="checkbox" name="places[]" value="Australia">Australia<br>
					<input type="checkbox" name="places[]" value="Africa">Africa<br>
					<input type="checkbox" name="places[]" value="Antarctica">Antarctica<br>
				<br>Comments:<br>
				<textarea name="comments" rows="7" cols="30"></textarea><br><br>
				<input type="submit" text="submit"/>
				
			</form>
		</div>
	</body>
</html>