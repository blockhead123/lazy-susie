<?php
/**************************************************************************************
 * Class: db query
 * Author: Norbert Christian L. Feria <ombing@gmail.com>
 * Redistribute as you see fit.
 **************************************************************************************/
class query{

var $result;
# stored here is the resulting array from the fetching of record 
# from the query

var $qr;
#the query result variable 

var $mtstart;
#starting time of execution

var $exectime;
#total execution time

//constructor function
function query(){
	$result = NULL;
	$qr = NULL;
}

//query the database
//@param =  $sql - sql statment to be used to query the database

function getquery($sql)
{
  $this->mtstart = $this->getmicrotime();
  $this->qr = mysql_query($sql);
  if(!$this->qr){
  	trigger_error("MySQL Query Error ".mysql_error()."<BR>".$sql, E_USER_ERROR);
  }
  $this->exectime = $this->getexectime();
}

//execute command queries i.e. INSERT, UPDATE, DELETE ....
function execquery($sql)
{
  $link = mysql_query($sql);
  if (!$link) {
 	trigger_error("Unable to execute to query. ".mysql_error()."<BR>".$sql, E_USER_ERROR);
  }else{
  	return $link;
  }
}

function lastid(){
	return mysql_insert_id();
}

// fetch record from the query result and stores it to the 
// $result variable for public access.
function fetch()
{
	$this->result = mysql_fetch_array($this->qr, MYSQL_ASSOC);
	if($this->result == FALSE){
		return FALSE;
	}else{
		return TRUE;
	}
}

//returns the number of rows from the query result
function numrows()
{
	return mysql_num_rows($this->qr);
}

// fetch a single record from a sql statement source. No need to 
// add LIMIT parameters since this code will automatically append this 
// clause.
function query_single_row($sql)
{
  $sql = "$sql LIMIT 1";
  $this->getquery($sql);
  $this->result = mysql_fetch_array($this->qr);
  if($this->result == FALSE){
		return FALSE;
	}else{
		return TRUE;
	}  
}

//returns the number of FIELDS from the query result
function numfields()
{
	return mysql_num_fields($this->qr);
}

//returns the ID of the last Inserted record.
function lastinsertedid()
{
  return mysql_insert_id();
}

// returns the total query execution time
function getexectime()
{
  return round(($this->getmicrotime() - $this->mtstart) * 1000) / 1000;
}

// records the starting time of execution
function getmicrotime()
  {
    list($msec, $sec) = explode(' ', microtime());
    return floor($sec / 1000) + $msec;
  }

}// end class query

?>