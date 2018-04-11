const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var router = express.Router()
var session = require('express-session')
var { Client } = require('pg');
var conString = process.env.DATABASE_URL || 'postgresql://postgres:SkyGate4567!@localhost:5432/mydb';

const client = new Client(conString);
client.connect();
const app = express()


  app.use(express.static(path.join(__dirname, 'public')))
  app.set('views', path.join(__dirname, 'views'))
  app.set('view engine', 'ejs')
  app.get('/', (req, res) => res.render('pages/index'))
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

// This shows how to use a middleware function for all requests (it is defined below)
// Becuse it comes after the static function call, we won't see it log requests
// for the static pages, only the ones that continue on passed that (e.g., /logout)
app.use(logRequest);

// Setup our routes
app.post('/login', handleLogin);
app.post('/logout', handleLogout);

app.post('/getportal', getportal);
app.post('/getlinks', getlinks);

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
  client.query('SELECT * FROM users WHERE email = $1 AND userpass = $2 ', [request.body.username, request.body.password], function(err, result) {
    if (err) {
      return console.error('error running query', err);
    }
    console.log(result.rowCount);
    if(result.rowCount == 1) {
      result = {success: true};
      request.session.user = request.body.email;
      
			console.log(result);
			response.json(result);
      //response.send(result);
      //response.redirect(301, 'pages/webportal');
      //console.log(response);
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

function getportal(request, response, next){
	console.log("connected to database");
	client.query('SELECT * FROM categories where portal_id = 1', function(err, result) {
	  // done();
	  if (err) {
		return console.error('error running query', err);
		
	  }
	  
	 // res.send(result);
	  request.session.categories;

      response.json(result);

	  //for loop all the categories
	  console.log(result);
	 // console.log(response);
	  next();
	});
}

function getlinks(request, response, next){
	console.log("connected to database");
	client.query('SELECT * FROM links where cate_id = 1', function(err, result) {
	  // done();
	  if (err) {
		return console.error('error running query', err);
		
	  }
	 // res.send(result);
	  request.session.categories;

      response.json(result);

	  //for loop all the categories
	  console.log(result);
	 // console.log(response);
	  next();
	});
}

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