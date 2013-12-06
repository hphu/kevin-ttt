<?php

$user="root";
$password="";
$database="a";
$server="localhost";

$conn = mysql_connect($server,$user,$password)
or die("Unable to connect to MySQL server");

mysql_select_db("tictactoe", $conn);
$leaderboard = mysql_query("SELECT username, wins, ties, losses FROM users ORDER BY rank DESC LIMIT 10");


while($result = mysql_fetch_array($leaderboard)){
	echo $result['username']." ".$result['wins']." ".$result['ties']." ".$result['losses']."\r\n";
}
mysql_close($conn);
?>
