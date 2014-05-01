<?php
include_once("ITX.php");

class ITO extends HTML_Template_ITX {
	
	function ITO($tplpath,$tplfile){
		parent::HTML_Template_IT($tplpath);
		$this->loadTemplatefile($tplfile);
		$this->setVariable("blank","");
	}#CONSTRUCTOR
	
}#CLASS
?>