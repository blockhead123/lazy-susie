<?php

function email($to, $subject, $message){
	$footer = "<BR><BR>This email was auto generated.<BR>";
	$message = $message.$footer; 
	#$headers = 'From: "'.SENDERNAME.'" <'.SENDERMAIL.'>'."\r\n";
	#echo $headers;
	$headers.= 'MIME-Version: 1.0' . "\r\n";
	$headers.= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
	
	if(mail($to,$subject,$message,$headers, '-fwebmaster@mackamandag.com')){
		return TRUE;
	}else{
		return FALSE;
	}
}

?>