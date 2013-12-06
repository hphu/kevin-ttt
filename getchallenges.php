<?php

$myid = $_POST['myid'];

$user="root";
$password="";
$database="a";
$server="localhost";

$conn = mysql_connect($server,$user,$password)
or die("Unable to connect to MySQL server");

mysql_select_db("tictactoe", $conn);
$challenge = mysql_query("SELECT player1id FROM game WHERE started=-1 AND player2id=($myid)");

$message ="";

while($result = mysql_fetch_array($challenge)){
	$challengerid = $result['player1id'];
	$names = mysql_query("SELECT username FROM users WHERE userid =($challengerid)");
	$firstname = mysql_fetch_array($names)[0];
	$message .= $firstname." ";
}
echo $message;
mysql_close($conn);
?>
