<?php

$friendname = $_POST['friendname'];
$myid = $_POST['myid'];

$user="root";
$password="";
$database="a";
$server="localhost";

$conn = mysql_connect($server,$user,$password)
or die("Unable to connect to MySQL server");

mysql_select_db("tictactoe", $conn);

$friend = mysql_query("SELECT userid FROM users WHERE username='$friendname'");
$friend_id = mysql_fetch_array($friend)[0];
mysql_query("UPDATE game SET started=1 WHERE player1id=($friend_id) AND player2id=($myid) AND started=-1");
echo $friend_id." ".$myid;
mysql_close($conn);
?>
