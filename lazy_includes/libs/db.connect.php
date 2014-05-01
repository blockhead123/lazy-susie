<?php
/**************************************************************************************
 * Class: db connect
 * Author: Norbert Christian L. Feria <ombing@gmail.com>
 * Redistribute as you see fit.
 **************************************************************************************/
 
class db{

var $connected;
#variable to identify if there is a connection to the database

//constructor function
function db($host,$user,$pass,$db){
	$this->connected = 0;
	$this->connectme($host,$user,$pass,$db);
	$this->connected = 1;
}

//function to connect to a host using the username,password and database parameters
function connectme($host,$user,$pass,$db){
	if($this->connected == 0){
		$link = mysql_connect($host, $user, $pass);
		if (!$link) {
 		  trigger_error("Unable to connect to host", E_USER_ERROR);
		}
		$link = mysql_select_db($db);
		if (!$link) {
 		  trigger_error("Unable to select Database", E_USER_ERROR);
		}
	}
}

//function to disconnect to a db
function disconn_db()
{
	if($this->connected == 1){
		mysql_close();
		$this->connected = 0;
	}
}

}//end class db
?>
