<?php session_start(); /* Starts the session */
	
	/* Check Login form submitted */	
	if(isset($_POST['Submit'])){
		/* Define username and associated password array */
		$logins = array('123456' => '123456','username1' => 'password1','username2' => 'password2');
		
		/* Check and assign submitted Username and Password to new variable */
		$Username = isset($_POST['Username']) ? $_POST['Username'] : '';
		$Password = isset($_POST['Password']) ? $_POST['Password'] : '';
		
		$coorx = isset($_POST['coorx'])  ? $_POST['coorx'] : '' ;
		$coory = isset($_POST['coory'])  ? $_POST['coory'] : '';
		
		
		
		/* Check Username and Password existence in defined array */		
		if (isset($logins[$Username]) && $logins[$Username] == $Password){
			/* Success: Set session variables and redirect to Protected page  */
			
			$_SESSION['UserData']="SI";
						
			if ($coory>1000)
			{
			header("location:frame.php");
			}
			else
			{
			header("location:mando.php");
			}		
			
			exit;
		} else {
			/*Unsuccessful attempt: Set error message */
			$msg="<span style='color:red'>Invalid Login Details</span>";
		}
	}
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title> DOMO MY HOME</title>
<script>
function loadImage() {
    document.getElementById('coorx').value = screen.height          
    document.getElementById('coory').value = screen.width          
}


</script>

<style>
body {
    font-family: 'Overpass', sans-serif;
    font-weight: normal;
    font-size: 100%;
    color: #1b262c;
    margin: 0;
    background-color: #0f4c75;
}
#contenedor {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0;
    min-width: 100vw;
    min-height: 100vh;
    width: 100%;
    height: 100%;
}
#central {
    max-width: 320px;
    width: 100%;
}
.titulo {
    font-size: 250%;
    color:#bbe1fa;
    text-align: center;
    margin-bottom: 20px;
}
#login {
    width: 100%;
    padding: 50px 30px;
    background-color: #3282b8;
    -webkit-box-shadow: 0px 0px 5px 5px rgba(0,0,0,0.15);
    -moz-box-shadow: 0px 0px 5px 5px rgba(0,0,0,0.15);
    box-shadow: 0px 0px 5px 5px rgba(0,0,0,0.15);
    border-radius: 3px 3px 3px 3px;
    -moz-border-radius: 3px 3px 3px 3px;
    -webkit-border-radius: 3px 3px 3px 3px;
    box-sizing: border-box;
}
#login input {
    font-family: 'Overpass', sans-serif;
    font-size: 110%;
    color: #1b262c;
    display: block;
    width: 100%;
    height: 40px;
    margin-bottom: 10px;
    padding: 5px 5px 5px 10px;
    box-sizing: border-box;
    border: none;
    border-radius: 3px 3px 3px 3px;
    -moz-border-radius: 3px 3px 3px 3px;
    -webkit-border-radius: 3px 3px 3px 3px;
}

#login input::placeholder {
    font-family: 'Overpass', sans-serif;
    color: #E4E4E4;
}

#login button {
    font-family: 'Overpass', sans-serif;
    font-size: 110%;
    color:#1b262c;
    width: 100%;
    height: 40px;
    border: none;
    border-radius: 3px 3px 3px 3px;
    -moz-border-radius: 3px 3px 3px 3px;
    -webkit-border-radius: 3px 3px 3px 3px;
    background-color: #bbe1fa;
    margin-top: 10px;
}

#login button:hover {
    background-color: #0f4c75;
    color:#bbe1fa;
}

.pie-form {
    font-size: 90%;
    text-align: center;    
    margin-top: 15px;
}

.pie-form a {
    display: block;
    text-decoration: none;
    color: #bbe1fa;
    margin-bottom: 3px;
}

.pie-form a:hover {
    color: #0f4c75;
}

.inferior {
    margin-top: 10px;
    font-size: 90%;
    text-align: center;
}

.inferior a {
    display: block;
    text-decoration: none;
    color: #bbe1fa;
    margin-bottom: 3px;
}

.inferior a:hover {
    color: #3282b8;
}

</style> 	



</head>
<body  onload="loadImage()" >
<div id="contenedor">
            <div id="central">
                <div id="login">
                    <div class="titulo">
                        DOMO MY HOME
                    </div>
		            <form action="" method="post" name="Login_Form">
  		            <table width="200" border="0" align="center" cellpadding="5" cellspacing="1" class="Table">
    		            <?php if(isset($msg)){?>
   	 		                <tr>
      			            <td colspan="2" align="center" valign="top"><?php echo $msg;?></td>
    			            </tr>
    		            <?php } ?>
    		
    		            <tr>
      		            <td colspan="2"><input name="Username" type="text" class="Input"></td>
    		            </tr>
    		            <tr>
      		            <td colspan="2"><input name="Password" type="password" class="Input"></td>
    		            </tr>
		                <tr>
     		            <td ><input name="coorx" id="coorx"   type="text"  class="Input"></td>
    		            <td ><input name="coory" id="coory"   type="text"  class="Input"></td>
    		        	</tr>    		
		                <tr>
     		            <td colspan="2"><input name="Submit" type="submit" value="Login" class="Button3"></td>
    		            </tr>
  		            </table>
		        </form>
		            <div class="pie-form">
                        <a href="#">¿Perdiste tu contraseña?</a>
                        <a href="#">¿No tienes Cuenta? Registrate</a>
                    </div>
                </div>
               
            </div>
        </div>
</body>
</html>
