"use strict"
var ejs = require("ejs");
var mysql = require('./mysql');
var logging = require('./logging');
var dateTime = require('./DateTime');
var cryptojs = require("crypto-js");

function regexTest(regex, value)
{
	if (regex.test(value))
	{
		return true;
	}
	else
	{
		return false;
	}
}

function signOut(req,res)
{
	//save the session
	logging.logger.log('info', req.session.username + "  | Signed Out | " + new Date().toString());
	req.session.destroy();
	res.send({"statusCode":200});
}

function logIn(req,res)
{
	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	var username = req.param("username");
	var password = req.param("password");
	var mailregex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	if(!regexTest(mailregex,username))
	{
		res.send({'statusCode' : 401});
	}
	var loginQuery = "select * from users where username='"+username + "'and password='" + cryptojs.MD5(password) + "'" ;
	console.log(loginQuery);
	mysql.getData(function(err, results)
		{
				if (err)
				{
					throw err;
				}
				else
				{
					if (results.length > 0)
					{
						req.session.username = username;
						req.session.fname = results[0].firstname;
						req.session.lname = results[0].lastname;
						req.session.email = results[0].email;
						req.session.lastLoggedIn = results[0].lastLoggedIn; 
						res.send({'statusCode':200});
						res.end();
						var date = dateTime.getCurrentDateTime();
						logging.logger.log('info', username + " | Signed In | " + new Date().toString());
						
						
						var updateLoginTime = "update users set lastLoggedIn = '" + date +"'where username='"+username + "'" ;
						mysql.getData(function(error, result){
							if(err)
								{
									throw err;
								}
						},updateLoginTime);
					}
					else
					{
						res.send({'statusCode':401});
						res.end();
					}
				}
			},loginQuery );
}

function signUp(req,res)
{res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	var email = req.param("email");
	var mailregex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	var nameregex = /^[a-zA-Z ]{0,25}$/;
	
	if(!(regexTest(mailregex,req.param("username")) && regexTest(nameregex,req.param("fname")) 
			&& regexTest(nameregex,req.param("lname")) && (mail ==req.param("re-email")) ))
	{
		res.send({'statusCode' : 401});
	}
	var alreadyRegisteredQuery = "select * from users where username='"+email + "'" ;
	console.log("Query is:" + alreadyRegisteredQuery);
	mysql.getData(function(err, results)
			{
				if (err)
				{
					throw err;
				}
				else
				{
					if (results.length > 0)
					{
						console.log(results);
					}
					else
					{
						var re_email = req.param("re-email");
						/*if(email != req.param("re-email"))
						{
								res.send({'statusCode':401});
						}*/
						var date = dateTime.getCurrentDateTime();
						var insertUser = "Insert into users (username,password,firstname,lastname,email,lastloggedIn) values ('" + email +"','"+cryptojs.MD5(req.param("password"))+"','"+req.param("fname")+"','"+req.param("lname")+ "','"+email+"','"+ date+"')";
						console.log("Insert User: "+ insertUser);
						mysql.getData(function(err, results)
						{
							if (err)
							{
								throw err;
							}
							else
							{
							
								if (results.length > 0)
								{
									console.log("404");
									res.send({'statusCode':404});
									res.end();
									
								}
								else
								{
									req.session.username = email;
									req.session.fname = req.param("fname");
									var date = dateTime.getCurrentDateTime();
									req.session.lastLoggedIn =date;
									
									console.log(req.session.lastLoggedIn);
									logging.logger.log('info', email + " | Registered | " + new Date().toString());
									res.send({"statusCode": 200 });
									res.end();
								}
							}
							},insertUser);
						
					}
				}
			},alreadyRegisteredQuery );
}

function updateProfile(req,res)
{res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	if(req.session.username)
	{
		var birthday = req.param("birthday");
		var adrLine1 = req.param("adrLine1");
		var adrLine2 = req.param("adrLine2");
		var city = req.param("city");
		var contact = req.param("contact");
		var state = req.param("state");
		var zipcode = req.param("zipcode");
		var country = req.param("country");
		// validations
		var fetchProfileQuery = "select * from userinfo where username='"+req.session.username + "'" ;
		console.log(fetchProfileQuery);
		mysql.getData(function(err, results)
		{
					if (err)
					{
						throw err;
					}
					else
					{
						var updateUserInFo;
						if (results.length > 0)
						{
							updateUserInFo = "update userinfo set birthday='"+birthday+"',contact='"+contact+"',line1='"+adrLine1+"',line2='"+adrLine2+"',city='"+city+"',state='"+state+"',zipcode='"+zipcode+"' where username='"+req.session.username+"'";
						}
						else
						{
							updateUserInFo ="Insert into userinfo (username,birthday,contact,line1,line2,city,state,zipcode) values ('" +req.session.username+"','"+ birthday +"','"+contact+"','"+adrLine1+"','"+adrLine2+"','"+city+"','"+state+"','"+zipcode+"')";
						}
						mysql.getData(function(err, results)
						{
							if (err)
							{
									throw err;
							}
							else
							{
								logging.logger.log('info', req.session.username + " | Profile Updated | " + new Date().toString());
								res.send({"statusCode":200});
								res.end();
							}
						},updateUserInFo);
					}
			},fetchProfileQuery );
	}
	else
	{
		res.redirect("/");
	}
}

function getProfile(req,res)
{res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	if(req.session.username)
	{
		var getUserInfo = "select * from userinfo where username='"+req.session.username+"'";
		mysql.getData(function(err, results)
				{
						if (err)
						{console.log("sfgssdsdsdfs");
							throw err;
						}
						else
						{
							if (results.length > 0)
							{
								console.log("200");
								res.send({'statusCode':200,"result" : results,"fname":req.session.fname,"lname":req.session.lname,"email":req.session.email});
								res.end();
							}
							else
							{
								console.log("401");
								res.send({'statusCode':401});
								res.end();
								
							}
						}
					},getUserInfo );
	}
	else
		{	console.log("sfgsfs");
			res.redirect('/');
		}
}
exports.signOut = signOut;
exports.getProfile = getProfile;
exports.updateProfile = updateProfile;
exports.logIn = logIn;
exports.signUp = signUp;