"use strict"
var ejs = require("ejs");
var mysql = require('./mysql');
var logging = require('./logging');
var url = require('url');

function getItem(req,res)
{
	if(req.session.username)
	{
		res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		 var queryData = url.parse(req.url, true).query;
		var selectItem = "select * from items,userinfo where itemId = '" + queryData.itemId + "' and items.owner = userinfo.username" ;
		mysql.getData(function(err, results)
				{
						if (err)
						{
							throw err;
						}
						else
						{
							logging.logger.log('info', req.session.username + "  | viewed item: " +queryData.itemId+ " | "  + new Date().toString());
							ejs.renderFile('./views/item.ejs', {"itemName":results[0].itemName,"itemDesc":results[0].description,"itemQuantity":results[0].quantity,"itemId":results[0].itemId,"itemPrice":results[0].price,"seller":results[0].owner, "location":results[0].state,"fname":req.session.fname,"lastLogged":new Date(req.session.lastLoggedIn).toLocaleString()},function(err, result)
									{
										if (!err)
										{
											
											res.end(result);
										}
										else
										{
											res.end("An error occured.");
											console.log(err);
										}
									});							
						}
					},selectItem );
	}
}

exports.getItem = getItem;