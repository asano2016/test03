/*----------------------------------------------------------------------------------------------------------
メールアドレスチェック関数
	注意事項：
		入力データが存在しない場合には正常値として判断します。
----------------------------------------------------------------------------------------------------------*/
function CheckMail( value )
{
	if( !value.match(/^[A-Za-z0-9\.]+[\w\.-]+@[\w\.-]+\.\w{2,}$/) && ( value.length > 0 ) )
	{
		return false;
	}
	
	return true;
}


/*----------------------------------------------------------------------------------------------------------
電話番号チェック関数
	注意事項：
		入力データが存在しない場合には正常値として判断します。
----------------------------------------------------------------------------------------------------------*/
function CheckTel( value )
{
	if( !value.match(/^0\d{1,4}-\d{1,4}-\d{3,4}$/) && ( value.length > 0 ) )
	{
		return false;
	}
	
	return true;
}

/*----------------------------------------------------------------------------------------------------------
郵便番号チェック関数
	注意事項：
		入力データが存在しない場合には正常値として判断します。
----------------------------------------------------------------------------------------------------------*/
function CheckPost( value )
{
	if( !value.match(/^\d{3}\-\d{4}$/) && ( value.length > 0 ) )
	{
		return false;
	}
	
	return true;
}

function CheckForm()
{
	if( $('#form_last_name').val().length <= 0 )
	{
		$('#form_last_name').attr( 'placeholder', 'お名前（氏）を入力してください。' );
		$('#form_last_name_label').css( 'color', '#ff0000' );
		$('#form_last_name').focus();
		return false;
	}
	$('#form_last_name_label').css( 'color', '#000000' );

	if( $('#form_first_name').val().length <= 0 )
	{
		$('#form_first_name').attr( 'placeholder', 'お名前（名）を入力してください。' );
		$('#form_first_name_label').css( 'color', '#ff0000' );
		$('#form_first_name').focus();
		return false;
	}
	$('#form_first_name_label').css( 'color', '#000000' );

	if( $('#form_company').val().length <= 0 )
	{
		$('#form_company').attr( 'placeholder', '会社名称を入力してください。' );
		$('#form_company').css( 'color', '#ff0000' );
		$('#form_company').focus();
		return false;
	}
	$('#form_company').css( 'color', '#000000' );

	if( $('#form_post').val().length <= 0 )
	{
		$('#form_post').attr( 'placeholder', '郵便番号を入力してください。' );
		$('#form_post_label').css( 'color', '#ff0000' );
		$('#form_post').focus();
		return false;
	} else {
		if( !CheckPost( $('#form_post').val() ) )
		{
			$('#form_post').attr( 'placeholder', '郵便番号(' + $('#form_post').val() + ')の入力内容に誤りがあります。' );
			$('#form_post').val( '' );
			$('#form_post_label').css( 'color', '#ff0000' );
			$('#form_post').focus();
			return false;
		}
	}
	$('#form_post_label').css( 'color', '#000000' );

	if( $('#form_address').val().length <= 0 )
	{
		$('#form_address').attr( 'placeholder', '住所を入力してください。' );
		$('#form_address_label').css( 'color', '#ff0000' );
		$('#form_address').focus();
		return false;
	}
	$('#form_address_label').css( 'color', '#000000' );

	if( $('#form_mail').val().length <= 0 )
	{
		$('#form_mail').attr( 'placeholder', 'メールアドレスを入力してください。' );
		$('#form_mail_label').css( 'color', '#ff0000' );
		$('#form_mail').focus();
		return false;
	} else {
		if( !CheckMail( $('#form_mail').val() ) )
		{
			$('#form_mail').attr( 'placeholder', 'メールアドレス(' + $('#form_mail').val() + ')の入力内容に誤りがあります。' );
			$('#form_mail').val( '' );
			$('#form_mail_label').css( 'color', '#ff0000' );
			$('#form_mail').focus();
			return false;
		}
	}
	$('#form_mail_label').css( 'color', '#000000' );

	if( $('#form_tel').val().length <= 0 )
	{
		$('#form_tel').attr( 'placeholder', '電話番号を入力してください。' );
		$('#form_tel_label').css( 'color', '#ff0000' );
		$('#form_tel').focus();
		return false;
	} else {
		if( !CheckTel( $('#form_tel').val() ) )
		{
			$('#form_tel').attr( 'placeholder', '電話番号(' + $('#form_tel').val() + ')の入力内容に誤りがあります。' );
			$('#form_tel').val( '' );
			$('#form_tel_label').css( 'color', '#ff0000' );
			$('#form_tel').focus();
			return false;
		}
	}
	$('#form_tel_label').css( 'color', '#000000' );

	if( $('#form_massage').val().length <= 0 )
	{
		$('#form_massage').attr( 'placeholder', '問い合せ内容を入力してください。' );
		$('#form_massage_label').css( 'color', '#ff0000' );
		$('#form_massage').focus();
		return false;
	}
	$('#form_massage_label').css( 'color', '#000000' );

	return true;
}

/*---------------------------------------------------------------------------------------------------------------------------------
初期設定関数
	全ての状態が完了した場合の最初に行う必要のある処理を行う。
---------------------------------------------------------------------------------------------------------------------------------*/
function InitProc()
{
	$("#form_send").click
	(
		function () {
			// 入力データの確認
			if( !CheckForm() )
			{
				// 以降の処理をスキップ
				return;
			}

			// 送信データの作成
			var fd = new FormData();
			if( $('#form_file').val() !== '' )
			{
				fd.append( 'form_file', $('#form_file').prop('files')[0] );
			}
			fd.append( 'form_last_name', $('#form_last_name').val() );
			fd.append( 'form_first_name', $('#form_first_name').val() );
			fd.append( 'form_company', $('#form_company').val() );
			fd.append( 'form_post', $('#form_post').val() );
			fd.append( 'form_address', $('#form_address').val() );
			fd.append( 'form_mail', $('#form_mail').val() );
			fd.append( 'form_tel', $('#form_tel').val() );
			fd.append( 'form_massage', $('#form_massage').val() );

			// サーバーから指定された行のデータを取得
		    $.ajax
		    (
		        {
		            type:		"POST",
		            url: 		"./send_contact.php",
		            data: 		fd,
					processData : false,
					contentType : false,
		            success: 	function( jsData, dataType )
		            			{
			            			$('#form_last_name').val('');
		            				$('#form_first_name').val('');
		            				$('#form_company').val('');
		            				$('#form_post').val('');
		            				$('#form_address').val('');
		            				$('#form_mail').val('');
		            				$('#form_tel').val('');
		            				$('#form_massage').val('');
	
									$('#form_last_name').attr( 'placeholder', '' );
									$('#form_first_name').attr( 'placeholder', '' );
									$('#form_company').attr( 'placeholder', '' );
									$('#form_post').attr( 'placeholder', '' );
									$('#form_address').attr( 'placeholder', '' );
									$('#form_mail').attr( 'placeholder', '' );
									$('#form_tel').attr( 'placeholder', '' );
									$('#form_massage').attr( 'placeholder', '' );
	
			            			alert( 'お問い合わせありがとうございました。' );
		                    	},
		            error: 		function( XMLHttpRequest, textStatus, errorThrown )
		            			{
			            			alert( 'メール送信環境に問題があります。' );
		                    	}
		        }
			);
		}
	);
}

// DOMツリーの構築が終わった時点で実行。
$(document).ready
(
	function()
	{
		// 初期設定関数をコール
		InitProc();
	}
);
