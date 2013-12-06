<?php

$player1 = $_POST['player1'];
$player2 = $_POST['player2'];

$user="root";
$password="";
$database="a";
$server="localhost";

$conn = mysql_connect($server,$user,$password)
or die("Unable to connect to MySQL server");

mysql_select_db("tictactoe", $conn);
$started = mysql_query("SELECT started FROM game WHERE player1id = ($player1) AND player2id=($player2) ORDER BY timestamp DESC LIMIT 1");

$result = mysql_fetch_array($started)[0];
echo $result;

mysql_close($conn);
?>
