<?php

$winner = $_POST['winner'];
$loser = $_POST['loser'];
$tie = $_POST['tie'];

$user="root";
$password="";
$database="a";
$server="localhost";

$conn = mysql_connect($server,$user,$password)
or die("Unable to connect to MySQL server");

mysql_select_db("tictactoe", $conn);

if ($tie == 'true'){
	mysql_query("UPDATE users SET ties = ties+1 WHERE username =('$winner') or username = ('$loser')");
} else {
	mysql_query("UPDATE users SET wins = wins+1 WHERE username =('$winner')");
	mysql_query("UPDATE users SET losses = losses+1 WHERE username =('$loser')");


}
mysql_query("UPDATE users SET rank = (wins/(wins+losses+ties)) WHERE username =('$winner')");
mysql_query("UPDATE users SET rank = (wins/(wins+losses+ties)) WHERE username =('$loser')");

mysql_close($conn);
?>
