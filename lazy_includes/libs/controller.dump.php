<?php 

$qry = new DataModel;

if(isset($_POST['formaction'])){

	$qry->table($tableindex[$_POST['controltbl']]);
	$component = strlen($_POST['formcomponent'])>0 ? $_POST['formcomponent'] : $_GET['lz_com'];
	$formproceed = $_POST['formproceed'];
	$post = $_POST;
	$id = $_POST['mdid'];
	$tplfile = $_POST['formpostback'].'.htm';
	$tpl->loadTemplateFile($tplfile);
	if($_POST['formaction']=='update'){	
		$updategood = $qry->update_record($post, $id);
	}elseif($_POST['formaction']=='add'){
		$updategood = $qry->add_record($post);
	}
	if(!$updategood){
		$tpl->setVariable('errors', $qry->errors);
		foreach($post as $fld => $value){
			$tpl->setVariable($fld, $value);
		}	
	}else{

	if (isset($_GET['lz_com'])){
		if (isset($_GET['lz_content'])){
			include('contents/'.$_GET['lz_com'].'/'.$_GET['lz_content'].'_post.php');
		}else{
			include('contents/'.$_GET['lz_com'].'/index_post.php');
		}
	}else{
		$component='default';
		if(!$_GET['lz_content']){
			include('contents/default/default_post.php');
		}else{
			include('contents/default/'.$_GET['lz_content'].'_post.php');
		}
	}

		$redirectstr = '';
		if(isset($_POST['formproceed'])) $redirectstr.='&content='.$_POST['formproceed'];
		if(isset($_POST['lz_control'])) $redirectstr.='&lz_control='.$_POST['lz_control'];
		if(isset($_GET['mdid'])) $redirectstr.='&mdid='.$_GET['mdid'];

		header('Location: '.$phpself.'?com='.$component.$redirectstr);
	}
}

if(isset($_GET['lz_control'])){
	$qry->table($tableindex[$_GET['lz_control']]);
	#if(isset($_GET['mdid']) || isset($_GET['id'])){
	if($_GET['lz_content']=='edit'){
		if($id==""){
			#$id = isset($_GET['id']) ? $_GET['id'] : $_GET['mdid'];
			$id = $_REQUEST['mdid'];
		}
		$rec = $qry->get_record($id);
		if($rec){
			foreach($rec as $fld => $value){
				$tpl->setVariable($fld, $value);
			}
				$tpl->setVariable('id', $qry->result[$qry->primekey]);
				$tpl->setVariable('mdid', md5($qry->result[$qry->primekey]));
		}
	}else{
		if($qry->get_records()){
			$tpl->setCurrentBlock('defaultrow');
			while($qry->fetch()){
				foreach($qry->result as $field => $value)
				{
					$tpl->setVariable($field, $value);
				}
				$tpl->setVariable('id', $qry->result[$qry->primekey]);				
				$tpl->setVariable('mdid', md5($qry->result[$qry->primekey]));
				$tpl->setVariable('siteurlin', SITEURL);
				$tpl->setVariable('phpselfin', $phpself);
				$tpl->setVariable('blank', '');
				$tpl->parseCurrentBlock();
			}
		}
	}
}
?>