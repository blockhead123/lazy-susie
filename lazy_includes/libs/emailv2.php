<?php

function email($to, $subject, $message, $cc, $bcc){
	$footer = "<BR><BR>This email was auto generated.<BR>";
	$message = $message.$footer; 
	$headers = 'From: "'.SENDERNAME.'" <'.SENDERMAIL.'>'."\r\n";

	if(strlen($cc)>0){
		$headers .= 'Cc: '.$cc. "\r\n";
	}
	if(strlen($bcc)>0){
		$headers .= 'Bcc: '.$bcc. "\r\n";
	}
	$headers.= 'MIME-Version: 1.0' . "\r\n";
	$headers.= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
	#echo $headers;
	if(mail($to,$subject,$message,$headers)){
		return TRUE;
	}else{
		return FALSE;
	}
}

/*usage:

	email($emailad, $subject, $msg, $cc, $bcc)

*/

?>