const express = require("express");
const util = require('util');

const app = express();
var cookieParser = require('cookie-parser');
const PORT = 8080; // default port 8080
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());


function generateRandomString() {
  length = 6; // returns a string of 6 random alphanumeric characters
  var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}
// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
  res.render('pages/index');
});

// about page
app.get('/about', function(req, res) {
  res.render('pages/about');
});

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

app.get("/urls.json", (req, res) => {
    res.json(urlDatabase);
});

app.get("/set", (req, res) => {
  const a = 1;
  res.send(`a = ${a}`);
 });
 
app.get("/fetch", (req, res) => {
  res.send(`a = ${a}`);
 });

app.get("/urls", (req, res) => {
   console.log("coockies.username", req.cookies["username"]);
  const templateVars = { urls: urlDatabase, username: req.cookies["username"]};
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {

  const templateVars = {
    username: req.cookies["username"],
    // ... any other vars
  };
    res.render("urls_new", templateVars);
});

app.get("/urls/:shortURL", (req, res) => {
  const templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL],username: req.cookies["username"]};
  res.render("urls_show", templateVars);
});

app.get("/u/:shortURL", (req, res) => {
  const longURL = urlDatabase[req.params.shortURL]
  res.redirect(longURL);
});

app.post("/urls", (req, res) => {
  console.log(req.body);  // Log the POST request body to the console
  res.send("Ok");         // Respond with 'Ok' (we will replace this)
});

app.post("/urls/:shortURL/delete", (req, res) => {
  console.log(req.body);  // Log the POST request body to the console
  console.log("welcome");
  delete urlDatabase[req.params.shortURL]
  res.redirect("/urls");
});

app.post("/urls/:shortURL/update", (req, res) => {
  console.log(req.body);  // Log the POST request body to the console
  console.log("welcome");
  console.log(req.params);
  urlDatabase[req.params.shortURL] = req.body.longURL;
  res.redirect("/urls");
});

app.get("/login", (req, res) => {
  // console.log(util.inspect(req.headers.cookie, {showHidden: false, depth: 1}));
 // const mycook = req.cookies['username'];
});

app.post("/logout", (req, res) => {
  res.clearCookie("username");
  res.redirect("/urls");
});

/*app.get("/logout", (req, res) => {

  // console.log(util.inspect(req.headers.cookie, {showHidden: false, depth: 1}));
 // const mycook = req.cookies['username'];
});
///app.get("/register", (req, res) => {});
}*/

app.post("/login", (req, res) => {
  
//console.log(req,res)
  res.cookie("username", req.body.username);
  
  const templateVars = {
    username: req.cookies["username"],
    // ... any other vars
  };
  
  res.render("/urls", templateVars);
  res.redirect("/urls");
  


  //console.log("----" + req.headers.cookie["username"]);
  //console.log(util.inspect(req.headers.cookie, {showHidden: false, depth: 1}))

  //console.log("----" + req.cookie["username"]);
  //console.log(req.cookies["username"]);
  //templateVars["username"] =  req.cookies["username"];
  /*const usernameCookies = req.cookies.username;
  //res.cookie({username: req.body.username});
  console.log(usernameCookies);*/
  //console.log("login");
  //console.log(req.params);
  
  //res.redirect("/urls");

});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});