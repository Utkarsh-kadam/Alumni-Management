var express = require('express');

var router = express.Router();

var database = require('../database');

router.get("/", function(request, response, next){

	var query = "SELECT * FROM alumni_db order by PRN";

	database.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('show_alumni', {title:'Alumni Management System', action:'list', show_alumni:data});
		}

	});

});




router.get("/add", function(request, response, next){


	//response.render("show_alumni", {title:'Insert Data into MySQL', action:'add'});
	var query1 = "SELECT DISTINCT course_id,course_name FROM course";
	var query2 = "SELECT DISTINCT college_id,college_name FROM college";

	database.query(query1, function(error, data1){
		database.query(query2, function(error, data2){
		

			response.render('show_alumni', {title: 'Data', action:'add', show_alumni:data1,show_alumni2:data2});

	
		});



	});

});

router.post("/add_show_alumni", function(request, response, next){

	var prn =request.body.prn;

	var name = request.body.name;

	var cr_id = request.body.cr_id;

	var c_id = request.body.c_id;

	var eml = request.body.eml;

	var cmpny = request.body.cmpny;

	var city = request.body.city;

	console.log(c_id);
	console.log(cr_id);

	

	var query = `
	INSERT INTO alumni_db
	VALUES ("${prn}", "${name}", "${c_id}","${cr_id}", "${eml}", "${cmpny}", "${city}")
	`;

	database.query(query, function(error, data){

		if(error)
		{

			throw error;
		}	
		else
		{
			//response.redirect("/show_alumni");
		}

	});

});


router.get('/edit/:PRN', function(request, response, next){

	var prn = request.params.PRN;

	var query = `SELECT * FROM alumni_db WHERE PRN = "${prn}"`;


	database.query(query, function(error, data){


		response.render('show_alumni', {title: 'Edit MySQL Table Data', action:'edit', show_alumni:data[0]});


	});

});

router.post('/edit/:PRN', function(request, response, next){

	var prn = request.params.PRN;

	var name = request.body.name;

	var cr_id = request.body.cr_id;

	var c_id = request.body.c_id;

	var eml = request.body.eml;

	var cmpny = request.body.cmpny;

	var city = request.body.city;


	var query = `
	UPDATE alumni_db 
	SET name = "${name}", 
	college_id = "${c_id}", 
	course_id = "${cr_id}", 
	email = "${eml}" ,
	current_company = "${cmpny}",
	city = "${city}"
	WHERE PRN = "${prn}"
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			//response.redirect('/show_alumni');
		}

	});

});


router.get('/del/:PRN', function(request, response, next){

	var prn = request.params.PRN;

	var query = `delete FROM alumni_db WHERE PRN = "${prn}"`;


	database.query(query, function(error, data){


		if(error)
		{
			throw error;
		}
		else
		{
			response.redirect('/show_alumni');
		}


	});

});



module.exports = router;
