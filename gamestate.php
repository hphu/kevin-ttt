<?php

$gameid = $_POST['gameid'];

$user="root";
$password="";
$database="a";
$server="localhost";


$conn = mysql_connect($server,$user,$password)
or die("Unable to connect to MySQL server");

mysql_select_db("tictactoe", $conn);
$game = mysql_query("SELECT gamestate, justwent FROM game WHERE player1id = ($gameid) ORDER BY timestamp DESC LIMIT 1");
if (!$game){
	die("error");
}
$result = mysql_fetch_array($game);

function wonby($state){
	$state = (string)$state;
	for ($i = 1; $i<3; $i++){
		if ($state[0] == $i && $state[1] == $i && $state[2] == $i || $state[3] == $i && $state[4] == $i && $state[5]==$i || $state[6] == $i && $state[7] == $i && $state[8]==$i){
			return $i;
		} else if ($state[0] == $i && $state[3] == $i && $state[6] == $i || $state[1] == $i && $state[4] == $i && $state[7]==$i || $state[2] == $i && $state[5] == $i && $state[8]==$i){
			return $i;
		} else if ($state[0]==$i && $state[4] ==$i && $state[8]==$i || $state[2]==$i && $state[4] ==$i && $state[6]==$i ){
			return $i;
		} else if ($i==2){
			return 0;
		}
	}
}

if (wonby($result['gamestate']) !=0){
	echo $result['gamestate']. "". $result['justwent']."winner".wonby($result['gamestate']);
} else {
	echo $result['gamestate']. "". $result['justwent'];
}
mysql_close($conn);
?>
