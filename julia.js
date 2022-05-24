var canvas = document.getElementById("canvas")
var overlay_canvas = document.getElementById("overlay_canvas");
var moveX = 0.0, moveY = 0.0, zoom = 1.0;
var xmin = -2, xmax = 2, ymin = -1.5, ymax = 1.5;
var boxcolor="red";
var cX = -0.74, cY = 0.15, moveX = 0.0, moveY = 0.0, zoom = 1.0, invert_cntr=0, bw=true;
var ctx = canvas.getContext("2d");
var ctx2 = overlay_canvas.getContext("2d");


// function initialize(){
// var ctx = canvas.getContext("2d");
// var ctx2 = overlay_canvas.getContext("2d");
ctx.fillStyle = "#F5F5F5";

//Margin (top, right, bottom, left), width, height
var m = [50, 50, 50, 50],
    w = canvas.width - m[1] - m[3],
    h = canvas.height - m[0] - m[2];


var dragStartX, dragStartY, dragEndX, dragEndY, ymid, dY_2, mousedown, x1, y1, x2, y2, x3, y3, oomzoom=100;
//click and drag box to zoom
overlay_canvas.addEventListener('mousedown', function() {
		var rect = canvas.getBoundingClientRect();
		mousedown = true;
 		x1 = event.clientX - rect.left,
        y1 = event.clientY - rect.top;
        c = canvas_to_xy([x1,y1], xmin, xmax, ymin, ymax, canvas);
        dragStartX = c[0];
        dragStartY= c[1];
	}, false);

overlay_canvas.addEventListener('mousemove', function(){
		var rect = canvas.getBoundingClientRect();
		x2 = parseInt(event.clientX - rect.left);
		y2 = parseInt(event.clientY - rect.top)
		if(mousedown){
			ctx2.clearRect(0,0,canvas.width,canvas.height);	
			ctx2.beginPath();
			var wdth = x2 - x1,
				hght = y2 - y1;
			ctx2.strokeStyle = boxcolor;
			ctx2.lindeWidth = 5;
			ctx2.strokeRect(x1, y1, wdth, hght);
		}
	});
overlay_canvas.addEventListener('mouseup', function() {
		ctx2.clearRect(0,0,canvas.width,canvas.height);
		var rect = canvas.getBoundingClientRect();
		mousedown = false;
 		x3 = event.clientX - rect.left,
        y3 = event.clientY - rect.top;
        c = canvas_to_xy([x3,y3], xmin, xmax, ymin, ymax, canvas);
        dragEndX = c[0];
        dragEndY= c[1];
        
        if(dragEndX != dragStartX || dragEndY != dragStartY){
        moveY = (Math.min(dragEndY,dragStartY)+Math.max(dragEndY,dragStartY))/2;
        moveX = (Math.max(dragStartX, dragEndX) + Math.min(dragStartX, dragEndX)) / 2;
        zoom = 4 / (Math.max(dragStartX, dragEndX) - Math.min(dragStartX, dragEndX));
        oomzoom = 100*OOM(zoom);
		document.getElementById("Xtxt").value = Math.round(moveX*oomzoom)/oomzoom;
		document.getElementById("Ytxt").value = Math.round(moveY*oomzoom)/oomzoom;
		document.getElementById("zoomtxt").value = zoom.toFixed(1);

        
		draw_julia_set(cX,cY, moveX, moveY, zoom); 
		}    
	}, false);

document.addEventListener('keydown', function() {
	if(event.keyCode==87){
		up();
		}
	if(event.keyCode==65){
		left();
		}
	if(event.keyCode==83){
		down();
		}
	if(event.keyCode==68){
		right();
		}
	if(event.keyCode==90){
		zoomOut();
		}
	if(event.keyCode==88){
		zoomIn();
		}
	if(event.keyCode==72){
		showHideControls();
		}
	if(event.keyCode==82){
		reset();
		}
	
});

var shown = true;
function showHideControls(){
	if(shown){
	document.getElementById("slidecontainer").style.display = "none";
	shown = false;
	} else {
	document.getElementById("slidecontainer").style.display = "inline";
	shown = true;
	}
}

var iter_adjust = Math.log10(OOM(zoom));
var maxIter = 255*iter_adjust;
var jsetfunc = julia_iteration_count_deg2;
var draw_julia_set = draw_julia_set_bw;
draw_julia_set(cX,cY, moveX, moveY, zoom);

// Get user inputs:
var RE_user = document.getElementById("RE"),
	IM_user = document.getElementById("IM"),
	
	output_RE = document.getElementById("demo_RE"),
	output_IM = document.getElementById("demo_IM"),
	output_moveX = document.getElementById("Xtxt"),
	output_moveY = document.getElementById("Ytxt"),
	output_zoom = document.getElementById("zoomtxt");

output_RE.innerHTML = RE_user.value;
output_IM.innerHTML = IM_user.value;



function selectSet(){
	Jset = document.getElementById("julia_selector").value;
	moveX = 0.0;
	moveY = 0.0;
	zoom = 1;
	if(Jset=='deg2'){
	jsetfunc = julia_iteration_count_deg2;
	//suggested cool starting image
	cX = -0.74;
	document.getElementById("RE").value = "-0.74";
	cY = 0.15;
	document.getElementById("IM").value = "0.15";
	output_RE.innerHTML = RE_user.value;
	output_IM.innerHTML = IM_user.value;
	draw_julia_set(cX,cY, moveX, moveY, zoom);
	}
	else if(Jset=='deg3'){
	jsetfunc = julia_iteration_count_deg3;
	//suggested cool starting image
	cX = -0.56;
	document.getElementById("RE").value = "-0.56";
	cY = -0.3;
	document.getElementById("IM").value = "-0.3";
	output_RE.innerHTML = RE_user.value;
	output_IM.innerHTML = IM_user.value;
	draw_julia_set(cX,cY, moveX, moveY, zoom);
	}
		else if(Jset=='deg4'){
	jsetfunc = julia_iteration_count_deg4;
	//suggested cool starting image
	cX = 0.03;
	document.getElementById("RE").value = "0.03";
	cY = -0.83;
	document.getElementById("IM").value = "-0.83";
	output_RE.innerHTML = RE_user.value;
	output_IM.innerHTML = IM_user.value;
	draw_julia_set(cX,cY, moveX, moveY, zoom);
	}
		else if(Jset=='deg5'){
	jsetfunc = julia_iteration_count_deg5;
	//suggested cool starting image
	cX = -0.76;
	document.getElementById("RE").value = "-0.76";
	cY = 0.31;
	document.getElementById("IM").value = "0.31";
	output_RE.innerHTML = RE_user.value;
	output_IM.innerHTML = IM_user.value;
	draw_julia_set(cX,cY, moveX, moveY, zoom);
	}
	else if(Jset=='sin'){
	jsetfunc = julia_iteration_count_sin;
	//suggested cool starting image
	cX = 0.18;
	document.getElementById("RE").value = "0.18";
	cY = -3.96;
	document.getElementById("IM").value = "-3.96";
	output_RE.innerHTML = RE_user.value;
	output_IM.innerHTML = IM_user.value;
	draw_julia_set(cX,cY, moveX, moveY, zoom);
	}
	
	else if(Jset=='cos'){
	jsetfunc = julia_iteration_count_cos;
	//suggested cool starting image
	cX = -2.49;
	document.getElementById("RE").value = "-2.49";
	cY = 0.42;
	document.getElementById("IM").value = "0.42";
	output_RE.innerHTML = RE_user.value;
	output_IM.innerHTML = IM_user.value;
	draw_julia_set(cX,cY, moveX, moveY, zoom);
	}
	
	else if(Jset=='invDiffx'){
	jsetfunc = julia_iteration_count_invDiffx;
	//suggested cool starting image
	cX = -1.0;
	document.getElementById("RE").value = "-1.0";
	cY = 1.32;
	document.getElementById("IM").value = "1.32";
	output_RE.innerHTML = RE_user.value;
	output_IM.innerHTML = IM_user.value;
	draw_julia_set(cX,cY, moveX, moveY, zoom);
	}
	
	else if(Jset=='ship'){
	jsetfunc = julia_iteration_count_ship;
	//suggested cool starting image
	cX = 0.0;
	document.getElementById("RE").value = "0.0";
	cY = 1.01;
	document.getElementById("IM").value = "1.01";
	output_RE.innerHTML = RE_user.value;
	output_IM.innerHTML = IM_user.value;
	draw_julia_set(cX,cY, moveX, moveY, zoom);
	}
	
		else if(Jset=='ship3'){
	jsetfunc = julia_iteration_count_ship3;
	//suggested cool starting image
	cX = 0.0;
	document.getElementById("RE").value = "0.0";
	cY = 1.01;
	document.getElementById("IM").value = "1.01";
	output_RE.innerHTML = RE_user.value;
	output_IM.innerHTML = IM_user.value;
	draw_julia_set(cX,cY, moveX, moveY, zoom);
	}
	
		else if(Jset=='ship4'){
	jsetfunc = julia_iteration_count_ship4;
	//suggested cool starting image
	cX = 0.0;
	document.getElementById("RE").value = "0.0";
	cY = 1.01;
	document.getElementById("IM").value = "1.01";
	output_RE.innerHTML = RE_user.value;
	output_IM.innerHTML = IM_user.value;
	draw_julia_set(cX,cY, moveX, moveY, zoom);
	}
	
		else if(Jset=='ship5'){
	jsetfunc = julia_iteration_count_ship5;
	//suggested cool starting image
	cX = 0.0;
	document.getElementById("RE").value = "0.0";
	cY = 1.01;
	document.getElementById("IM").value = "1.01";
	output_RE.innerHTML = RE_user.value;
	output_IM.innerHTML = IM_user.value;
	draw_julia_set(cX,cY, moveX, moveY, zoom);
	}
	
	else if(Jset=='invSumx'){
	jsetfunc = julia_iteration_count_invSumx;
	//suggested cool starting image
	cX = 0.0;
	document.getElementById("RE").value = "0.0";
	cY = 1.01;
	document.getElementById("IM").value = "1.01";
	output_RE.innerHTML = RE_user.value;
	output_IM.innerHTML = IM_user.value;
	draw_julia_set(cX,cY, moveX, moveY, zoom);
	}
	
	
	else{
	console.log('error');
	}
	
}

function colorselect(){
	usr_clr = document.getElementById("colorselect").value;
	if(usr_clr=="bw"){
		draw_julia_set = draw_julia_set_bw;
		boxcolor="red";
		}
	if(usr_clr=="bwinv"){
		draw_julia_set = draw_julia_set_invert_bw;
		boxcolor="red";
		}
	if(usr_clr=="red"){
		draw_julia_set = draw_julia_set_red;
		boxcolor="white";
		}
	if(usr_clr=="green"){
		draw_julia_set = draw_julia_set_green;
		boxcolor="white";
		}
	if(usr_clr=="blue"){
		draw_julia_set = draw_julia_set_blue;
		boxcolor="white";
		}
	if(usr_clr=="yellow"){
		draw_julia_set = draw_julia_set_yellow;
		boxcolor="white";
		}
	if(usr_clr=="icy"){
		draw_julia_set = draw_julia_set_icy;
		boxcolor="white";
		}
	if(usr_clr=="redblue"){
		draw_julia_set = draw_julia_set_redblue;
		boxcolor="white";
		}
	if(usr_clr=="rainbow"){
		draw_julia_set = draw_julia_set_rainbow;
		boxcolor="white";
		}
	if(usr_clr=="custom"){
		customColors();
		draw_julia_set = draw_julia_set_custom;
		document.getElementById("customcolors").style.display = "inline";
		boxcolor="white";
		} else {document.getElementById("customcolors").style.display = "none";}
		
		draw_julia_set(cX,cY, moveX, moveY, zoom);
		
}

// Update the current slider value (each time you drag the slider handle)
RE_user.oninput = function() {
	cX = parseFloat(this.value);
	output_RE.innerHTML = cX;
	draw_julia_set(cX,cY, moveX, moveY, zoom);
}
IM_user.oninput = function() {
	cY = parseFloat(this.value);
	output_IM.innerHTML = cY;
	draw_julia_set(cX,cY, moveX, moveY, zoom);
}


function REup() {
  document.getElementById("RE").stepUp(1);
  cX = parseFloat(document.getElementById("RE").value);
  output_RE.innerHTML = cX;
  draw_julia_set(cX,cY, moveX, moveY, zoom);
}
function REdown() {
  document.getElementById("RE").stepDown(1);
  cX = parseFloat(document.getElementById("RE").value);
  output_RE.innerHTML = cX;
  draw_julia_set(cX,cY, moveX, moveY, zoom);
}  
function IMup() {
  document.getElementById("IM").stepUp(1);
  cY = parseFloat(document.getElementById("IM").value);
  output_IM.innerHTML = cY;
  draw_julia_set(cX,cY, moveX, moveY, zoom);
}
function IMdown() {
  document.getElementById("IM").stepDown(1);
  cY = parseFloat(document.getElementById("IM").value);
  output_IM.innerHTML = cY;
  draw_julia_set(cX,cY, moveX, moveY, zoom);
}

function zoomIn() {
  zoom = zoom*zoomrate;
  oomzoom = 100*OOM(zoom);
  document.getElementById("zoomtxt").value = zoom.toFixed(1); 
  draw_julia_set(cX,cY, moveX, moveY, zoom);
}
function zoomOut() {
  zoom = zoom/zoomrate;
  oomzoom = 100*OOM(zoom);
  document.getElementById("zoomtxt").value = zoom.toFixed(1);  
  draw_julia_set(cX,cY, moveX, moveY, zoom);
}
function right() {
  move = 1000/OOM(zoom);
  moveX = moveX + move/10000;
  document.getElementById("Xtxt").value = Math.round(moveX*oomzoom)/oomzoom;
  draw_julia_set(cX,cY, moveX, moveY, zoom);
}
function left() {
  move = 1000/OOM(zoom);
  moveX = moveX - move/10000;
  document.getElementById("Xtxt").value = Math.round(moveX*oomzoom)/oomzoom;
  draw_julia_set(cX,cY, moveX, moveY, zoom);
}
function up() {
  move = 1000/OOM(zoom);
  moveY = moveY + move/10000;
  document.getElementById("Ytxt").value = Math.round(moveY*oomzoom)/oomzoom;
  draw_julia_set(cX,cY, moveX, moveY, zoom);
}
function down() {
  move = 1000/OOM(zoom);
  moveY = moveY - move/10000;
  document.getElementById("Ytxt").value = Math.round(moveY*oomzoom)/oomzoom;
  draw_julia_set(cX,cY, moveX, moveY, zoom);
}


function manualXY(){
moveXtmp = document.getElementById("Xtxt").value;
moveYtmp = document.getElementById("Ytxt").value;
zoomtmp = document.getElementById("zoomtxt").value;
moveX = parseFloat(moveXtmp == '' ?  moveX : moveXtmp);
moveY = parseFloat(moveYtmp == '' ? moveY : moveYtmp);
zoom = parseFloat(zoomtmp == '' ? zoom : zoomtmp);
draw_julia_set(cX,cY, moveX, moveY, zoom);
}

var zoomrate = 2.0;
function setZoomRate(){
	zoomrate = document.getElementById("zoomrate").value;
}


function reset(){
moveX = 0.0;
moveY = 0.0;
zoom = 1;
zoomrate = 2.0;
usrCnt = 8;
usrCntAdd = 1;
maxIter = Math.pow(2,usrCnt) + usrCntAdd;
usrCntMlt = 1;

document.getElementById("usrCnt").value = usrCnt;
document.getElementById("usrCntAdd").value = usrCntAdd;
document.getElementById("cntMlt").value = usrCntMlt;
document.getElementById("Xtxt").value = "0";
document.getElementById("Ytxt").value = "0";
document.getElementById("zoomtxt").value = "1";
document.getElementById("usrCnt").value = "8";
document.getElementById("usrCntAdd").value = "1";
document.getElementById("zoomrate").value = "2.0";

output_RE.innerHTML = RE_user.value;
output_IM.innerHTML = IM_user.value;
draw_julia_set(cX,cY, moveX, moveY, zoom);
}

function resetZoom(){
zoom = 1;
draw_julia_set(cX,cY, moveX, moveY, zoom);
}

function resetPan(){
moveX = 0.0;
moveY = 0.0;
document.getElementById("Xtxt").value = "0";
document.getElementById("Ytxt").value = "0";

draw_julia_set(cX,cY, moveX, moveY, zoom);
}


function grayscale(){
	draw_julia_set = draw_julia_set_bw;
	bw = true;
	draw_julia_set(cX,cY, moveX, moveY, zoom);
}
function color(){
	bw = false;
	draw_julia_set = draw_julia_set_color;
	draw_julia_set(cX,cY, moveX, moveY, zoom);
}
function invert(){
	if(bw){
		if(invert_cntr == 0){
		draw_julia_set = draw_julia_set_invert_bw;
		invert_cntr = 1;
		} else {
		draw_julia_set = draw_julia_set_bw;
		invert_cntr = 0;
		}
	} else {
		if(invert_cntr == 0){
		draw_julia_set = draw_julia_set_invert;
		invert_cntr = 1;
		} else {
		draw_julia_set = draw_julia_set_color;
		invert_cntr = 0;
		}
	}
	draw_julia_set(cX,cY, moveX, moveY, zoom);
}

function random_float(){
	var num = Math.random();
	num *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
	return num;
}

function randomC(){
	cY = random_float();
	cX = random_float();

	cXstr = toString(cX);
	cYstr = toString(cY);
	document.getElementById("RE").value = cX;
	document.getElementById("IM").value = cX;
	output_RE.innerHTML = Number.parseFloat(cX).toPrecision(3);
  	output_IM.innerHTML = Number.parseFloat(cY).toPrecision(3);
  	draw_julia_set(cX,cY, moveX, moveY, zoom);
}

function resochange(){
	reso = document.getElementById("reso").value;
	if(reso=="800"){
		ctx.canvas.width = 800;
		ctx.canvas.height = 600;
		ctx2.canvas.width = 800;
		ctx2.canvas.height = 600;
		} else if(reso=="1200"){
		ctx.canvas.width = 1200;
		ctx.canvas.height = 900;
		ctx2.canvas.width = 1200;
		ctx2.canvas.height = 900;	
		} else if(reso=="1600"){
		ctx.canvas.width = 1600;
		ctx.canvas.height = 1200;
		ctx2.canvas.width = 1600;
		ctx2.canvas.height = 1200;
		} else if(reso=="2400"){
		ctx.canvas.width = 2400;
		ctx.canvas.height = 1800;
		ctx2.canvas.width = 2400;
		ctx2.canvas.height = 1800;
		}
	draw_julia_set(cX,cY, moveX, moveY, zoom);
}
function saveimg(){
	var img = canvas.toDataURL("image/png");
	document.write('<img src="'+img+'"/>')
}

function canvas_to_xy(ij, xmin, xmax, ymin, ymax) {
	"use strict";
	xmin = xmin/zoom+moveX;
	xmax = xmax/zoom+moveX;
	ymin = ymin/zoom+moveY;
	ymax = ymax/zoom+moveY;
	return [
		((xmax-xmin)/(canvas.width-1))*ij[0]+xmin, 
		((ymin-ymax)/(canvas.height-1))*ij[1]+ymax
	]
}


var val;
function draw_julia_set_red(cX, cY, moveX, moveY, zoom) {
	var canvasData = ctx.createImageData(canvas.width, canvas.height);
	for(var i = 0; i < canvas.width; i++) {
		for(var j = 0; j < canvas.height; j++) { 
			var xy = canvas_to_xy([i,j], xmin, xmax, ymin, ymax);
			var it_cnt = jsetfunc(cX,cY,xy[0],xy[1],zoom)[1];
			var hue = usrCntMlt*it_cnt/maxIter;
			var rgb = HSVtoRGB(hue, 1.0, 1.0);
			var idx = (i+j*canvas.width) * 4;
			canvasData.data[idx + 0] = rgb.r;
			canvasData.data[idx + 1] = rgb.g;
			canvasData.data[idx + 2] = rgb.b;
			canvasData.data[idx + 3] = 255;
		}
	}
    ctx.putImageData(canvasData, 0, 0);
}


function draw_julia_set_icy(cX, cY, moveX, moveY, zoom) {
	var canvasData = ctx.createImageData(canvas.width, canvas.height);
	for(var i = 0; i < canvas.width; i++) {
		for(var j = 0; j < canvas.height; j++) { 
			var xy = canvas_to_xy([i,j], xmin, xmax, ymin, ymax);
			var it_cnt = jsetfunc(cX,cY,xy[0],xy[1],zoom)[1];
			var hue = usrCntMlt*it_cnt/maxIter;
			var rgb = HSVtoRGB(hue, 1.0, 1.0);
			var idx = (i+j*canvas.width) * 4;
			canvasData.data[idx + 0] = 255-rgb.r;
			canvasData.data[idx + 1] = 255-rgb.g;
			canvasData.data[idx + 2] = 255-rgb.b;
			canvasData.data[idx + 3] = 255;
		}
	}
    ctx.putImageData(canvasData, 0, 0);
}

function draw_julia_set_green(cX, cY, moveX, moveY, zoom) {
	var canvasData = ctx.createImageData(canvas.width, canvas.height);
	for(var i = 0; i < canvas.width; i++) {
		for(var j = 0; j < canvas.height; j++) { 
			var xy = canvas_to_xy([i,j], xmin, xmax, ymin, ymax);
			var it_cnt = jsetfunc(cX,cY,xy[0],xy[1],zoom)[1];
			var hue = usrCntMlt*it_cnt/maxIter;
			var rgb = HSVtoRGB(hue, 1.0, 1.0);
			var idx = (i+j*canvas.width) * 4;
			canvasData.data[idx + 0] = 255-rgb.r;
			canvasData.data[idx + 1] = rgb.g;
			canvasData.data[idx + 2] = rgb.b;
			canvasData.data[idx + 3] = 255;
		}
	}
    ctx.putImageData(canvasData, 0, 0);
}

function draw_julia_set_yellow(cX, cY, moveX, moveY, zoom) {
	var canvasData = ctx.createImageData(canvas.width, canvas.height);
	for(var i = 0; i < canvas.width; i++) {
		for(var j = 0; j < canvas.height; j++) { 
			var xy = canvas_to_xy([i,j], xmin, xmax, ymin, ymax);
			var it_cnt = jsetfunc(cX,cY,xy[0],xy[1],zoom)[1];
			var hue = usrCntMlt*it_cnt/maxIter;
			var rgb = HSVtoRGB(hue, 1.0, 1.0);
			var idx = (i+j*canvas.width) * 4;
			canvasData.data[idx + 0] = rgb.r;
			canvasData.data[idx + 1] = 255-rgb.g;
			canvasData.data[idx + 2] = rgb.b;
			canvasData.data[idx + 3] = 255;
		}
	}
    ctx.putImageData(canvasData, 0, 0);
}

function draw_julia_set_blue(cX, cY, moveX, moveY, zoom) {
	var canvasData = ctx.createImageData(canvas.width, canvas.height);
	for(var i = 0; i < canvas.width; i++) {
		for(var j = 0; j < canvas.height; j++) { 
			var xy = canvas_to_xy([i,j], xmin, xmax, ymin, ymax);
			var it_cnt = jsetfunc(cX,cY,xy[0],xy[1],zoom)[1];
			var hue = usrCntMlt*it_cnt/maxIter;
			var rgb = HSVtoRGB(hue, 1.0, 1.0);
			var idx = (i+j*canvas.width) * 4;
			canvasData.data[idx + 0] = 255-rgb.r;
			canvasData.data[idx + 1] = rgb.g;
			canvasData.data[idx + 2] = 255-rgb.b;
			canvasData.data[idx + 3] = 255;
		}
	}
    ctx.putImageData(canvasData, 0, 0);
}

function draw_julia_set_redblue(cX, cY, moveX, moveY, zoom) {
	var canvasData = ctx.createImageData(canvas.width, canvas.height);
	for(var i = 0; i < canvas.width; i++) {
		for(var j = 0; j < canvas.height; j++) { 
			var xy = canvas_to_xy([i,j], xmin, xmax, ymin, ymax);
			var it_cnt = jsetfunc(cX,cY,xy[0],xy[1],zoom)[1];
			var hue = usrCntMlt*it_cnt/maxIter;
			var rgb = HSVtoRGB(hue, 1.0, 1.0);
			var idx = (i+j*canvas.width) * 4;
			canvasData.data[idx + 0] = rgb.r;
			canvasData.data[idx + 1] = rgb.g;
			canvasData.data[idx + 2] = rgb.g;
			canvasData.data[idx + 3] = 255;
		}
	}
    ctx.putImageData(canvasData, 0, 0);
}

function draw_julia_set_rainbow(cX, cY, moveX, moveY, zoom) {
	var canvasData = ctx.createImageData(canvas.width, canvas.height);
	for(var i = 0; i < canvas.width; i++) {
		for(var j = 0; j < canvas.height; j++) { 
			var xy = canvas_to_xy([i,j], xmin, xmax, ymin, ymax);
			var it_cnt = jsetfunc(cX,cY,xy[0],xy[1],zoom)[1];
			var hue = usrCntMlt*it_cnt/maxIter;
			var rgb = HSVtoRGB(hue, 1.0, 1.0);
			var idx = (i+j*canvas.width) * 4;
			canvasData.data[idx + 0] = rgb.r;
			canvasData.data[idx + 1] = rgb.g;
			canvasData.data[idx + 2] = rgb.b;
			canvasData.data[idx + 3] = 255;
		}
	}
    ctx.putImageData(canvasData, 0, 0);
}

var usrR, usrG, usrB, usrCnt=8, usrCntMlt=2;
function customCount(){
	usrCnt = parseInt(document.getElementById("usrCnt").value);
	usrCntAdd = parseInt(document.getElementById("usrCntAdd").value);
	maxIter = Math.pow(2,usrCnt) + usrCntAdd;
	usrCntMlt = parseInt(document.getElementById("cntMlt").value);
	draw_julia_set(cX,cY, moveX, moveY, zoom);
}
function customColors(){
	usrR = parseInt(document.getElementById("R").value);
	usrG = parseInt(document.getElementById("G").value);
	usrB = parseInt(document.getElementById("B").value);
	usrCnt = parseInt(document.getElementById("usrCnt").value);
	usrCntAdd = parseInt(document.getElementById("usrCntAdd").value);
	maxIter = Math.pow(2,usrCnt) + usrCntAdd;
	usrCntMlt = parseInt(document.getElementById("cntMlt").value);
	Rsign = document.getElementById("Rsign").value == "p" ? 1 : -1;
	Gsign = document.getElementById("Gsign").value == "p" ? 1 : -1;
	Bsign = document.getElementById("Bsign").value == "p" ? 1 : -1;
	draw_julia_set(cX,cY, moveX, moveY, zoom);
}

function draw_julia_set_custom(cX, cY, moveX, moveY, zoom) {
	var canvasData = ctx.createImageData(canvas.width, canvas.height);
	for(var i = 0; i < canvas.width; i++) {
		for(var j = 0; j < canvas.height; j++) { 
			var xy = canvas_to_xy([i,j], xmin, xmax, ymin, ymax);
			var it_cnt = jsetfunc(cX,cY,xy[0],xy[1],zoom)[1];
			var hue = usrCntMlt*it_cnt/maxIter;
			var rgb = HSVtoRGB(hue, 1.0, 1.0);
			var idx = (i+j*canvas.width) * 4;
			canvasData.data[idx + 0] = usrR + Rsign * rgb.r;
			canvasData.data[idx + 1] = usrG + Gsign * rgb.g;
			canvasData.data[idx + 2] = usrB + Bsign * rgb.b;
			canvasData.data[idx + 3] = 255;
		}
	}
    ctx.putImageData(canvasData, 0, 0);
}

function draw_julia_set_bw(cX, cY, moveX, moveY, zoom) {
	var canvasData = ctx.createImageData(canvas.width, canvas.height);
	for(var i = 0; i < canvas.width; i++) {
		for(var j = 0; j < canvas.height; j++) { 
			var xy = canvas_to_xy([i,j], xmin, xmax, ymin, ymax);
			var it_cnt = jsetfunc(cX,cY,xy[0],xy[1],zoom)[0];
			var idx = (i+j*canvas.width) * 4;
			canvasData.data[idx + 0] = 245-it_cnt;
			canvasData.data[idx + 1] = 245-it_cnt;
			canvasData.data[idx + 2] = 245-it_cnt;
			canvasData.data[idx + 3] = 255;
		}
	}
    ctx.putImageData(canvasData, 0, 0);
}

function draw_julia_set_invert_bw(cX, cY, moveX, moveY, zoom) {
	var canvasData = ctx.createImageData(canvas.width, canvas.height);
	for(var i = 0; i < canvas.width; i++) {
		for(var j = 0; j < canvas.height; j++) { 
			var xy = canvas_to_xy([i,j], xmin, xmax, ymin, ymax);
			var it_cnt = jsetfunc(cX,cY,xy[0],xy[1],zoom)[0];
			var idx = (i+j*canvas.width) * 4;
			canvasData.data[idx + 0] = it_cnt;
			canvasData.data[idx + 1] = it_cnt;
			canvasData.data[idx + 2] = it_cnt;
			canvasData.data[idx + 3] = 255;
		}
	}
    ctx.putImageData(canvasData, 0, 0);
}

var logBase = 1.0/Math.log(2.0);
var logHalfBase = Math.log(0.5)*logBase;

function julia_iteration_count_deg2(cre,cim,x0,y0,zoom) {
	var x = x0, y = y0;
	var xtemp, ytemp;
	var cnt = 0;
	while(x*x+y*y < 4 && cnt++ <= maxIter/2) {
		xtemp = x; ytemp = y;
		x = xtemp*xtemp-ytemp*ytemp+cre;
		y = 2*xtemp*ytemp+cim;
	}
// 	return 2*cnt;
	var cnt2 = cnt + 5 - logHalfBase - Math.log(Math.log(x*x+y*y))*logBase;
	return [2*cnt,cnt2];
}

function julia_iteration_count_deg3(cre,cim,x0,y0,zoom) {
	var x = x0, y = y0;
	var xtemp, ytemp;
	var cnt = 0;
	while(x*x+y*y < 4 && cnt++ < maxIter/3) {
		xtemp = x; ytemp = y;
		x = xtemp*xtemp*xtemp - 3.0*xtemp*ytemp*ytemp + cre;
		y = 3.0*xtemp*xtemp*ytemp - ytemp*ytemp*ytemp + cim;
	}
	var cnt2 = cnt + 5 - logHalfBase - Math.log(Math.log(x*x+y*y))*logBase;
	return [3*cnt,cnt2];}

function julia_iteration_count_deg4(cre,cim, x0, y0, zoom) {
	var x = x0, y = y0;
	var xtemp, ytemp;
	var cnt = 0;
	while(x*x+y*y < 4 && cnt++ < maxIter/2) {
		xtemp = x; ytemp = y;
		x = xtemp*xtemp*xtemp*xtemp - 6.0*xtemp*xtemp*ytemp*ytemp + ytemp*ytemp*ytemp*ytemp + cre;
		y = 4.0*xtemp*ytemp*(xtemp*xtemp - ytemp*ytemp) + cim;
	}
	var cnt2 = cnt + 5 - logHalfBase - Math.log(Math.log(x*x+y*y))*logBase;
	return [3*cnt,cnt2];}

function julia_iteration_count_deg5(cre,cim, x0, y0, zoom) {
	"use strict";
	var x = x0, y = y0;
	var xtemp, ytemp;
	var cnt = 0;
	while(x*x+y*y < 4 && cnt++ < maxIter/2) {
		xtemp = x; ytemp = y;
		x = xtemp*(xtemp*xtemp*xtemp*xtemp - 10.0*xtemp*xtemp*ytemp*ytemp + 5*ytemp*ytemp*ytemp*ytemp) + cre;
		y = ytemp*(5.0*xtemp*xtemp*xtemp*xtemp - 10*xtemp*xtemp*ytemp*ytemp + ytemp*ytemp*ytemp*ytemp) + cim;
	}
	var cnt2 = cnt + 5 - logHalfBase - Math.log(Math.log(x*x+y*y))*logBase;
	return [3*cnt,cnt2];}


function julia_iteration_count_sin(cre,cim,x0,y0,zoom) {
	var x = x0, y = y0;
	var xtemp, ytemp;
	var cnt = 0;
	while(x*x+y*y < 4 && cnt++ < maxIter/4) {
		xtemp = x; ytemp = y;
		x = (1+cre)*(xtemp - (1/6)*(xtemp*xtemp*xtemp - 3.0*xtemp*ytemp*ytemp));
		y = (1+cim)*(ytemp - (1/6)*(3.0*xtemp*xtemp*ytemp - ytemp*ytemp*ytemp));
	}
	var cnt2 = cnt + 5 - logHalfBase - Math.log(Math.log(x*x+y*y))*logBase;
	return [4*cnt,cnt2];}

function julia_iteration_count_cos(cre,cim,x0,y0,zoom) {
	var x = x0, y = y0;
	var xtemp, ytemp;
	var cnt = 0;
	while(x*x+y*y < 4 && cnt++ < maxIter/4) {
		xtemp = x; ytemp = y;
		x = (1+cre)*(xtemp - (1/2)*(xtemp*xtemp - ytemp*ytemp));
		y = ytemp*(1-xtemp+cim-xtemp*cim);
	}
	var cnt2 = cnt + 5 - logHalfBase - Math.log(Math.log(x*x+y*y))*logBase;
	return [5*cnt,cnt2];}

function julia_iteration_count_invDiffx(cre,cim,x0,y0,zoom) {
	var x = x0, y = y0;
	var xtemp, ytemp;
	var cnt = 0;
	while(x*x+y*y < 4 && cnt++ < maxIter/4) {
		xtemp = x; ytemp = y;
		x = cre*(1 + xtemp + xtemp*xtemp - ytemp*ytemp + xtemp*xtemp*xtemp - 3*xtemp*ytemp*ytemp);
		y = cim*(ytemp + 2*xtemp*ytemp + 3*xtemp*xtemp*ytemp - ytemp*ytemp*ytemp);
	}
	var cnt2 = cnt + 5 - logHalfBase - Math.log(Math.log(x*x+y*y))*logBase;
	return [4*cnt,cnt2];}

function julia_iteration_count_ship(cre,cim,x0,y0,zoom) {
	"use strict";
	var x = x0, y = y0;
	var xtemp, ytemp;
	var cnt = 0;
	while(x*x+y*y < 4 && cnt++ < maxIter/4) {
		xtemp = x*x-y*y+cre;
		y = -1*Math.abs(2*x*y)+cim;
		x = Math.abs(xtemp);
	}
	var cnt2 = cnt + 5 - logHalfBase - Math.log(Math.log(x*x+y*y))*logBase;
	return [4*cnt,cnt2];}
	
function julia_iteration_count_ship3(cre,cim,x0,y0,zoom) {
	"use strict";
	var x = x0, y = y0;
	var xtemp, ytemp;
	var cnt = 0;
	while(x*x+y*y < 4 && cnt++ < maxIter/4) {
		xtemp = x*x*x-3.0*x*y*y+cre;
		y = -1*Math.abs(3.0*x*x*y-y*y*y)+cim;
		x = Math.abs(xtemp);
	}
	var cnt2 = cnt + 5 - logHalfBase - Math.log(Math.log(x*x+y*y))*logBase;
	return [4*cnt,cnt2];
}

function julia_iteration_count_ship4(cre,cim,x0,y0,zoom) {
	"use strict";
	var x = x0, y = y0;
	var xtemp, ytemp;
	var cnt = 0;
	while(x*x+y*y < 4 && cnt++ < maxIter/4) {
		xtemp = x*x*x*x-6.0*x*x*y*y+y*y*y*y+cre;
		y = -1*Math.abs(4.0*x*y*(x*x-y*y))+cim;
		x = Math.abs(xtemp);
	}
	var cnt2 = cnt + 5 - logHalfBase - Math.log(Math.log(x*x+y*y))*logBase;
	return [4*cnt,cnt2];
}
function julia_iteration_count_ship5(cre,cim,x0,y0,zoom) {
	"use strict";
	var x = x0, y = y0;
	var xtemp, ytemp;
	var cnt = 0;
	while(x*x+y*y < 4 && cnt++ < maxIter/4) {
		xtemp = x*(x*x*x*x-10.0*x*x*y*y+5*y*y*y*y)+cre;
		y = -1*Math.abs(y*(5.0*x*x*x*x-10*x*x*y*y+y*y*y*y))+cim;
		x = Math.abs(xtemp);
	}
	var cnt2 = cnt + 5 - logHalfBase - Math.log(Math.log(x*x+y*y))*logBase;
	return [4*cnt,cnt2];
}

function julia_iteration_count_invSumx(cre,cim,x0,y0,zoom) {
	var x = x0, y = y0;
	var xtemp, ytemp;
	var cnt = 0;
	while(x*x+y*y < 4 && cnt++ < maxIter/4) {
		xtemp = x; ytemp = y;
		x = cre*(1 - xtemp + xtemp*xtemp - ytemp*ytemp - xtemp*xtemp*xtemp + 3*xtemp*ytemp*ytemp + xtemp*xtemp*xtemp*xtemp - 6*xtemp*xtemp*ytemp*ytemp + ytemp*ytemp*ytemp*ytemp - xtemp*xtemp*xtemp*xtemp*xtemp + 10*xtemp*xtemp*xtemp*ytemp*ytemp - 5*xtemp*ytemp*ytemp*ytemp*ytemp);
		y = cim*(-ytemp + 2*xtemp*ytemp - 3*xtemp*xtemp*ytemp + ytemp*ytemp*ytemp + 4*xtemp*xtemp*xtemp*ytemp -4*xtemp*ytemp*ytemp*ytemp - 5*xtemp*xtemp*xtemp*xtemp*ytemp + 10*xtemp*xtemp*ytemp*ytemp - ytemp*ytemp*ytemp*ytemp*ytemp);
	}
	var cnt2 = cnt + 5 - logHalfBase - Math.log(Math.log(x*x+y*y))*logBase;
	return [4*cnt,cnt2];
}



// Returns order of magnitude (for zoom, pan, etc.)
function OOM(n) {
    var order = Math.ceil(Math.log(n) / Math.LN10
                       + 0.000000001);
    return Math.pow(10,order);
}

// convert hsv to rgb
function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
//         r: Math.round(r * 255),
//         g: Math.round(g * 255),
//         b: Math.round(b * 255)
        r: r * 255,
        g: g * 255,
        b: b * 255
    };
}

// -0.74, 0.15i 
