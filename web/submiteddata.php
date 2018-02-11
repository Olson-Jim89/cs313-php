<?php

	$name = htmlspecialchars($_POST["name"]);
	$email = htmlspecialchars($_POST["email"]);
	$major = htmlspecialchars($_POST["major"]);
	$places = $_POST["places"];
	$comments = htmlspecialchars($_POST["comments"]);

?>
<!DOCTYPE html>
<html>
	<head>
		<title>03 Teach : Team Activity</title>
	</head>
	<body>
		<header>
			<h1>Submitted Data</h1>
		</header>
		<div class="content">
		<p>Name: <?=$name ?></p>
		<p>Email: <a href="mailto:<?=email?>"><?=$email ?></a>"</p>
		<p>Major: <?=$major ?></p>
		<p>places visited: </p>
		<ul>
			<?=
				foreach ($places as $place)
				{
					$place_clean = htmlspecialchars($place);
					echo "<li><p>$place</p></li>";
				}
			?>
		</ul>
		
		<p>Comments: <?=$comments ?></p>

		</div>
	</body>
</html>