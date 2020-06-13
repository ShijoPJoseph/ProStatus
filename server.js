var express = require('express');
var fs = require('fs');
var os = require("os");
var bodyParser = require('body-parser');
var app = express();
var strTowrite = ''
app.use(bodyParser.urlencoded({ extended: true }));

// app.use('/', express.static('./static'));

app.get ('/', function (req, resp) {
	
	var jsobj = JSON.stringify(os.userInfo());
	userObj = JSON.parse(jsobj);
	
	var actUser = userObj.username +'@' + os.hostname();
	
    fs.appendFileSync('static/User.txt', actUser + "\n", function (err) {
        if (err) throw err;
       console.log('It\'s saved!');
    });
	
	resp.redirect ("/index.html")
	
});

app.use('/', express.static('./static'));

app.post ('/Question', function (req, resp) {
	
	//console.log ('Question' + req.body.depQuestion)
	//console.log(os.hostname());
	// console.log("Radio :"+ req.body.cmtType);
	var jsobj = JSON.stringify(os.userInfo());
	userObj = JSON.parse(jsobj);
	// console.log(req.body.cmtType);
	var actUser = req.body.usrname + ' (' + userObj.username +'@' + os.hostname() + ')';
	
	if ( req.body.cmtType == 'question')
	{    var substring = "?";
		
		if (req.body.depQuestion.indexOf(substring) == -1)
		{
	strTowrite = '<p class="qa"> \n' + '<div class="q"><span>' + actUser +' : </span>' + req.body.depQuestion + ' ?</div><div class="a"><span>INTC Team : </span> Thanks for your question. We would soon come back</div></p>'
		}
		else
		{
				strTowrite = '<p class="qa"> \n' + '<div class="q"><span>' + actUser +' : </span>' + req.body.depQuestion + '</div><div class="a"><span>INTC Team : </span> Thanks for your question. We would soon come back</div></p>'
		}
		
	}
	
	if ( req.body.cmtType == 'comment')
	{
	strTowrite = '<p class="qa"> \n' + '<div class="q"><span>' + actUser +' : </span>' + req.body.depQuestion + ' </div><div class="a"><span>INTC Team : </span> Thanks for your comment</div></p>'
	}
	
	if ( req.body.cmtType == 'sugession')
	{
	strTowrite = '<p class="qa"> \n' + '<div class="q"><span>' + actUser +' : </span>' + req.body.depQuestion + ' </div><div class="a"><span>INTC Team : </span> Thanks for your Sugession. We value them</div></p>'
	}
	
	
	fs.appendFileSync('static/Quest.html', strTowrite + "\n", function (err) {
        if (err) throw err;
       console.log('It\'s saved!');
    });
	
	resp.redirect ("/index.html")
	
});
app.listen(8080);
