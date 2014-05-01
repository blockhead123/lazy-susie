<?php

class DataModel EXTENDS query{

	var $primekey;
	var $tblname;
	var $fields = array();
	var $errors;
	var $numarray = array();
	var $statement;
	var $sql;

	function DataModel(){
		parent::query();
		$this->numarray = array('float', 'bigint', 'int', 'tinyint', 'smallint', 'integer', 'real', 'double', 'decimal', 'numeric');
		$this->errors = array();
	}
	
	function table($tablename){
		$this->tblname=$tablename;
	}
	
	function get_field_definitions($tablename){
		$this->tblname = $tablename;
		$sql = 'SHOW FULL COLUMNS FROM '.$this->tblname;
		$this->getquery($sql);
		while($this->fetch()){
			$fieldname = $this->result['Field'];
			array_push($this->fields, $fieldname);
			$this->fields[$fieldname] = array('type'=>$this->result['Type'], 'null'=>$this->result['Null'], 'comment'=>$this->result['Comment'], 'key'=>$this->result['Key']);
			if($this->result['Key']){
				$this->primekey = $fieldname;
			}
		}
		return $this->fields;	
	}
	
	function customsql($sqla){
		$this->sql = $sqla;
	}

	function get_records($sqla=NULL){
		$sql = strlen($sqla)>0?$sqla:$this->sql;
		$this->getquery($sql);
		$this->sql = '';
		$this->no_of_records = $this->numrows();
		if($this->no_of_records>0){
			return true;
		}else{
			return false;
		}
	}
	
	function get_record($sqla=NULL){
		$sql = strlen($sqla)>0?$sqla:$this->sql;
		$this->getquery($sql);
		if($this->numrows()>0){
			$this->fetch();
			return $this->result;
		}else{
			return false;
		}	
	}
	
	function generate_statement($statement_type, $postvars, $fieldprefix, $table=NULL){
		$tblname=(strlen($table)>0)?$table:$this->tblname;
		$this->get_field_definitions($tblname);
		$statement ='';
		$errorval=false;
		$post=$postvars;
		foreach($this->fields as $key=>$definition){
			if($definition['key']!='PRI'){
			$key1=str_replace($fieldprefix, '', $key);
			if(strpos($definition['type'], '(',0)){
				$type = substr($definition['type'], 0, strpos($definition['type'], '('));
			}else{
				$type = $definition['type'];
			}
			
			if(isset($post[$key1])){
				if(strlen($post[$key1])){
				if(!in_array($type, $this->numarray)){
					$recvalue ='"'.$this->sValidate($post[$key1]).'"';
				}else{
					$post[$key1]=str_replace(',','', $post[$key1]);
					if(!is_numeric($post[$key1])&&strlen($post[$key1])>0){
						$error = array('field'=>$key, 'label'=>$key1, 'error'=>'numeric');
						array_push($this->errors, $error);
						$errorval = true;
					}else{
						$recvalue = $post[$key1];
					}
				}
				$statement.= $key.'='.$recvalue.' , ';
				
				}else{
					if($definition['null']=='NO'){
						$error = array('field'=>$key, 'label'=>$key1, 'error'=>'empty');
						array_push($this->errors, $error);
						$errorval = true;
					}
				}
			}else{
				if($definition['null']=='NO'){
					if($statement_type=='add'){
						$error = array('field'=>$key, 'label'=>$key1, 'error'=>'empty');
						array_push($this->errors, $error);
						$errorval = true;
					}
				}
			}
		}
		}
		$statement=substr($statement, 0, strlen($statement)-2);
		$sql=($statement_type=='add')?'INSERT INTO '.$tblname.' SET '.$statement:'UPDATE '.$tblname.' SET '.$statement;
		if($errorval){
			return false;
		}else{
			return $sql;
		}
	}
	
	function get_errors(){
		return $this->errors;
	}
		
	function sValidate($string){
		$string=str_replace('"', '&#34;', $string);
		return $string;
	}
	
}//class DataModel

