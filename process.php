<?php

  function insertuser($email,$uname, $pword){
	if (mysql_query("INSERT INTO users (email, username, password)
	VALUES ('$email', '$uname', '$pword')")){
		echo "REGISTRATION SUCCESSFUL";
	} else {
		echo "error";
	}
}

function loginuser($uname, $pword){
	$match = mysql_query("SELECT * FROM users WHERE username = '$uname' AND password = '$pword'");
	if ($match && mysql_num_rows($match) == 1){
		session_start();
		$sessionid= mysql_query("SELECT userid FROM users WHERE username = '$uname' AND password = '$pword'");
		$id = mysql_fetch_array($sessionid);
		$_SESSION['id']=(int)$id[0];
		header("Location: mainmenu.html");
		//echo $_SESSION['id'];
	} else {
		echo "Incorrect Username/Password!";
	}
}


$user="root";
$password="";
$server="localhost";
$conn = mysql_connect($server,$user,$password)
or die("Unable to connect to MySQL server");

  $Username  = $_POST['usrname'];
  $Password = $_POST['pwd'];


  mysql_select_db("tictactoe", $conn);

if(isset($_POST['register']))
{
	$Email = $_POST['email'];

    insertuser($Email, $Username, $Password);
}
else if (isset($_POST['login'])){
	loginuser($Username, $Password);
}

  mysql_close($conn);


  ?>