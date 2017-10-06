<?php
	$mail_address = '....';
	$boundary = '__BOUNDARY__';

	$today = getdate();

	$GMT = date("Z");
	$GMT_ABS  = abs($GMT);
	$GMT_HOUR = floor($GMT_ABS / 3600);
	$GMT_MIN = floor(($GMT_ABS - $GMT_HOUR * 3600) / 60);
	if ($GMT >= 0) $GMT_FLG = "+"; else $GMT_FLG = "-";
	$GMT_RFC = date("D, d M Y H:i:s ").sprintf($GMT_FLG."%02d%02d", $GMT_HOUR, $GMT_MIN);

	$subject = mb_convert_encoding( "お問い合わせ","ISO-2022-JP","auto");
	$subject = base64_encode($subject);
	$subject = "=?iso-2022-jp?B?".$subject."?=";

	$data = "\n";
	$data = $data."お問い合わせ日時：".date("Y年m月d日")."\n";
	$data = $data."お名前（氏）    ：".$_POST['form_last_name']."\n";
	$data = $data."お名前（名）    ：".$_POST['form_first_name']."\n";
	$data = $data."会社名称        ：".$_POST['form_company']."\n";
	$data = $data."郵便番号        ：".$_POST['form_post']."\n";
	$data = $data."住所            ：".$_POST['form_address']."\n";
	$data = $data."メールアドレス  ：".$_POST['form_mail']."\n";
	$data = $data."電話番号        ：".$_POST['form_tel']."\n";
	$data = $data."問い合せ内容    ：\n".$_POST['form_massage']."\n";
	if( $_FILES["form_file"]['tmp_name'] )
	{
		$data = $data."ファイル		   ：".$_FILES["form_file"]['name']."\n";
	}
	$data = $data."\n";
	
	// このデータをファイルやデータベースに出力する際には、ここに記述する-----------------
	// サンプルとして、テキストファイrに出力している。ファイル名称はメールアドレス＋.txtと仮にしている。
	file_put_contents( $_POST['form_mail'] . ".txt", $data );
	//------------------------------------------------------------------------------------
	
	$data = mb_convert_encoding($data,"ISO-2022-JP","auto");

	$Headers  = "Date: ".$GMT_RFC."\n";
//	$Headers .= "From: ".$_POST['form_mail']."\n";
	$Headers .= "From: ".$mail_address."\n";
	$Headers .= "Subject: ".$subject."\n";
	$Headers .= "MIME-Version: 1.0\n";
	$Headers .= "X-Mailer: PHP/".phpversion()."\n";

	$tmp = '';
	if( $_FILES["form_file"]['tmp_name'] )
	{
		$tmp .= "--" . $boundary . "\n";
		$tmp .= "Content-Type: text/plain; charset=\"ISO-2022-JP\"\n\n";
		$tmp .= $data;
	
		$tmp .= "--" . $boundary . "\n";
		//$tmp .= "Content-Type: " . mime_content_type($_FILES["form_file"]['type']) . "; name=\"" . basename($_FILES["form_file"]['name']) . "\"\n";
		$tmp .= "Content-Type: " . $_FILES["form_file"]['type'] . "; name=\"" . basename($_FILES["form_file"]['name']) . "\"\n";
		$tmp .= "Content-Disposition: attachment; filename=\"" . basename($_FILES["form_file"]['name']) . "\"\n";
		$tmp .= "Content-Transfer-Encoding: base64\n";
		$tmp .= "\n";
		$tmp .= chunk_split(base64_encode(file_get_contents($_FILES["form_file"]['tmp_name'])))."\n";
		
		$tmp .= "--" . $boundary . "--";

		$Headers = "Content-Type: multipart/mixed;boundary=\"" . $boundary . "\"\n";
	} else {
		$tmp .= $data;

		$Headers .= "Content-type: text/plain; charset=ISO-2022-JP\n";
	}

	$Headers .= "Content-transfer-Encoding: 7bit";
	mail( $mail_address, $subject, $tmp, $Headers );
?>
