<!DOCTYPE html>
<html>
	<head>
		<title>03 Prove : Shopping cart</title>
		<link rel="stylesheet" type="text/css" href="stylesheet.css"/> 
	</head>
	<body>
	<form action="shoppingcart.php" method="post">
		<header>
			<h1 id="logo">Dragon Battles Store</h1>
			<div class="cartItemsNum"><input type="submit" value="submit"/><a class="linkwhite" href="viewcart.php">View Cart </a>0</div>
		</header>
		<div class="content">
				<div class="SideBlock">
					<h2 class="subHeading">Collect</h2>
					<h2 class="subHeading">Battle</h2>
					<h2 class="subHeading">Breed</h2>
					<h4>They look cute now but 
						they are killers</h3>
				</div>
			
				<div class="ShoppingItems">
					<div class="SaleItem">
						 <h4 name="item1">Dinosaur 1 $10.00</h4>
						<img alt="Green Dino" src="images\GreenDino.jpg"> 
						<p>This is the best item you should buy it.</p>
						<input type="Checkbox" name="shoppingCart[]" value="Dinosaur 1 $10.00">
						<input type="button" value="Add To Cart" onclick=""/>
					</div>
					<div class="SaleItem">
						<h4 id="item2">Dinosaur 2 $12.00</h4>
						<img alt="Green Dino" src="images\GreenDino.jpg"> 
						<p>This is the best item you should buy it.</p>
						<input type="Checkbox" name="shoppingCart[]" value="Dinosaur 2 $12.00">
						<input type="button" value="Add To Cart"/>
					</div>
					<div class="SaleItem">
						<h4 id="item3">Dinosaur 3 $12.00</h4>
						<img alt="Green Dino" src="images\GreenDino.jpg"> 
						<p>This is the best item you should buy it.</p>
						<input type="Checkbox" name="shoppingCart[]" value="Dinosaur 3 $12.00">
						<input type="button" value="Add To Cart"/>
					</div>
					<div class="SaleItem">
						<h4 id="item4">Dinosaur 4 $15.00</h4>
						<img alt="Green Dino" src="images\GreenDino.jpg"> 
						<p>This is the best item you should buy it.</p>
						<input type="Checkbox" name="shoppingCart[]" value="Dinosaur 4 $15.00">
						<input type="button" value="Add To Cart"/>
					</div>
					<div class="SaleItem">
						<h4 id="item5">Dinosaur 5 $15.00</h4>
						<img alt="Green Dino" src="images\GreenDino.jpg"> 
						<p>This is the best item you should buy it.</p>
						<input type="Checkbox" name="IshoppingCart[]" value="Dinosaur 5 $15.00">
						<input type="button" value="Add To Cart"/>
					</div>
					<div class="SaleItem">
						<h4 id="item6">Dinosaur 6 $20.00</h4>
						<img alt="Green Dino" src="images\GreenDino.jpg"> 
						<p>This is the best item you should buy it.</p>
						<input type="Checkbox" name="shoppingCart[]" value="Dinosaur 6 $20.00">
						<input type="button" value="Add To Cart"/>
					</div>
				</div>
		</div>
	</form>
	</body>
</html>