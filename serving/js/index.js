// Babylon vars
var canvas; 
var engine; 
var scene; 

//P1's vars
var camera;
var trackingBox;


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
	setupCamera();
    createWorld();
	movementLogic();
});
