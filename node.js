// Contact Form
const express = require('express');
const bodyParser = require('body-parser');
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

app.listen(port, () => console.info('Application running on port ' + port));
