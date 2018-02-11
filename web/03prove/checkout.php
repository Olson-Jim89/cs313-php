<!DOCTYPE html>
<html>
	<head>
		<title>03 Prove : Shopping cart</title>
		<link rel="stylesheet" type="text/css" href="stylesheet.css"/> 

	</head>
	<body>
		<header>
			<h1 id="logo">Dragon Battles Store</h1>
			<div class="cartItemsNum"><a class="linkwhite" href="viewcart.php">View Cart </a>0</div>
		</header>
		<div class="content">
				<div class="SideBlock">
					<h3 class="subHeading">Is everything</h3>
					<h3 class="subHeading">In order?</h3>
					<a href="browsestore.php">Go back</a>
				</div>
				<form action="checkout.php" method="post">
					<div class="ShoppingItems">
					<h1>Check out</h1>
					<ul>
					<?php
						foreach ($CartItems as $CartItem)
						{
							$CartItem_clean = htmlspecialchars($CartItem);
							echo "<li><p>$CartItem_clean <input type=\"Checkbox\" value=\"shoppingCart[]\" checked></p></li>";
						}
					?>
					</ul>
						<input type="button" value="Check Out"/>
					</div>
				</form>
				</div>
			</form>
		</div>
	</body>
</html>