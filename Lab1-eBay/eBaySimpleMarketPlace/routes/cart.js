"use strict"
var ejs = require("ejs");
var mysql = require('./mysql');
var logging = require('./logging');

function addToCart(req,res)
{
	if(req.session.username)
	{
		 //var queryData = url.parse(req.url, true).query;
		 //var quant = queryData.itemId;
		res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		 var getItemfromCart = "select * from cart where itemId = '" + req.param("itemId") + "' and username = '"+req.session.username +"'";
		 mysql.getData(function(error, result)
		 {
			 if (error) {
				throw error;
			} else {
				if (result.length == 0) {
					var quant = 1;
					var addItemToCart = "Insert into cart (username,itemId,orderedquantity) values ('" +req.session.username +"','" + req.param("itemId") +"','" + quant +"')";
					mysql.getData(function(err, results)
							{
									if (err)
									{
										throw err;
									}
									else
									{
										logging.logger.log('info', req.session.username + "  | Item added to cart: " +req.param("itemId")+ " | "  + new Date().toString());
										res.send({"statusCode":200});
										res.end();
									}
								},addItemToCart );
				}
				else
				{
					var quant = (result[0].orderedquantity + 1);
					var updateQuant = "update cart set orderedquantity = "+ quant + " where itemId = '" +req.param("itemId") +"' and username ='" + req.session.username + "'";
					mysql.getData(function(err, results)
							{
									if (err)
									{
										throw err;
									}
									else
									{
										logging.logger.log('info', req.session.username + "  | Item added to cart: " +req.param("itemId")+ " | "  + new Date().toString());
										res.send({"statusCode":200});
										res.end();
									}
								},updateQuant);
				}
			}
		 
			 
		 },getItemfromCart);
	}
}

function renderCart(req, res) {
	if (req.session.username) {
		res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		ejs.renderFile('./views/cart.ejs', {"fname":req.session.fname,"lastLogged": new Date(req.session.lastLoggedIn).toLocaleString()},function(err,result) {
			if (!err) {
				res.end(result);
			} else {
				res.end("An error occured.");
				console.log(err);
			}
		});		
	}
	else
		{
		res.redirect('/');
		}
}

function getMycart(req, res) {
	if (req.session.username) {
		res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		var cartContent = [];
		var getCart = "select * from cart,items, userinfo where cart.itemId = items.itemId and items.owner = userinfo.username and cart.username = '" + req.session.username + "'";
		mysql.getData(function(error, response) {
			if (error) {
				throw error;
			} else {
				logging.logger.log('info', req.session.username
						+ "  | Viewed cart" + " | " + new Date().toString());
				var i = 0;
				var total = 0;
				
				console.log(req.session.cart);
				for (i; i < response.length; i++) {
					var json = {
						"itemId" : response[i].itemId,
						"price" : response[i].price,
						"itemName" : response[i].itemName,
						"description" : response[i].description,
						"seller" : response[i].owner,
						"orderedquantity" : response[i].orderedquantity,
						"availquantity" : response[i].quantity,
						"state" : response[i].state
					};
					cartContent.push(json);
					console.log(json);
					total += (Number(response[i].price))*(Number(response[i].orderedquantity));
				}
				req.session.total = total;
				req.session.cart = cartContent; 
				logging.logger.log('info', req.session.username + "  | Viewed cart  | "  + new Date().toString());
				res.send({"cart" : cartContent,"total":total});
				res.end();
			}
		}, getCart);
	}
}

function removeFromCart(req,res)
{
	if(req.session.username)
	{
		res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		 //var queryData = url.parse(req.url, true).query;
		 //var quant = queryData.itemId;
		 var quant = 1;
		var addItemToCart = "delete from cart where username = '" + req.session.username + "' and itemId = '"+req.param("itemId")+"'";
		mysql.getData(function(err, results)
				{
						if (err)
						{
							throw err;
						}
						else
						{
							logging.logger.log('info', req.session.username + "  | Item removed from cart: " +req.param("itemId")+ " | "  + new Date().toString());
							res.redirect('/getMycart');
							//res.send({"statusCode":200});
							//res.end();
						}
					},addItemToCart );
			}
}

function updateCart(req,res)
{
	if(req.session.username)
	{
		res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		 //var queryData = url.parse(req.url, true).query;
		 //var quant = queryData.itemId;
		 var quant = 1;
		var updateItemToCart = "update cart set orderedquantity = '" + req.param("updatedquantity") + "' where username = '" + req.session.username + "' and itemId = '"+req.param("itemId")+"'";
		mysql.getData(function(err, results)
				{
						if (err)
						{
							throw err;
						}
						else
						{
							if(results.length > 0)
								{
							logging.logger.log('info', req.session.username + "  | updated quantity in cart: " +req.param("itemId")+ " | "  + new Date().toString());
							res.redirect('/getMycart');
								}
							else
								{
								//
								}
							//res.send({"statusCode":200});
							//res.end();
						}
					},updateItemToCart );
			}
}
exports.updateCart = updateCart;
exports.getMycart = getMycart;
exports.renderCart = renderCart;
exports.addToCart = addToCart; 
exports.removeFromCart = removeFromCart;