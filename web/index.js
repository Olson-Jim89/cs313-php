const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var router = express.Router()
var session = require('express-session')
var { Client } = require('pg');


var conString = process.env.DATABASE_URL || 'postgresql://postgres:SkyGate4567!@localhost:5432/mydb';

var y = "test";

const client = new Client(conString);
client.connect();
const app = express()


  app.use(express.static(path.join(__dirname, 'public')))
  app.set('views', path.join(__dirname, 'views'))
  app.set('view engine', 'ejs')
  app.get('/', (req, res) => res.render('pages/index', {result: y}))
  app.get('/', (req, res) => res.render('public/scripts/login'))
  app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

  console.log(conString);
  // We are going to use sessions
//var parseurl = require('parseurl')
var session = require('express-session')

// set up sessions
app.use(session({
  secret: 'my-super-secret-secret!',
  resave: false,
  saveUninitialized: true
}))

// Because we will be using post values, we need to include the body parser module
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


var portalID = "";

var content ="";

// This shows how to use a middleware function for all requests (it is defined below)
// Becuse it comes after the static function call, we won't see it log requests
// for the static pages, only the ones that continue on passed that (e.g., /logout)
app.use(logRequest);

// Setup our routes
app.post('/login', handleLogin);
app.post('/logout', handleLogout);

app.post('/getportal', loadPortal);
//app.post('/getlinks', getlinks);

// This method has a middleware function "verifyLogin" that will be called first
app.get('/getServerTime', verifyLogin, getServerTime);


/****************************************************************
 * These methods should likely be moved into a different module
 * But they are hear for ease in looking at the code
 ****************************************************************/

// Checks if the username and password match a hardcoded set
// If they do, put the username on the session
function handleLogin(request, response) {
  var result = {success: false};
  
  console.log(request.body.username, request.body.password);
  client.query('SELECT * FROM users WHERE username = $1 AND password = $2 ', [request.body.username, request.body.password], function(err, results) {
    if (err) {
      return console.error('error running query', err);
    }

    if(results.rowCount == 1) {
			portalID = results.rows[0].user_id;
			result = {success: true};
      request.session.user = request.body.username;
			response.json(result);

    } else {
      console.log('else');
    }
    
  });
/*	var result = {success: false};

	// We should do better error checking here to make sure the parameters are present
	if (request.body.username == "a" && request.body.password == "1") {
		request.session.user = request.body.username;
		result = {success: true};
	}

	response.json(result);*/
}

// If a user is currently stored on the session, removes it
function handleLogout(request, response) {
	var result = {success: false};

	// We should do better error checking here to make sure the parameters are present
	if (request.session.user) {
		request.session.destroy();
		result = {success: true};
	}

	response.json(result);
}

// This function returns the current server time
function getServerTime(request, response) {
	var time = new Date();
	
	var result = {success: true, time: time};
	response.json(result); 
}

// This is a middleware function that we can use with any request
// to make sure the user is logged in.
function verifyLogin(request, response, next) {
	if (request.session.user) {
		// They are logged in!

		// pass things along to the next function
		next();
	} else {
		// They are not logged in
		// Send back an unauthorized status
		var result = {succes:false, message: "Access Denied"};
		response.status(401).json(result);
	}
}

// This middleware function simply logs the current request to the server
function logRequest(request, response, next) {
	console.log("Received a request for: " + request.url);

	// don't forget to call next() to allow the next parts of the pipeline to function
	next();
}

//Categories
//get all categories

function loadPortal(request, response, x){
	//client.query('SELECT * FROM categories LEFT JOIN links ON categories.category_id=links.category_id WHERE portal_id=1 ORDER BY link_id' , function(err, result) {
	client.query('SELECT * FROM categories where portal_id =' + portalID, function(err, categories) {
	  if (err) 
			return console.error('error running query', err);

		//request.session.categoryID = categories.rows[0].category_id;
		var categoryID = null;
		var i, j = "";
		for (i in categories.rows){
			x +="<ul class='cat'> <li><h3 id=" + categories.rows[i].category_id + " > " + categories.rows[i].cat_name + "</h3><div class='editTools'><button name='colDelete'onclick='deleteCat(" + categories.rows[i].category_id +")'>Delete</button><button onClick='catUpdateModeOn(" + categories.rows[i].category_id +")'>Edit</button></div></li>";
			categoryID = categories.rows[i].category_id;
	
			client.query('SELECT * FROM links where category_id =' + categoryID, function(err, links) {
				if (err) 
					return console.error('error running query', err);	
				
					if (links.rowCount >= 1) {
						//	var test=JSON.stringify(links);
						//	console.log("portal: " + test);	
							 for(j in links.rows){
									x += "<li> <a href=" + links.rows[j].link_url + " target='_blank'>" + links.rows[j].link_name + "</a></h3><div class='editTools'><form action='webportal.php' method='post'><button name='linkDelete' onclick='deleteLink("+ links.rows[j].link_id +")'>Delete</button></form> <button onClick='linkUpdateModeOn("+ links.rows[j].link_id +")'>Edit</button></div></li>";
							 }
					}   	
				});
	
			x += "<li><div class='editTools' ><img class='editTools' src='images/add.png' alt='+' onClick='openLinkEditWin("+ categories.rows[i].category_id +");'>Click Here To Add a Link</div></li></ul>";
			
			}
			console.log(x);		
			response.render('pages/index', {result: x});
		
		//var req = JSON.stringify(request.body);
	  //for loop all the categories
	 	// console.log(response);
		// console.log('request.body:' + req);
	});


	}
	//Insert data to db
router.post('/categories', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    client.query('INSERT INTO categories(cat_name) VALUES($1) returning id', [req.body.cat_name], function(err, result) {
      done();
      if(err) {
        return console.error('error running query', err);
      }
      res.send(result);
    });
  });
});

// update record
router.put('/categories/:id', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    //compare with .compareSync(req.body.data.attributes.password, storedPW)
    client.query('UPDATE categories SET cat_name = $2  WHERE id = $1', [req.params.id, req.body.cat_name], function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
      res.send(result);
    });
  });
});

//delete one record
router.delete('/categories/:id', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
     console.log(conString)
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    client.query('DELETE FROM categories WHERE id = $1',[req.params.id], function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
      res.send(result);
    });
  });
});

//Links
//get all links for category
router.get('/links:category_id', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    client.query('SELECT * FROM links WHERE category_id = $1',[req.params.category_id], function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
      res.send(result);
    });
  });
});

//Insert data to db
router.post('/links', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    client.query('INSERT INTO links(link_name, link_url) VALUES($1, $2) returning id', [req.body.link_name, req.body.link_url], function(err, result) {
      done();
      if(err) {
        return console.error('error running query', err);
      }
      res.send(result);
    });
  });
});

// update record
router.put('/links/:id', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    //compare with .compareSync(req.body.data.attributes.password, storedPW)
    client.query('UPDATE links SET link_name = $2, link_url = $3  WHERE id = $1', [req.params.id, req.body.link_name, req.body.link_url], function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
      res.send(result);
    });
  });
});

//delete one record
router.delete('/links/:id', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
     console.log(conString)
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    client.query('DELETE FROM links WHERE id = $1',[req.params.id], function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
      res.send(result);
    });
  });
});



/*

function getlinks(request, response, next){
	console.log("connected to database");
	client.query('SELECT * FROM links where category_id = 1', function(err, result) {
	  // done();
	  if (err) {
		return console.error('error running query', err);
		
	  }
	 // res.send(result);
	  request.session.categories;

    response.json(result);

		//for loop all the categories
		var test=JSON.stringify(result);		

	  console.log("links:" + test);
	 // console.log(response);
	  next();
	});
}
*/
/*
app.post('/getportal', function(request, result) {
	
	  console.log("connected to database");
	  client.query('SELECT * FROM categories where portal_id = 1', function(err, result) {
		// done();
		if (err) {
		  return console.error('error running query', err);
		  
		}
	   // res.send(result);
		req.session.categories

		//for loop all the categories
		console.log(result);
	  });
	});
	*/