// [LOAD PACKAGES]
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const urlencodedParser = bodyParser.urlencoded({extended: true});
const ejs = require("ejs").renderFile;
const mysql = require("mysql");

// [CONFIGURE APP VIEW ENGINE]
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', ejs)

// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// [CONFIGURE APP TO USE static path]
app.use(express.static('public'));

// [CONNECT MYSQL]
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'thddnjs12!',
  database : 'bookdatabase'
});

/* throw an error if sql connect fails. it should fail a couple times in docker 
 before successfully connecting. the container takes longer to boot up, essentially.
 */
connection.connect(function(err){
	if(err){
		console.error("error connecting: " + err.stack);
		return process.exit(22); //consistently exit so the Docker container will restart until it connects to the sql db
	}
	console.log("connected as id " + connection.threadId);
});

// var connection = mysql.createConnection({
//     host            : process.env.DATABASE_HOST,
//     port            : process.env.MYSQL_PORT,
//     user            : process.env.MYSQL_USER,
//     password        : process.env.MYSQL_PASSWORD,
//     database        : process.env.MYSQL_DATABASE
// });


// [CONFIGURE SERVER PORT]
let port = process.env.PORT || 8080;

// [RUN SERVER]
const server = app.listen(port, function(){
	console.log("Express server has started on port " + port)
});
 
// [ADD ROUTER]
const router = require('./routes')(app, connection)