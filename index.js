////////////// CreateCompany ///////////////////////
'use strict';

// Added to handle injection
const vandium = require( 'vandium' );

const mysql   = require('mysql');

exports.handler = vandium.generic()
    .handler( (event, context, callback) => {

  let connection = mysql.createConnection({
    host     : '[rds_host]',
    user     : '[rds_user]',
    password : '[rds_password]',
    database : '[rds_database]'
  });

  let sql = "INSERT INTO aitrl.company";

  sql = sql + " VALUES(" + connection.escape(event.name)+ ",";
  sql = sql + connection.escape(event.racing_name) + ")";

  console.log('CreateCompany SQL: ${sql} ');

  connection.query(sql, function (error, results, fields) {

      console.log('CreateCompany Results: ${results}');
  	
	var response = {};
  	response['id'] = results.insertId;
  	response['name'] = event.name;
  	response['racing_name'] = event.racing_name;

	console.log('CreateCompany Response: ${response}');
  	callback( null, response );
  });
})