<?php 

{
require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer();
$mail->CharSet = 'utf-8';
$name = $_POST['name']; //получаем из  инпута в html
$phone = $_POST['phone']; //получаем из  инпута в html
$email = $_POST['email']; //получаем из  инпута в html
$myEmail = 'stas_mail_test1@mail.ru'; //email владельца сайта
        //$mail->SMTPDebug = 3;                               // Enable verbose debug output


$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.mail.ru';                                 // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'stas_mail_test@mail.ru'; // Ваш логин от почты с которой будут отправляться письма
$mail->Password = 'SPQR_Rome-will-win!3000'; // Ваш пароль от почты с которой будут отправляться письма
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465; // TCP port to connect to / этот порт может отличаться у других провайдеров
$mail->setFrom('stas_mail_test@mail.ru','Имя сайта'); // от кого будет уходить письмо?
$mail->isHTML(true);                                  // Set email format to HTML

$getters = ['a', 'b'];

foreach ($getters as $getter) {
	set_time_limit(60);
	$mail->clearAttachments();
	$mail->clearAllRecipients();

   if ($getter == 'a') {
      $mail->AddAddress($myEmail);
		$mail->Subject = "Сообщение для хозяина сайта";
      $mail->Body = '' .$name . ' оставил заявку, его телефон ' .$phone. '<br>Почта этого пользователя: ' .$email;
      $mail->send();
   }
   if ($getter == 'b') {
      $mail->AddAddress($email);
		$mail->Subject = "Сообщение для клиента";
      $mail->Body = '' .$name . ', это письмо для тебя!';
		$mail->send();
   }
}
}
?>