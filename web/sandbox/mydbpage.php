<!DOCTYPE html>
<html>
	<head>
		<title> Data Base Test</title>
	</head>
	<body>
		<?php
			try
			{
				$user = 'postgres';
				$password = 'SkyGate4567!';
				$db = new PDO('pgsql:host=127.0.0.1;dbname=notes', $user, $password);
			}
			catch (PDOException $ex)
			{
				echo 'Error!: ' . $ex->getMessage();
				die();
			}
		?>
	</body>
</html>