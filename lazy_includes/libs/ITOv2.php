<?php
include_once("ITX.php");

class ITO extends HTML_Template_ITX {
	var $page_title = '';
	var $meta_description = '';
	var $meta_keywords = '';
	
	function ITO($tplpath,$tplfile){
		parent::HTML_Template_IT($tplpath);
		$this->loadTemplatefile($tplfile);
		$this->setVariable("blank","");
	}#CONSTRUCTOR	
	
	function set_page_title($title){
		$this->page_title=$title;	
	}
		
	function page_title(){
		if($this->page_title==''){
			if($this->blockExists('PAGE_TITLE')){
				$this->setCurrentBlock('PAGE_TITLE');
				$this->setVariable('PAGE_TITLE', ' ');
				$this->parseCurrentBlock();	
				$this->page_title=trim($this->get('PAGE_TITLE'));
				$this->replaceBlock('PAGE_TITLE', ' ');
			}
		}
		return $this->page_title;
	}#page_title
	
	function set_meta_description($description){
		$this->meta_description = $description;
	}
	
	function meta_description(){
		if($this->meta_description==''){
			if($this->blockExists('META_DESCRIPTION')){
				$this->setCurrentBlock('META_DESCRIPTION');
				$this->setVariable('META_DESCRIPTION', ' ');
				$this->parseCurrentBlock();	
				$this->meta_description=trim($this->get('META_DESCRIPTION'));
				$this->replaceBlock('META_DESCRIPTION', ' ');
			}
		}
		return $this->meta_description;
	}#meta_description	
	
	
	function set_meta_keywords($keywords){
		$this->meta_keywords = $keywords;
	}
	
	function meta_keywords(){
		if($this->meta_keywords==''){
			if($this->blockExists('META_KEYWORDS')){
				$this->setCurrentBlock('META_KEYWORDS');
				$this->setVariable('META_KEYWORDS', ' ');
				$this->parseCurrentBlock();	
				$this->meta_keywords=trim($this->get('META_KEYWORDS'));
				$this->replaceBlock('META_KEYWORDS', ' ');
			}
		}
		return $this->meta_keywords;
	}#meta_keywords	
	
	
}#CLASS
?>