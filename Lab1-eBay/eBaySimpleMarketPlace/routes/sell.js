"use strict"
var ejs = require("ejs");
var mysql = require('./mysql');
var logging = require('./logging');


function sellReview(req,res)
{
	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	if(req.session.username)
	{
		
		var quantity = req.session.itemQuantity;
		var name = req.session.itemName;
		var desc =  req.session.itemDesc;
		var price =  req.session.itemPrice;
		var isBidding = 0;
		var insertItem = "Insert into items (itemName,description,quantity,isBidding,owner,price) values ('"+name+"','"+desc+"','"+quantity+"','"+isBidding+"','"+req.session.username+"','"+price+"')";
		mysql.getData(function(err, results)
		{
			if (err)
			{
				throw err;
			}
			else
			{
				logging.logger.log('info', req.session.username + " | item added | " + new Date().toString());
				res.send({"statusCode":200});
				res.end();
			}
		},insertItem);
	}
	else
	{
		res.redirect('/');
	}
}

function sellInfo(req,res)
{
	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	if(req.session.username)
	{
		req.session.itemName = req.param("itemname");
		req.session.itemDesc = req.param("desc");
		req.session.itemQuantity = req.param("quantity");
		req.session.itemPrice = req.param("price");
		
		res.send({"statusCode":200});
		res.end();
						
	}
}
exports.sellInfo = sellInfo;
exports.sellReview = sellReview;