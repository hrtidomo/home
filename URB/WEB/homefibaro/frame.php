<?php
session_start();
//if(strcmp($_SESSION['UserData'],"SI")!=0)
//{
//header("location:login.php");
//}
?>
<html>
<head>
<meta charset="utf-8">
 <title>HTML</title>
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<style>
	.in {
    float: left;
    background: #0f4c75;
    border-right: 1px solid white;
    border-top: 1px solid white;
}

.contenedorprincipal {
    display: grid;
    width: 100%;
    height: 100%;
    background-color: #000000;	
}


.contenedor {
    margin: auto;
    width: 1480px;
    height: 800px;
}
.flat {
    
    width: 835px;
    height: 800px;
    position: relative;
    background-repeat: no-repeat, no-repeat;
	
	
}
.mando {
    width: 640px;
    height: 320px;
}	

.webcam {
    width: 640px;
    height: 480px;
	
}


.btnshort {
  background-color: #606060; 
  border: none; 
  color: white; 
  padding: 10px 10px; 
  font-size: 16px; 
  cursor: pointer;
  border-radius: 5px;
  width: 40px;
  height: 40px; 
}
.btnshort:hover {
  background-color: #404040;
}
.btnshort:active {
  background-color:  #202020;
}

.btnshorttemp {
  background-color: #606060; 
  border: none; 
  color: white; 
  padding: 5px 5px; 
  font-size: 16px; 
  cursor: pointer;
  border-radius: 5px;
  width: 90px;
  height: 40px; 
}
.btnshorttemp:hover {
  background-color: #404040;
}
.btnshorttemp:active {
  background-color:  #202020;
}



/************ */
/* ultimo estado actulizado 
/************* */

/*****************/
/* TEMP           */
/*****************/
.divaaa {
  position: absolute;
  top:  5%; 
  left: 1%;
}
.divaba {
  position: absolute;
  top:  10%; 
  left: 1%;
}
.divaca {
  position: absolute;
  top:  15%; 
  left: 1%;
}
.divada {
  position: absolute;
  top:  20%; 
  left: 1%;
}
/********* */
/* ONOFF   */
/********* */
.divaad {
  position: absolute;
  top:  45%; 
  left: 1%;
}
.divabd {
  position: absolute;
  top:  50%; 
  left: 1%;
}
.divacd {
  position: absolute;
  top:  55%; 
  left: 1%;
}
.divadd {
  position: absolute;
  top:  60%; 
  left: 1%;
}

/* EYE  */
.divaae {
  position: absolute;
  top:  5%; 
  left: 3%;
}
.divabe {
  position: absolute;
  top:  10%; 
  left: 3%;
}
.divace {
  position: absolute;
  top:  15%; 
  left: 3%;
}
.divade {
  position: absolute;
  top:  20%; 
  left: 3%;
}

/******* */
/* FLAT  */
/******* */
.divaaf {
  position: absolute;
  top:  45%; 
  left: 3%;
}
.divabf {
  position: absolute;
  top:  50%; 
  left: 3%;
}
.divacf {
  position: absolute;
  top:  55%; 
  left: 3%;
}
.divadf {
  position: absolute;
  top:  60%; 
  left: 3%;
}

.divaag {
  position: absolute;
  top:  5%; 
  left: 5%;
}
.divabg {
  position: absolute;
  top:  10%; 
  left: 5%;
}
.divacg {
  position: absolute;
  top:  15%; 
  left: 5%;
}
.divadg {
  position: absolute;
  top:  20%; 
  left: 5%;
}
/********** */
/* Camaras  */
/********** */
.divaaw {
  position: absolute;
  top:  45%; 
  left: 5%;
}
.divabw {
  position: absolute;
  top:  50%; 
  left: 5%;
}
.divacw {
  position: absolute;
  top:  55%; 
  left: 5%;
}
.divadw {
  position: absolute;
  top:  60%; 
  left: 5%;
}

.divaew {
  position: absolute;
  top:  65%; 
  left: 5%;
}
.divafw {
  position: absolute;
  top:  70%; 
  left: 5%;
}
.divagw {
  position: absolute;
  top:  75%; 
  left: 5%;
}
.divahw {
  position: absolute;
  top:  80%; 
  left: 5%;
}

/********** */
/* TOMAS AIRE  */
/********** */
.divaaz {
  position: absolute;
  top:  5%; 
  left: 7%;
}
.divabz {
  position: absolute;
  top:  10%; 
  left: 7%;
}
.divacz {
  position: absolute;
  top:  15%; 
  left: 7%;
}
.divadz {
  position: absolute;
  top:  20%; 
  left: 7%;
}




</style>
<script type="text/javascript" src="./varfile.js"></script>
<script>
//**********************************************************************************
// ACTUALIZA LOS CAMBIOS DE ESTADOS EN LAS DIFERENTES WEB
//**********************************************************************************
//*case 'a': Actualiza los estados  temp
//*case 'd': Actualiza los estados onofff
//*case  'f': 
//*case  'p':
//*case 'w': Actualiza los estados cam
//**********************************************************************************
//var idsession;
//const ws = new WebSocket("ws://192.168.200.127:8080");
ws.addEventListener("open", () =>{
	
});

ws.addEventListener('message', function (event) {
	const receivedData = JSON.parse(event.data);
	action=receivedData.action; 
	id=receivedData.value; 
	plane=receivedData.plane; 
	if (idsession==id)
	{
			
	}
	else
	{
	switch (action) {
		case "a":
		moduletempwindsocked('xxf'); // recargar los sensores temp
		break;
		case "d":
		moduleonoffsocked('xxf'); //recarga lo interruptores onoff
		break; 
		case "f":
		moduleflatwindsocked(plane); //recarga los planos
		break; 
		case "w":
		webcamxwinsocked('xxf'); //recarga  las cams
		break;
		case "x":
		 idsession=receivedData.value; // recarga los planos 
		 statex('xxf');
		break;
 
		}
	}
});

//**********************************************************************************
//CARGA TODOS LOS DISPOSITIVOS .
//**********************************************************************************
//*case 'a': Posiciona los sensores temperatura  moduletempwindsocked 332
//*case 'a': Posiciona los sensores temperatura  moduletempbutton 390
//*case 'd': Posiciona los sensores de onofff   moduleonoffsocked  444
//*case 'd': Posiciona los sensores de onofff  moduleonoffbutton     484
//*case 'f': Posiconas las lupas moduleflatwindsocked  630
//*case 'f': Posiconas las lupas moduleflatwindbutton   718
//*case 'p': Carga el plano principal
//*case 'w': Posiconas lo se sensores de camara  webcamxwinsocked
//*case 'w': Posiconas lo se sensores de camara  webcamxbutton

//**********************************************************************************
//**********************************************************************************
//*Funcionalidades de Modulos
//**********************************************************************************
//**********************************************************************************
//*ESTA FUNCION CARGA LAS TEMP
//**********************************************************************************
//* fa-stop stop
//* fa-bed  cama
//* fa-sun-o sol
//**********************************************************************************

function moduletempwindsocked(plane) {
	var xmlhttp = new XMLHttpRequest();
	var url = "http://"+wwwapache+"/apihome/APIHOMEACTION.php?iphome="+apihomefibaro+"&user=admin&password=admin&module=&action=temp&flat="+plane+"&userx";
	xmlhttp.onreadystatechange = function() {
    		if (this.readyState == 4 && this.status == 200) {
		var myArr = JSON.parse(this.responseText);        	
		for (var i = 0; i < myArr.items.length; i++)
	        	 {
				airconditioner =myArr.items[i].airconditioner;	
				module=myArr.items[i].module;
				action=myArr.items[i].action;
				oldtempA=document.getElementById(module).innerHTML.slice(0,document.getElementById(module).innerHTML.length-5);
				oldtempB=document.getElementById(module).innerHTML.slice(-5);
				  x=  module.slice(2,3)
				switch (x){
						case "a":
							if (airconditioner == "tempbed")
								{
								innertemp='<i class="fa fa-thermometer-empty"></i> <i class="fa fa-bed "></i>'
								}
							else if (airconditioner == "tempsun")
								{
								innertemp='<i class="fa fa-thermometer-empty"></i>  <i class="fa fa-sun-o"></i>'
								}
							else if (airconditioner == "tempstop")
								{
								innertemp='<i class="fa fa-thermometer-empty"></i>  <i class="fa fa-stop"></i>'
								}
								document.getElementById(module).innerHTML=innertemp +' '+action; 
							let buttotempbutton = document.getElementById(module);
							if  (myArr.items[i].airconditionerstatu == "grey")
								{
								buttotempbutton.style.backgroundColor= "#606060";  
								}
							else if  (myArr.items[i].airconditionerstatu == "green")
								{
								buttotempbutton.style.backgroundColor= "green";  
								}
							else if  (myArr.items[i].airconditionerstatu == "red")
								{
								buttotempbutton.style.backgroundColor= "red";  
								}       
				break;
				case "z":
						
							let buttongates = document.getElementById(module);
							if (action=='turnOff')			
									{		
									buttongates.style.backgroundColor= "#404040";
									document.getElementById(module).value="turnOn"
									document.getElementById(module).hidden = "";
									}
							else if (action=='turnOn')
									{
									buttongates.style.backgroundColor= "red";
									document.getElementById(module).value="turnOff";
									document.getElementById(module).hidden = "";
									}
							else 
									{
									alert(state+'EN EL MODULO  '+modulename+" en "+nameroom);
									 document.getElementById(module).hidden = "hidden";
									}
				break;
						}
			
			}
		}
		else
		{
		
		}
	};
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
	
}

//**********************************************************************************
//*ESTA FUNCION CARGA LAS TEMP Y CAMBIA LOS ESTADOS
//**********************************************************************************
//* fa-stop stop
//* fa-bed  cama
//* fa-sun-o sol
//**********************************************************************************
function moduletempbutton(idmodule) {
	oldtemp=document.getElementById(idmodule).innerHTML;
	if  (oldtemp.includes('<i class="fa fa-stop"></i>'))
	{
		estadotemp='tempstop'; 
	}
	else if  (oldtemp.includes('<i class="fa fa-sun-o"></i>'))
	{	
		estadotemp='tempsun';	
	}
	else if  (oldtemp.includes('<i class="fa fa-bed "></i>'))
	{
		estadotemp='tempbed';	
	}
	var xmlhttp = new XMLHttpRequest();
	var url = "http://"+wwwapache+"/apihome/APIHOMEACTION.php?iphome="+apihomefibaro+"&user=admin&password=admin&module="+idmodule+"&action="+estadotemp+"&flat=&userx";
	xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
	var myArr = JSON.parse(this.responseText);        	
	document.getElementById(idmodule).innerHTML=myArr.items[0].airconditionerhtml+" "+myArr.items[0].action;
	let buttotempbutton = document.getElementById(idmodule);
	if  (myArr.items[0].airconditionerstatu == "grey")
	{
		buttotempbutton.style.backgroundColor= "#606060";  
	}
	else if  (myArr.items[0].airconditionerstatu == "green")
	{
	buttotempbutton.style.backgroundColor= "green";  
	}
	else if  (myArr.items[0].airconditionerstatu == "red")
	{
	buttotempbutton.style.backgroundColor= "red";  
	}	
	 const data = { action: 'a', value: idsession,plane:'' };
     const serializedData = JSON.stringify(data);
    ws.send(serializedData);
	}
	else
	{
		
	}
 
	};
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
	
}

//**********************************************************************************
//ESTA FUNCION CAMBIA EL ESTADO DE ON A OFF 
//**********************************************************************************
function moduleonoffsocked(plane) {
	var xmlhttp = new XMLHttpRequest();
	var url = "http://"+wwwapache+"/apihome/APIHOMEACTION.php?iphome="+apihomefibaro+"&user=admin&password=admin&module=&action=turn&flat="+plane+"&userx";
	xmlhttp.onreadystatechange = function() {
    		if (this.readyState == 4 && this.status == 200) {
        	var myArr = JSON.parse(this.responseText);
		for (var i = 0; i < myArr.items.length; i++)
	        	 {
		         state=myArr.items[i].action; 
		         module=myArr.items[i].module;
                 modulename=myArr.items[i].modulename;
                 nameroom=myArr.items[i].nameroom; 
		        let element = document.getElementById(module);
				let elementStyle = window.getComputedStyle(element);
				
				if (state =='turnOn')
		           { 
					element.style.backgroundColor= "red";  
				   }
			   else if (state=='turnOff')
				  {
			   element.style.backgroundColor= "#404040"
				  }
				else
				 {
				alert(state+'EN EL MODULO  '+modulename+" en "+nameroom);
				element.style.backgroundColor= "black";  
				 }
			 }
	    
		}
		
	};
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

//**********************************************************************************
//ESTA FUNCION CAMBIA EL ESTADO DE ON A OFF 
//**********************************************************************************
function moduleonoffbutton(idmodule) {
	let element = document.getElementById(idmodule);
	let elementStyle = window.getComputedStyle(element);
	let elementColor = elementStyle.getPropertyValue('background-color');
		if (elementColor =="rgb(64, 64, 64)")
		{ 
		onoff="turnOn"
		}
		else
		{
		 onoff="turnOff"						
		}
	var xmlhttp = new XMLHttpRequest();
	var url = "http://"+wwwapache+"/apihome/APIHOMEACTION.php?iphome="+apihomefibaro+"&user=admin&password=admin&module="+idmodule+"&action="+onoff+"&flat=&userx";
	xmlhttp.onreadystatechange = function() {
    		if (this.readyState == 4 && this.status == 200) {
        	var myArr = JSON.parse(this.responseText);
			state=myArr.items[0].action; 
			module=myArr.items[0].module;
            modulename=myArr.items[0].modulename;
            nameroom=myArr.items[0].nameroom; 
			if (state =='turnOn')
			{ 
			element.style.backgroundColor= "red";  
			}
			else if (state=='turnOff')
			{
			 element.style.backgroundColor= "#404040"
			}
			else
			{
			alert(state+'EN EL MODULO  '+modulename+" en "+nameroom);
			element.style.backgroundColor= "black";  
			}
			const data = { action: 'd', value: idsession,plane:'' };
			const serializedData = JSON.stringify(data);
			ws.send(serializedData);
			}
		
	};
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}




//**********************************************************************************
//ESTA FUNCION DEVUELBE EL PLANO DE UNA PARTE DE LA CASA
//**********************************************************************************
//*case 'a': Posiciona los sensores temperatura
//*case 'd': Posiciona los sensores de onofff
//*case 'f': Posiconas las lupas
//*case 'w': Posiconas lo se sensores de camara			
//**********************************************************************************
function moduleflatwindsocked(idmodule) {

statex(idmodule);

}
//**********************************************************************************
//ESTA FUNCION DEVUELBE EL PLANO DE UNA PARTE DE LA CASA
//**********************************************************************************
//*case 'a': Posiciona los sensores temperatura
//*case 'd': Posiciona los sensores de onofff
//*case 'f': Posiconas las lupas
//*case 'w': Posiconas lo se sensores de camara			
//**********************************************************************************
function moduleflatbutton(idmodule) {

pscar="hola";
statex(idmodule);
const data = { action: 'f', value: idsession,plane:idmodule};
const serializedData = JSON.stringify(data);
ws.send(serializedData);


}


//**********************************************************************************
//ESTA FUNCION DEVUELBE EL PLANO DE UNA PARTE DE LA CASA
//**********************************************************************************
//*case 'a': Posiciona los sensores temperatura
//*case 'd': Posiciona los sensores de onofff
//*case 'f': Posiconas las lupas
//*case 'g' Posiciona las lupas devolucion
//*case 'w': Posiconas lo se sensores de camara			
//**********************************************************************************
function statex(flat) {
	let MathScore = [
    ['aaa','1%','5%'],
	['aba','1%','10%'],
	['aca','1%','15%'],
	['ada','1%','20%'],
	['aad','1%','45%'],
	['abd','1%','50%'],
	['acd','1%','55%'],
	['add','1%','60%'],
	['aae','3%','5%'],
	['abe','3%','10%'],
	['ace','3%','15%'],
	['ade','3%','20%'],
	['aaf','3%','45%'],
	['abf','3%','50%'],
	['acf','3%','55%'],
	['adf','3%','60%'],
	['aag','5%','5%'],
	['abg','5%','10%'],
	['acg','5%','15%'],
	['adg','5%','20%'],
	['aaw','5%','45%'],
	['abw','5%','50%'],
	['acw','5%','55%'],
	['adw','5%','60%'],
	['aew','5%','65%'],
	['afw','5%','70%'],
	['agw','5%','75%'],
	['ahw','5%','80%'],
	['aaz','7%','5%'],
	['abz','7%','10%'],
	['acz','7%','15%'],
	['adz','7%','20%']
	
];
for (const element of MathScore) {
	let divtemp = document.getElementById('div'+element[0]);
	divtemp.style.top= element[2]; 
	divtemp.style.left= element[1]; 
	divtemp.style.display= "block";  
	let temp = document.getElementById(element[0]);	
	temp.hidden = "hidden";	
}
  var xmlhttp = new XMLHttpRequest();
	var url = "http://"+wwwapache+"/apihome/APIHOMEACTION.php?iphome="+apihomefibaro+"&user=admin&password=admin&module=&action=state&flat="+flat+"&userx";
	xmlhttp.onreadystatechange = function() {
    		if (this.readyState == 4 && this.status == 200) {//read
		var myArr = JSON.parse(this.responseText);
	  for (var i = 0; i < myArr.items.length; i++) {//for
      state=myArr.items[i].action;
      module=myArr.items[i].module;
      modulename=myArr.items[i].modulename;
      nameroom=myArr.items[i].nameroom;
      positionx=myArr.items[i].positionx;
      positiony=myArr.items[i].positiony;
      action=myArr.items[i].action;
      x=  module.slice(2,3)
	switch (x) 
	{//sw
	case 'a':	//TEMP	 POSICIONA LOS SENSORES TEMPERATURA
	action=myArr.items[i].action;
	airconditioner =myArr.items[i].airconditioner;
	airconditionerhtml =myArr.items[i].airconditionerhtml;
	let divtemp = document.getElementById('div'+module);
	divtemp.style.top= positionx; 
	divtemp.style.left= positiony; 
	divtemp.style.display= "block";  
	document.getElementById(module).hidden = "";
	innertemp=document.getElementById(module).innerHTML;	
	document.getElementById(module).innerHTML=airconditionerhtml +' '+action;        
	let buttotempbutton = document.getElementById(module);
	if  (myArr.items[i].airconditionerstatu == "grey")
		{
		buttotempbutton.style.backgroundColor= "#606060";  
		}
	else if  (myArr.items[i].airconditionerstatu == "green")
		{
		buttotempbutton.style.backgroundColor= "green";  
		}
	else if  (myArr.items[i].airconditionerstatu == "red")
		{
		buttotempbutton.style.backgroundColor= "red";  
		}       
	break;
	case 'd':	//ONOFF POSICIONA LOS SENSORES ONOFF
			let divonoff = document.getElementById('div'+module);
			divonoff.style.top= positionx; 
			divonoff.style.left= positiony; 
			divonoff.style.display= "block";  		
				let buttononoff = document.getElementById(module);
			if (state=='turnOff')			
					{		
					buttononoff.style.backgroundColor= "#404040";
					document.getElementById(module).value="turnOn"
					document.getElementById(module).hidden = "";
					}
			else if (state=='turnOn')
					{
					buttononoff.style.backgroundColor= "red";
					document.getElementById(module).value="turnOff";
					document.getElementById(module).hidden = "";
					}
			else 
					{
					alert(state+'EN EL MODULO  '+modulename+" en "+nameroom);
					 document.getElementById(module).hidden = "hidden";
					}
		break;
        case 'f': 	//FLATICON  POSICIONA LAS LUPAS EN UN MAPA
			if (module==flat)
			{
			idroomout=myArr.items[i].idroomout; 
			file=myArr.items[i].file; 
			document.getElementById('xplano').src = file;	
			if (idroomout!='xxf')
				{
				let divflat = document.getElementById('div'+idroomout);	
				divflat.style.top= positionx; 
				divflat.style.left= positiony; 
				divflat.style.display= "block"; 
				document.getElementById(idroomout).hidden = "";
				}
			}
			else
			{	
			let divflat = document.getElementById('div'+module);
      	    divflat.style.top= positionx; 
			divflat.style.left= positiony; 
			divflat.style.display= "block"; 
			document.getElementById(module).hidden = "";
			}
			break;
		case 'w': //WEVCAM POSICIONA LOS SESORES WEBCAM
			let element = document.getElementById(module);
			let elementStyle = window.getComputedStyle(element);
			let elementColor = elementStyle.getPropertyValue('background-color');
			
			activate=myArr.items[i].activate;
			url=myArr.items[i].url;
			if (activate =='false')
				{
				let buttonwebcams = document.getElementById(module);
				buttonwebcams.style.backgroundColor= "#606060";  
				} 
			else if  (activate =='true')
				{
				let buttonwebcams = document.getElementById(module);
				buttonwebcams.style.backgroundColor= "red"; 
				if  (url!=document.getElementById('webcam').src)
					{
					document.getElementById('webcam').src = url;		
					}
				}
			let divcam = document.getElementById('div'+module);
			divcam.style.top= positionx; 
			divcam.style.left= positiony; 
			divcam.style.display= "block"; 
			document.getElementById(module).hidden = "";
			break;
			case 'z': // Portones
			let divgates = document.getElementById('div'+module);
			divgates.style.top= positionx; 
			divgates.style.left= positiony; 
			divgates.style.display= "block";  		
			let buttongates = document.getElementById(module);
			if (state=='turnOff')			
					{		
					buttongates.style.backgroundColor= "#404040";
					document.getElementById(module).value="turnOn"
					document.getElementById(module).hidden = "";
					}
			else if (state=='turnOn')
					{
					buttongates.style.backgroundColor= "red";
					document.getElementById(module).value="turnOff";
					document.getElementById(module).hidden = "";
					}
			else 
					{
					alert(state+'EN EL MODULO  '+modulename+" en "+nameroom);
					 document.getElementById(module).hidden = "hidden";
					}
			break;
	}//sw
    }//for
    }//read
	};
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}
//**********************************************************************************
//ESTA FUNCION CAMBIA LA CAM A VISUALIZAR 
//**********************************************************************************
function webcamxwinsocked(plane) {
	var cerrojo="NO";
	var xmlhttp = new XMLHttpRequest();
	var url = "http://"+wwwapache+"/apihome/APIHOMEACTION.php?iphome="+apihomefibaro+"&user=admin&password=admin&module=&action=cam&flat="+plane+"&userx";
	xmlhttp.onreadystatechange = function() {
    		if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
		    for (var i = 0; i < myArr.items.length; i++)
	        	 {
				 module=myArr.items[i].module;
				 positionx=myArr.items[i].positionx;
			  	positiony=myArr.items[i].positiony;
     			let element = document.getElementById(module);
				let elementStyle = window.getComputedStyle(element);
				let elementColor = elementStyle.getPropertyValue('background-color');
				if (elementColor =="rgb(255, 0, 0)"  )
					{
					if  (cerrojo=="NO")
						{
						idwebcam="";
						document.getElementById('webcam').src = "";	
						}
					}
			  activate=myArr.items[i].activate;
			  url=myArr.items[i].url;
			 if (activate =='false')
					{
					let buttonwebcams = document.getElementById(module);
					buttonwebcams.style.backgroundColor= "#606060";  
					} 
			else if  (activate =='true')
					{
					let buttonwebcams = document.getElementById(module);
					buttonwebcams.style.backgroundColor= "red"; 
					document.getElementById('webcam').src = url;		
					cerrojo="SI";
					}
			let divcam = document.getElementById('div'+module);
			divcam.style.top= positionx; 
			divcam.style.left= positiony; 
			divcam.style.display= "block"; 
			document.getElementById(module).hidden = "";
		   }
	    
		}
	};
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}
//**********************************************************************************
//ESTA FUNCION CAMBIA LA CAM A VISUALIZAR 
//**********************************************************************************
function webcamxbutton(idwebcam) {
	let element = document.getElementById(idwebcam);
	let elementStyle = window.getComputedStyle(element);
	let elementColor = elementStyle.getPropertyValue('background-color');
	if (elementColor =="rgb(255, 0, 0)")
	{
		idwebcam="";
		document.getElementById('webcam').src = "";	
	}
	var xmlhttp = new XMLHttpRequest();
	var url = "http://"+wwwapache+"/apihome/APIHOMEACTION.php?iphome="+apihomefibaro+"&user=admin&password=admin&module="+idwebcam+"&action=camon&flat=&userx";
	xmlhttp.onreadystatechange = function() {
    		if (this.readyState == 4 && this.status == 200) {
        	var myArr = JSON.parse(this.responseText);
			for (var i = 0; i < myArr.items.length; i++) {//for
      		url=myArr.items[i].url;
			preset=myArr.items[i].preset;
			positionx=myArr.items[i].positionx;
			positionY=myArr.items[i].positionY;
			module=myArr.items[i].module;
			activate=myArr.items[i].activate;
			if (activate =='false')
			{
			let buttonwebcams = document.getElementById(module);
			buttonwebcams.style.backgroundColor= "#606060";  
			} 
			else if  (activate =='true')
			{
			if (document.getElementById('webcam').src != url)
				{
				document.getElementById('webcam').src = url;		
				}
				let buttonwebcams = document.getElementById(module);
				buttonwebcams.style.backgroundColor= "red"; 
			}
			}//FOR
			const data = { action: 'w', value: idsession,plane:''};
			const serializedData = JSON.stringify(data);
			ws.send(serializedData);
			}
	};
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

</script>
<body  onload="">
	<div class='contenedorprincipal'>
		<div class='contenedor'>
    			<div class='in flat' id="divflat" >
    				
				<! -- TEMP --!>				 	
						<div class='divaaa' id="divaaa"   >   
							<button   class="btnshorttemp"  onclick="moduletempbutton('aaa')"    id="aaa"     ><i class="fa fa-thermometer-empty"></i> <i class="fa fa-stop"></i> </button>
		   				</div>
						<div class='divaba' id="divaba"   >   
							<button   class="btnshorttemp"  onclick="moduletempbutton('aba')"    id="aba"     ><i class="fa fa-thermometer-empty"></i> <i class="fa fa-stop"></i></button>
		   				</div>				
		   				<div class='divaca' id="divaca"   >   
							<button   class="btnshorttemp"  onclick=""    id="aca"     ><i class="fa fa-thermometer-empty"></i></button>
		   				</div>				
		   				<div class='divada' id="divada"   >   
							<button   class="btnshorttemp"  onclick=""    id="ada"     ><i class="fa fa-thermometer-empty"></i></button>
		   				</div>
				<! -- ONOFF --!>
					   <div class='divaad' id="divaad"  >   
						<button   class="btnshort"  onclick="moduleonoffbutton('aad')"    ondblclick="modulexx('aad')" id="aad"     ><i class="fa fa-lightbulb-o"></i></button>
					   </div>
					   <div class='divabd' id="divabd"  >   
						<button   class="btnshort"  onclick="moduleonoffbutton('abd')"    ondblclick="modulexx('abd')" id="abd"     ><i class="fa fa-lightbulb-o"></i></button>
					   </div>	
					   <div class='divacd' id="divacd"  >   
						<button   class="btnshort"  onclick="moduleonoffbutton('acd')"    ondblclick="modulexx('acd')" id="acd"     ><i class="fa fa-lightbulb-o"></i></button>
					   </div>	
					   <div class='divadd' id="divadd"  >   
						<button   class="btnshort"  onclick="moduleonoffbutton('add')"    ondblclick="modulexx('add')" id="add"     ><i class="fa fa-lightbulb-o"></i></button>
					   </div>	
				   <! -- EYE --!>
				    	   <div class='divaae' id="divaae"  >   
					   	<button   class="btnshort"  onclick=""    ondblclick="" id="aae"     ><i class="fa fa-eye"></i></button>
					   </div>
					   <div class='divabe' id="divabe"  >   
						<button   class="btnshort"  onclick=""    ondblclick="" id="abe"     ><i class="fa fa-eye"></i></button>
					   </div>	
					   <div class='divace' id="divace"  >   
						<button   class="btnshort"  onclick=""    ondblclick="" id="ace"     ><i class="fa fa-eye"></i></button>
					   </div>	
					   <div class='divade' id="divade"  >   
						<button   class="btnshort"  onclick=""    ondblclick="" id="ade"     ><i class="fa fa-eye"></i></button>
					   </div>

				   <! -- FLAT --!>
					   <div class='divaaf' id="divaaf"  >   
						<button   class="btnshort"  onclick="moduleflatbutton('aaf')"    id="aaf"     ><i class="fa fa-search-plus"></i></button>
					   </div>
					   <div class='divabf' id="divabf"  >   
						<button   class="btnshort"  onclick="moduleflatbutton('abf')"    id="abf"     ><i class="fa fa-search-plus"></i></button>
					   </div>
					   <div class='divacf' id="divacf"  >   
						<button    class="btnshort"  onclick="moduleflatbutton('acf')"    id="acf"     ><i class="fa fa-search-plus"></i></button>
					   </div>
					   <div class='divadf' id="divadf"  >   
						<button   class="btnshort"  onclick="moduleflatbutton('adf')"    id="adf"     ><i class="fa fa-search-plus"></i></button>
					   </div>	
					 
					   <div class='divaag' id="divaag"  >   
						<button   class="btnshort"  onclick="moduleflatbutton('xxf')"    id="aag"     ><i class="fa fa-search-minus"></i></button>
					   </div>
					   <div class='divabg' id="divabg"  >   
						<button   class="btnshort"  onclick="moduleflatbutton('xxf')"    id="abg"     ><i class="fa fa-search-minus"></i></button>
					   </div>
					   <div class='divacg' id="divacg"  >   
						<button   class="btnshort"  onclick="moduleflatbutton('xxf')"    id="acg"     ><i class="fa fa-search-minus"></i></button>
					   </div>
					   <div class='divadg' id="divadg"  >   
						<button   class="btnshort"  onclick="moduleflatbutton('xxf')"    id="adg"     ><i class="fa fa-search-minus"></i></button>
					   </div>	
				 
				   <! -- CAM --!>
					   <div class='divaaw' id="divaaw"   >   
						<button  class="btnshort" onclick="webcamxbutton('aaw')" id="aaw" ><i class="fa fa-video-camera"></i></button>
					   </div>
					   <div class='divabw' id="divabw"   >   
						<button  class="btnshort" onclick="webcamxbutton('abw')" id="abw" ><i class="fa fa-video-camera"></i></button>
					   </div>
					   <div class='divacw' id="divacw"   >   
						<button   class="btnshort" onclick="webcamxbutton('acw')" id="acw" ><i class="fa fa-video-camera"></i></button>
					   </div>
					   <div class='divadw' id="divadw"   >   
						<button   class="btnshort" onclick="webcamxbutton('adw')" id="adw" ><i class="fa fa-video-camera"></i></button>
					   </div>
					   
					   <div class='divaew' id="divaew"   >   
						<button  class="btnshort" onclick="webcamxbutton('aew')" id="aew" ><i class="fa fa-video-camera"></i></button>
					   </div>
					   <div class='divafw' id="divafw"   >   
						<button  class="btnshort" onclick="webcamxbutton('afw')" id="afw" ><i class="fa fa-video-camera"></i></button>
					   </div>
					   <div class='divagw' id="divagw"   >   
						<button   class="btnshort" onclick="webcamxbutton('agw')" id="agw" ><i class="fa fa-video-camera"></i></button>
					   </div>
					   <div class='divahw' id="divahw"   >   
						<button   class="btnshort" onclick="webcamxbutton('ahw')" id="ahw" ><i class="fa fa-video-camera"></i></button>
					   </div>
						<! -- PORTONES DEL AIRE  --!>
					   <div class='divaaz' id="divaaz"   >   
						<button  class="btnshort" onclick="" id="aaz" ><i class="fa fa-rss"></i></button>
					   </div>
					   <div class='divabz' id="divabz"   >   
						<button  class="btnshort" onclick="" id="abz" ><i class="fa fa-rss"></i></button>
					   </div>
					   <div class='divacz' id="divacz"   >   
						<button   class="btnshort" onclick="" id="acz" ><i class="fa fa-rss"></i></button>
					   </div>
					   <div class='divadz' id="divadz"   >   
						<button   class="btnshort" onclick="" id="adz" ><i class="fa fa-rss"></i></button>
					   </div>




					   <img id="xplano" src="">
				   	
			</div>
			<div class='in mando'  >
			<iframe src="modulergbw.html" height="100%" width="100%"  name="module" id="module"  ></iframe></p>	    			
			</div>
        		<div class='in webcam'>
			<iframe src="" height="480" width="640" name="webcam" id="webcam"  ></iframe>   			
			</div> 
		</div>   
	</div>
   			
   
</body>
</html>
