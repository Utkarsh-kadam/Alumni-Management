var express = require('express');

var router = express.Router();

var database = require('../database');

router.get("/", function(request, response, next){

	var query = "SELECT * FROM alumni_db";

	database.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('search', {title:'Alumni Management System', action:'list', show_alumni:data});
		}

	});

});




router.get("/src", function(request, response ){

  var name = request.query.name;
  var PRN = request.query.PRN;
  var college_id = request.query.college_id;


  var sql ="select * from alumni_db where name like '%"+name+"%' and PRN like '%"+PRN+"%' and college_id like '%"+college_id+"%'  ";

	database.query(sql,function(error,data){

    if(error) console.log(error);

    response.render('search', {title:'Alumni Management System', show_alumni:data});

  });

});


module.exports = router;
