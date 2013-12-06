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
if (mysql_num_rows($friend)==0){
	echo "notfound";
	die();
}
$friend_id = mysql_fetch_array($friend)[0];
echo $myid." ".$friend_id;
mysql_query("INSERT INTO game (started, gamestate, player1id, player2id, timestamp, justwent) VALUES (-1, '000000000', ($myid), ($friend_id), 0, 2)"); 

mysql_close($conn);
?>
