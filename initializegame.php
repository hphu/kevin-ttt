
<?php

$player = $_POST['playerid'];

$user="root";
$password="";
$database="a";
$server="localhost";

$conn = mysql_connect($server,$user,$password)
or die("Unable to connect to MySQL server");

mysql_select_db("tictactoe", $conn);
//create game entry
$findgame = mysql_num_rows(mysql_query("SELECT started FROM game WHERE started=0"))	;
//$gamestartedbyopponent = mysql_num_rows(mysql_query("SELECT player1id, player2id,completed FROM game WHERE player1id=secondplayer AND player2id=firstplayer AND completed=false")));
if ($findgame ==0){
		//if no game entry found for this game, create an entry for it
	mysql_query("INSERT INTO game (started, gamestate, player1id, timestamp, justwent) VALUES (0, '000000000', ($player),0, 2)"); //justwent
	echo $player;
} else {

	$joingame = mysql_query("SELECT player1id FROM game WHERE started=0 LIMIT 1");
	$data = mysql_fetch_array($joingame);
	$opponentid = (int)$data[0];
	mysql_query("INSERT INTO game (started, gamestate, player1id, player2id, timestamp, justwent) VALUES (1, '000000000', ($opponentid), ($player), 0, 1)"); //game creator will go first, started =1
	mysql_query("DELETE FROM game WHERE player1id= ($opponentid) AND started = 0"); //removed unstarted game so other players can't join
	echo $opponentid;
}
mysql_close($conn);
?>
