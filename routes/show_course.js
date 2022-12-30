var express = require('express');

var router = express.Router();

var database = require('../database');

router.get("/", function(request, response, next){

	var query = "SELECT * FROM course";

	database.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('show_course', {title:'Alumni Management System', action:'list', show_course:data});
		}

	});

});



router.get("/add", function(request, response, next){

	//response.render("show_course", {title:'Insert Data into MySQL', action:'add'});
	var query = "SELECT DISTINCT college_id,college_name FROM college";

	database.query(query, function(error, data){
		
			response.render('show_course', {title: 'Data', action:'add', show_course:data});

	});

});



router.post("/add_show_course", function(request, response, next){

	var cr_id = request.body.cr_id;

	var name = request.body.name;

	var duration = request.body.duration;

	var c_id = request.body.c_id;


	var query = `
	INSERT INTO course
	VALUES ("${cr_id}", "${name}", "${duration}","${c_id}")
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}	
		else
		{
			response.redirect("/show_course");
		}

	});

});

module.exports = router;
