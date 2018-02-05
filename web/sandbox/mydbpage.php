<!DOCTYPE html>
<html>
	<head>
		<title> Data Base Test</title>
	</head>
	<body>
		<h1>test</h1>
		<?php
			try
			{
				$user = 'postgres';
				$password = 'SkyGate4567!';
				$db = new PDO('pgsql:host=127.0.0.1;dbname=notes', $user, $password);
				echo 'Connection Established...';
				echo '<br/>';
			}
			catch (PDOException $ex)
			{
				echo 'Error!: ' . $ex->getMessage();
				die();
			}
			
foreach ($db->query('SELECT username, password FROM note_user') as $row)
{
  echo 'user: ' . $row['username'];
  echo ' password: ' . $row['password'];
  echo '<br/>';
}


$statement = $db->query('SELECT username, password FROM note_user');
while ($row = $statement->fetch(PDO::FETCH_ASSOC))
{
  echo 'user: ' . $row['username'] . ' password: ' . $row['password'] . '<br/>';
}

$statement = $db->query('SELECT username, password FROM note_user');
$results = $statement->fetchAll(PDO::FETCH_ASSOC);

		?>
	</body>
</html>