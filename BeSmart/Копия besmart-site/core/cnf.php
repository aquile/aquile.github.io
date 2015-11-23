<?php

/**
 * Description of cnf
 *
 * @author Viktor Protsenko <pro.victorr@gmail.com>
 */
class cnf {
   public static $db_host = 'localhost';
   public static $db_name = 'besmarti_new';
   public static $db_user = 'besmarti_new';
   public static $db_pass = 'aA$w3[9v3i?O';
   public static $db_prefix = '';

   public static $email_from = 'no-reply@besmart.in.ua';

   public static $comments = array(
       'autopublish' => 0 // can be 0 or 1
   );
   public static $mailer = array(
       'companyName' => 'Be Smart'
   );
}

?>