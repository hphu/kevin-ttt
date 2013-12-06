<?php

$myid = $_POST['myid'];

$user="root";
$password="";
$database="a";
$server="localhost";

$conn = mysql_connect($server,$user,$password)
or die("Unable to connect to MySQL server");

mysql_select_db("tictactoe", $conn);
$leaderboard = mysql_query("SELECT username, wins, ties, losses FROM users WHERE userid = ($myid)");


while($result = mysql_fetch_array($leaderboard)){
	echo $result['username']." ".$result['wins']." ".$result['ties']." ".$result['losses'];
}

mysql_close($conn);
?>
