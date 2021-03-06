
function spectateCamera(){
	camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(45, 71, -48), scene);
	camera.attachControl(canvas, true);
	
	camera.rotation = new BABYLON.Vector3( 0.7465, 0.5184, 0);
	camera.speed = 15;
	
	//Aiming
	camera.angularSensibility = 1000;
	camera.inertia = 0.2;
	
	camera.keysDown = [83];
	camera.keysUp = [87];
	camera.keysLeft = [65];
	camera.keysRight = [68];
}

function setupCamera(){
	
	camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, 2, 0), scene);
    camera.attachControl(canvas, true);
	camera.checkCollisions = true;
	
	camera.position.y = 2.425;
	camera.position.x = -10;
	camera.position.z = 0;
	camera.rotation.y = Math.PI/2;
	
	//Aiming
	camera.angularSensibility = 1000;
	camera.inertia = 0.2;
	
	//Min z
	camera.minZ = 0;
	
	//Disable camera movement
	camera.keysDown = [9999];
	camera.keysUp = [9999];
	camera.keysLeft = [9999];
	camera.keysRight = [9999];
}

function movementLogic(){

	// Create tracking box
	trackingBox = BABYLON.Mesh.CreateBox("trackingBox", 10, scene);
	trackingBox.position.y = 2.425;
	trackingBox.position.x = -10;
	trackingBox.position.z = 0;
	trackingBox.rotation.y = Math.PI/2;
	trackingBox.visibility = false;
	trackingBox.isPickable = false;

	//Define player's collision zone
	trackingBox.ellipsoid = new BABYLON.Vector3(0.75, 1.85, 0.75);
			
		
	
	
	
	
	
	//Keypress manager
	scene.actionManager = new BABYLON.ActionManager(scene);
	
	//*onDown*
	scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
		switch(evt.sourceEvent.keyCode){
			// W
			case 87:
					if(!moveForward){
						moveForward = true;
					}
					break;
			// S
			case 83:
					if(!moveBack){
						moveBack = true;
					}
					break;
			// A
			case 65:
					if(!moveLeft){
						moveLeft = true;
					}
					break;
			// D
			case 68:
					if(!moveRight){
						moveRight = true;
					}
					break;
		}
	}));
	
	//*onUp*
	scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
		switch(evt.sourceEvent.keyCode){
			// W
			case 87:
					if(moveForward){
						moveForward = false;
					}
					break;
			// S
			case 83:
					if(moveBack){
						moveBack = false;
					}
					break;
			// A
			case 65:
					if(moveLeft){
						moveLeft = false;
					}
					break;
			// D
			case 68:
					if(moveRight){
						moveRight = false;
					}
					break;
		}
	}));
	
	
	// Raycast from player's tracking box
	// X	1. can player jump?
	// 2. is the player on an uneven surface?
	function checkPlayersSurface() {
		// Origin, Direction, Length
		var surfaceCheckRay = new BABYLON.Ray(trackingBox.position, new BABYLON.Vector3(0, -1, 0), 2.2);

		
		onInclinedSurface = scene.pickWithRay(surfaceCheckRay, function (mesh) {
			for(var x=0; x<inclinedMeshes.length; x++){
				if(mesh==inclinedMeshes[x]){
					return true;
				}
			}
			return false;
		});			
	}
	

	// If player is on an uneven surface... determine the player's next Y position so that they move smoothly down those surfaces
	function nextPosOnInclinedMesh() {
		// Origin, Direction, Length
		var surfaceCheckRay = scene.pickWithRay(new BABYLON.Ray(trackingBox.position, new BABYLON.Vector3(0, -1, 0), 2.35));
		var originToGroundRatio = 2.11;
		
		if(surfaceCheckRay.hit){
			// If player is still on mesh... send new position
			return surfaceCheckRay.pickedPoint.y + originToGroundRatio;
		}else{
			// else... ignore
			return trackingBox.position.y;
		}
	}
	

	// Register main render loop
	engine.runRenderLoop(function () {
	
		// Player movement per frame
		var xMovement = 0;
		var zMovement = 0;
		var animRatio = scene.getAnimationRatio();
		
		// Calculate player's movement (WASD)
		if(moveForward){
			xMovement += Math.sin(trackingBox.rotation.y)*(playerSpeed*0.15);
			zMovement += Math.cos(trackingBox.rotation.y)*(playerSpeed*0.15);
		}
		
		if(moveBack){
			// If forward is also being held, then give the backwards movement enough power to negate it, else allow the backpeddle to be slower
			if(moveForward){
				xMovement -= Math.sin(trackingBox.rotation.y)*(playerSpeed*0.15);
				zMovement -= Math.cos(trackingBox.rotation.y)*(playerSpeed*0.15);
			}else{
				xMovement -= Math.sin(trackingBox.rotation.y)*(playerSpeed*0.075);
				zMovement -= Math.cos(trackingBox.rotation.y)*(playerSpeed*0.075);
			}
		}
		
		if(moveLeft){
			zMovement += Math.sin(trackingBox.rotation.y)*(playerSpeed*0.15);
			xMovement -= Math.cos(trackingBox.rotation.y)*(playerSpeed*0.15);
		}	

		if(moveRight){
			zMovement -= Math.sin(trackingBox.rotation.y)*(playerSpeed*0.15);
			xMovement += Math.cos(trackingBox.rotation.y)*(playerSpeed*0.15);
		}
		
		// If diagonal movement, then half the player's speed
		if((moveForward&&moveRight) || (moveForward&&moveLeft) || (moveBack&&moveRight) || (moveBack&&moveLeft)){
			xMovement *= 0.5;
			zMovement *= 0.5;
		}
		
		// Cast ray to check player's surface
		//checkPlayersSurface();
		
		// Make the move!
		/*if(onInclinedSurface.hit){
			// Without gravity
			trackingBox.moveWithCollisions(new BABYLON.Vector3(xMovement*animRatio, 0, zMovement*animRatio));
			// Adjust y position so that player smoothly traverses
			trackingBox.position.y = nextPosOnInclinedMesh();
		}else{*/
			// With gravity
			trackingBox.moveWithCollisions(new BABYLON.Vector3(xMovement*animRatio, gravity, zMovement*animRatio));
		//}
		
		// Is the player moving?
		if((xMovement==0 && zMovement==0) || camera.position.equals(trackingBox.position)){
			playerIsMoving = false;
		}else{
			playerIsMoving = true;
		}
		
		// Camera will follow player's tracking box
		camera.position.x = trackingBox.position.x;
		camera.position.y = trackingBox.position.y;
		camera.position.z = trackingBox.position.z;
		
		// Player rotation
		trackingBox.rotation.y = camera.rotation.y;
		
	}); 	
}