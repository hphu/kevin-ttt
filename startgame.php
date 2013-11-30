<?php

$gameid = $_POST['gameid'];

$user="root";
$password="";
$database="a";
$server="localhost";

$conn = mysql_connect($server,$user,$password)
or die("Unable to connect to MySQL server");

mysql_select_db("tictactoe", $conn);
$players = mysql_query("SELECT player1id, player2id FROM game WHERE player1id = ($gameid) ORDER BY timestamp DESC LIMIT 1");
if (!$players){
	die("error");
}
$result = mysql_fetch_array($players);
$player1=$result['player1id'];
$player2 = $result['player2id'];
//echo($player1 + " "  + $player2);
$player1name = mysql_query("SELECT username FROM users WHERE userid = ($player1)");
$player2name = mysql_query("SELECT username FROM users WHERE userid = ($player2)");

$firstname=mysql_fetch_array($player1name)[0];
$secondname=mysql_fetch_array($player2name)[0];
echo ($firstname."-separator!@#$-". $secondname);
//echo ($secondname);
mysql_close($conn);
?>
