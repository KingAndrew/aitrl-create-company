////////////// CreateCompany ///////////////////////
'use strict';

// Added to handle injection
const vandium = require( 'vandium' );

const mysql   = require('mysql');

var pool  = mysql.createPool({
  connectionLimit : 100,
  host            : process.env.rds_host,
  user            : process.env.rds_user,
  password        : process.env.rds_password,
  database        : process.env.rds_database,
  port            : process.env.rds_port
});

exports.handler = vandium.generic()
    .handler( (event, context, callback) => {

  let sql = "INSERT INTO aitrl.company";

  sql = sql + " VALUES(" + connection.escape(event.name)+ ",";
  sql = sql + connection.escape(event.racing_name) + ")";

  console.log('CreateCompany SQL: ${sql} ');

  pool.query(sql, function (error, results, fields) {

      console.log('CreateCompany Results: ${results}');
  	
	var response = {};
  	response['id'] = results.insertId;
  	response['name'] = event.name;
  	response['racing_name'] = event.racing_name;

	console.log('CreateCompany Response: ${response}');
  	callback( null, response );
  });
})
