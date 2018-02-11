<!DOCTYPE html>
<html>
	<head>
		<title> Scripture Resources</title>
	</head>
	<body>
		<h1>Scripture Resources</h1>
		<?php
/*
// default Heroku Postgres configuration URL
$dbUrl = getenv('DATABASE_URL');

if (empty($dbUrl)) {
 // example localhost configuration URL with postgres username and a database called cs313db
 $dbUrl = "postgres://postgres:password@localhost:5432/notes";
}

$dbopts = parse_url($dbUrl);

print "<p>$dbUrl</p>\n\n";

$dbHost = $dbopts["host"];
$dbPort = $dbopts["port"];
$dbUser = $dbopts["user"];
$dbPassword = $dbopts["pass"];
$dbName = ltrim($dbopts["path"],'/');

print "<p>pgsql:host=$dbHost;port=$dbPort;dbname=$dbName</p>\n\n";

try {
 $db = new PDO("pgsql:host=$dbHost;port=$dbPort;dbname=$dbName", $dbUser, $dbPassword);
	echo "works" . $dbopts["path"];
}
catch (PDOException $ex) {
 print "<p>error: $ex->getMessage() </p>\n\n";
 die();
}



/*
foreach ($db->query('SELECT now()') as $row)
{
 print "<p>$row[0]</p>\n\n";
}
*/


			try
			{
				$user = 'postgres';
				$password = 'SkyGate4567!';
				$db = new PDO('pgsql:host=127.0.0.1;dbname=scriptures', $user, $password);
				echo 'Connection Established...1';
				echo '<br/><br/>';
			}
			catch (PDOException $ex)
			{
				echo 'Error!: ' . $ex->getMessage();
				die();
			}
			
foreach ($db->query('SELECT book, chapter, verse, content FROM scriptures') as $row)
{
  echo  "<b>" . $row['book'] ." ". $row['chapter'] .":". $row['verse'] ."</b> - ". $row['content'] ;



  echo '<br/>';
}


		?>
	</body>
</html>