
function initializeBabylon(){
	// Define essential elements
	canvas = document.getElementById("gameCanvas");
	engine = new BABYLON.Engine(canvas, true);
	scene = new BABYLON.Scene(engine);
	
	//Resize game on window resize
	window.addEventListener("resize", function () {
		engine.resize();
	});
	
	// On click event, request pointer lock
	canvas.addEventListener("click", function (evt) {
		canvas.requestPointerLock = canvas.requestPointerLock || canvas.msRequestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock;
		if (canvas.requestPointerLock) {
			canvas.requestPointerLock();
		}
	});
	
	// 		**************  LOADING  **************
	var assetsManager = new BABYLON.AssetsManager(scene);
	
	
	
	
	// LOADING FINISHED!
	
	assetsManager.onFinish = function (tasks) {
		engine.runRenderLoop(function () {
			scene.render();
		});
	};
	
	assetsManager.load();
	
}



function createWorld(){
	
	//Scene Background Color
	//scene.clearColor = new BABYLON.Color3(1,0.3,0.1);
	
	// Enable Collisions
    scene.collisionsEnabled = true;
	
	
	
	
	//Light
	var light0 = new BABYLON.DirectionalLight("light0", new BABYLON.Vector3(0, -1.5, 1), scene);
	light0.position = new BABYLON.Vector3(0, 50, -50);
	light0.diffuse = new BABYLON.Color3(1, 1, 1);
	light0.specular = new BABYLON.Color3(0.5, 0.5, 1);
	light0.groundColor = new BABYLON.Color3(0, 0, 0);
	
	
	
	
	
	
	
	
	BABYLON.SceneLoader.ImportMesh("", "/serving/meshes/", "lobby.babylon", scene, function (newMeshes) {
		
		
		var startMat = new BABYLON.StandardMaterial("startMat", scene);
		startMat.diffuseColor = new BABYLON.Color3(0, 0, 0);
		startMat.specularColor = new BABYLON.Color3(0, 0, 0);
		startMat.emissiveColor = new BABYLON.Color3(1, 1, 1);
		
		for(var x=2; x<8; x++){
			newMeshes[x].material = startMat;
			newMeshes[x].checkCollisions = true;
		}
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
	});
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	// Test ground
	var ground = BABYLON.Mesh.CreatePlane("ground", 250.0, scene);
    ground.material = new BABYLON.StandardMaterial("groundMat", scene);
    ground.material.diffuseColor = new BABYLON.Color3(0.5, 0.75, 1);
    ground.material.backFaceCulling = false;
    ground.position = new BABYLON.Vector3(5, -1, -15);
    ground.rotation = new BABYLON.Vector3(Math.PI/2, 0, 0);
	ground.checkCollisions = true;
	
	
	
	
	
	
    
	
    
}