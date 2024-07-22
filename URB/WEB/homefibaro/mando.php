<?php
session_start();
if(strcmp($_SESSION['UserData'],"SI")!=0)
{
header("location:login.php");
}
?>
<!DOCTYPE html>
<html lang="es">


<head>
  <meta charset="utf-8">
  <title>HTML</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
<script type="text/javascript" src="./varfile.js"></script>
<script>

function actiononoff(modulo) {
	//et element = document.getElementById('buttonon');
	//let elementStyle = window.getComputedStyle(element);
	//let elementColor = elementStyle.getPropertyValue('color');
  	let buttononoff = document.getElementById(modulo);
	buttononoffname = document.getElementById(modulo).value
	if (buttononoffname=='turnOn')			
	{		
	buttononoff.style.backgroundColor= "red";
	document.getElementById(modulo).value="turnOff"
	onoff="turnOn"	
	}
	else
	{
	buttononoff.style.backgroundColor= "#4CAF50";	
	document.getElementById(modulo).value="turnOn"
	onoff="turnOff"	
	}
	var xmlhttp = new XMLHttpRequest();
	var url = "http://"+wwwapache+"/apihome/APIHOMEACTION.php?iphome=192.168.200.111&user=admin&password=admin&module="+modulo+"&action="+onoff;
	xmlhttp.onreadystatechange = function() {
    		if (this.readyState == 4 && this.status == 200) {
        	var myArr = JSON.parse(this.responseText);
		//document.getElementById("estado").innerHTML = myArr.items[0].action;       		
		}
	};
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}
function statex() {
  var xmlhttp = new XMLHttpRequest();
	var url = "http://"+wwwapache+"/apihome/APIHOMEACTION.php?iphome=192.168.200.111&user=admin&password=admin&module=&action=state";
	xmlhttp.onreadystatechange = function() {
    		if (this.readyState == 4 && this.status == 200) {
        	
		var myArr = JSON.parse(this.responseText);
	  for (var i = 0; i < myArr.items.length; i++) {
      state=myArr.items[i].action;
      module=myArr.items[i].module;
   

    let buttononoff = document.getElementById(module);
		if (state=='turnOff')			
			{		
			buttononoff.style.backgroundColor= "#4CAF50";
			document.getElementById(module).value="turnOn"
			}
			else
			{
			buttononoff.style.backgroundColor= "red";	
			document.getElementById(module).value="turnOff"
			} 

    }
    }
	};
	xmlhttp.open("GET", url, true);
	xmlhttp.send();


}
function closex() {
  window.location.href="./logout.php";
}

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
            <td COLSPAN="2"><button class="btnlong"><i class="fa fa-video-camera"></i>  COMEDOR</button></td>
            </tr> 
            <tr>
            <td><input type="button" class="my-buttononoff"  id="abd"  onclick="actiononoff('abd')" value="turnOn" /></td>
            <td>Lampara de pie </td>
            </tr> 
            <tr>
            <td COLSPAN="2"><button class="btnlong"><i class="fa fa-video-camera"></i>  HABITACION</button></td>
            </tr> 
            <tr>
            <td><input type="button" class="my-buttononoff" id="aad" onclick="actiononoff('aad')"   value="turnOn" /></td>
            <td>Luces de colores del Cabezero</td>
            </tr>
            <tr>
            <td COLSPAN="2"><button class="btnlong"  onclick="statex()" ><i class="fa fa-spinner"></i>  LOAD</button></td>
            </tr> 
            <tr>
            <td COLSPAN="2"><button class="btnlong"  onclick="closex()" ><i class="fa fa-sign-out"></i>  EXIT</button></td>
            </tr> 
          </table>
        </div>	
      </div>
</div>

</body>
</html>
