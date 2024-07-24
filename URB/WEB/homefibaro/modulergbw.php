<?php
$room= $_GET['room'];
$location= $_GET['location'];
?>
<!DOCTYPE html>
<html lang="es">
<head>
<meta name="author" content="Oscar Jose Vidart  Pach" />
<meta name="copyright" content="Crichel  De La  Rosa Tibrey" />
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<script type="text/javascript" src="./varfile.js"></script>
<script>


</script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
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
    max-width: 420px;
    width: 100%;
}

#login {
    width: 100%;
    padding: 10px 10px;
    background-color: #cbe0ee;
    -webkit-box-shadow: 0px 0px 5px 5px rgba(0,0,0,0.15);
    -moz-box-shadow: 0px 0px 5px 5px rgba(0,0,0,0.15);
    box-shadow: 0px 0px 5px 5px rgba(0,0,0,0.15);
    border-radius: 3px 3px 3px 3px;
    -moz-border-radius: 3px 3px 3px 3px;
    -webkit-border-radius: 3px 3px 3px 3px;
    box-sizing: border-box;
}

.table {
  width:98%; 
  border-collapse: collapse;
  text-align:center;
  border-collapse: collapse;
  border: black 1px solid;

}
td, th {
  border: black 1px solid;
}

.btnlong {
  background-color: #606060; 
  border: none; 
  color: white; 
  padding: 1px 1px; 
  font-size: 16px; 
  cursor: pointer;
  border-radius: 5px;
  width: 100%;
  height: 100%; 
}

/* Darker background on mouse-over */
.btnlong:hover {
  background-color: #404040;
}

.btnlong:active {
  background-color:  #202020;
}






.my-buttononoff {
  padding: 1px 1px;
  width: 100%;
  height: 100%;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.my-buttononoff:hover {
  background-color: #45a049;
}
.my-buttononoff:active {
  background-color: #3e8e41;
}


</style> 	

</head>

<body  onload="statex()"  >
<div id="contenedor">
      <div id="central">
	<div id="login">
          <table class="table"> 
            <tr>
            <td COLSPAN="2"><button class="btnlong"><i class="fa fa-video-camera"></i> <?php echo  $room;  ?></button></td>
            </tr> 
            <tr>
            <td td COLSPAN="2" ><?php echo  $location;  ?> </td>
            </tr>
	    <tr>
            <td>Set Color</td>
            <td><input type="color" value="#ff0000" /></td>
            </tr>
	    <tr>
            <td>Set Value</td>
            <td><input type="range" id="vol" name="vol" min="0" max="50"></td>
            </tr>
	    <tr>
            <td>startLevelDecrease</td>
            <td><input type="range" id="vol" name="vol" min="0" max="50"></td>
            </tr>
	    <tr>
            <td>startLevelIncrease</td>
            <td><input type="range" id="vol" name="vol" min="0" max="50"></td>
            </tr>
	    <tr>
            <td>startProgram</td>
            <td><select><option value="0">Select car:</option><option value="1">Disco</option><option value="12">Suave</option>
	   </select>
            </td>
            </tr>
	    <tr>
            <td>stopLevelChange</td>
            <td><input type="range" id="vol" name="vol" min="0" max="50"></td>
            </tr>
	     
        
</table>
        </div>	
      </div>
</div>

</body>
</html>
