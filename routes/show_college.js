var express = require('express');

var router = express.Router();

var database = require('../database');

router.get("/", function(request, response, next){

	var query = "SELECT * FROM college";

	database.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('show_college', {title:'Alumni Management System', action:'list', show_college:data});
		}

	});

});


router.get("/add", function(request, response, next){

	response.render("show_college", {title:'Insert Data into MySQL', action:'add'});

});

router.post("/add_show_college", function(request, response, next){

	var c_id = request.body.c_id;

	var name = request.body.name;

	var addr = request.body.addr;

	

	var query = `
	INSERT INTO college 
	VALUES ("${c_id}", "${name}", "${addr}")
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}	
		else
		{
			response.redirect("/show_college");
		}

	});

});

module.exports = router;
