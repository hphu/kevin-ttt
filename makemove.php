<?php

$gameid = $_POST['gameid'];
$newmove = $_POST['move'];
$justwentid = $_POST['justwent'];
$user="root";
$password="";
$database="a";
$server="localhost";

$conn = mysql_connect($server,$user,$password)
or die("Unable to connect to MySQL server");

mysql_select_db("tictactoe", $conn);

$player2id = mysql_query("SELECT player2id FROM game WHERE player1id = ($gameid) ORDER BY timestamp DESC LIMIT 1");

$player2 = mysql_fetch_array($player2id)[0];
echo $player2;
mysql_query("INSERT INTO game (player1id, player2id, gamestate, justwent,started)
	VALUES (($gameid), ($player2),('$newmove'), ($justwentid), 1)");

mysql_close($conn);
?>
