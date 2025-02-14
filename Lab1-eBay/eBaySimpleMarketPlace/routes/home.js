"use strict"
var ejs = require("ejs");
var mysql = require('./mysql');
var logging = require('./logging');
function getHomeValues(req, res) {
	if (req.session.username) {
		var getItems = "select * from items where items.quantity > 0 and items.owner != '" + req.session.username+"'";
		mysql.sendToPool(function(err, results)
				{
						if (err)
						{
							throw err;
						}
						else
						{
							if (results.length > 0)
							{
								console.log(req.session.lastLoggedIn);
								res.send({
									"statusCode" : 200,
									"fname" : req.session.fname,
									"items":results,
									"lastLoggedIn": req.session.lastLoggedIn,
									"username": req.session.username
								});
								res.end();
							}
							else
							{
								res.send({'statusCode':401});
								res.end();
								console.log("401");
							}
						}
					},getItems );
	}
}

exports.getHomeValues = getHomeValues;