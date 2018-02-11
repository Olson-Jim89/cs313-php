<!DOCTYPE html>
<html>
	<head>
		<title> Web Portal</title>
		<style>
			ul {
				display: inline-block;
				margin-left: 40px;
				list-style-type: none;
			} 
			li{
				
			}
		</style>
	</head>
	<body>
		<h1>Protal</h1>
		<?php
			// default Heroku Postgres configuration URL
			$dbUrl = getenv('DATABASE_URL');

			if (empty($dbUrl)) {
				// example localhost configuration URL with postgres username and a database called cs313db
				$dbUrl = "postgresql://postgres:SkyGate4567!@localhost:5432/mydb";
			}

			$dbopts = parse_url($dbUrl);

			//print "<p>$dbUrl</p>\n\n";

			$dbHost = $dbopts["host"];
			$dbPort = $dbopts["port"];
			$dbUser = $dbopts["user"];
			$dbPassword = $dbopts["pass"];
			$dbName = ltrim($dbopts["path"],'/');

			//print "<p>pgsql:host=$dbHost;port=$dbPort;dbname=$dbName</p>\n\n";

			try {
				$db = new PDO("pgsql:host=$dbHost;port=$dbPort;dbname=$dbName", $dbUser, $dbPassword);
			}
			catch (PDOException $ex) {
				print "<p>error: $ex->getMessage() </p>\n\n";
				die();
			}
			
			echo "test1";
			foreach ($db->query('SELECT category_id, name FROM categories') as $col){
				$num = "1";
				$sql = "SELECT name, url FROM links WHERE category_id=" . $col['category_id'];
				//echo $sql;
				echo "<ul>"; 
				
				echo "<li><h3> " . $col['name'] . "<h3></li>";
				
				foreach ($db->query($sql) as $row)
				{
					echo  " <li> <a href=" . $row['url'] . ">" . $row['name'] . "</a> </li>";
				}
				
				echo "</ul>";
				
			}
			
		?>
		
	</body>
</html>