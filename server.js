// Contact Form
// Alex Munoz
// GitHub.com/AlexMunoz905/Alex-Munoz.Net
const express = require('express');
const fs = require('fs');
const https = require('https');
const http = require('http');
const bodyParser = require('body-parser');
const publicIP = require('public-ip');
const app = express();
const nodemailer = require('nodemailer');
const zoho = require('./GitIgnore/zohoInformation.js');
var port = 8080;
const zohoUsername = zoho.user;
const zohoPassword = zoho.password;
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/mydb";
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', (request, response) =>  response.sendFile(`${__dirname}/src/index.html`));
app.use(express.static('public'));
app.use(express.static('src'));
app.get('/home', (request, response) =>  response.sendFile(`${__dirname}/src/index.html`));
app.get('/contact', (request, response) =>  response.sendFile(`${__dirname}/src/contact.html`));
app.use(function (req, res, next) {
  res.status(404).sendFile(`${__dirname}/src/index.html`);
});
app.get('/formSubmited', (request, response) =>  response.sendFile(`${__dirname}/src/formSubmited.html`));
var transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: zohoUsername,
        pass: zohoPassword
    }
});

app.post('/api/form', function(req, res) {
  var mailOptions = {
      from: '"Alex-Munoz.Net" <noreply@napend.com>', // sender address (who sends)
      to: 'alex.munoz905@gmail.com', // list of receivers (who receives)
      subject: req.body.subject, // Subject line
      text: 'Alex-Munoz.Net ', // plaintext body
      html: 'From: <b>' + req.body.name + "</b>,<b>" + req.body.email + "</b>.<br><br>" + req.body.message
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
      console.log('Message sent: ' + info.response);
       return res.redirect('/formSubmited');
  });
});

// print ipv4 & ipv6 ip addresses
(async () => {
	console.log(await publicIP.v4());
	//=> '46.5.21.123'

	console.log(await publicIP.v6());
	//=> 'fe80::200:f8ff:fe21:67cf'
})();

var httpsCerts = {
	key: fs.readFileSync('./GitIgnore/key.pem'),
	cert: fs.readFileSync('./GitIgnore/cert.pem')
};

https.createServer(httpsCerts, app).listen(443);
http.createServer(app).listen(8080);
console.log("Running the server...");

//app.listen(port, () => console.info('Application running on port ' + port));
