
var spectate = false;

// Babylon vars
var canvas; 
var engine; 
var scene; 

// P1's vars
var camera;
var trackingBox;

// Meshes imported from Blender scene
var importedMeshes;



var light0;



// Global lighting value
//var gl = 0.00001;

// Movement related vars
var inclinedMeshes = [];
var onInclinedSurface = false;
var playerSpeed = 1;
var gravity = -0.2;
var moveForward = false;
var moveBack = false;
var moveLeft = false;
var moveRight = false;

//Entry point
document.addEventListener("DOMContentLoaded", function() {
	initializeBabylon();
	
	if(!spectate){
		setupCamera();
		movementLogic();
	}else{
		spectateCamera();
	}
});
