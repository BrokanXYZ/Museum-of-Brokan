
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
	
	
	
	
	var startMat = new BABYLON.StandardMaterial("startMat", scene);
	startMat.diffuseColor = new BABYLON.Color3(0, 0, 0);
	startMat.specularColor = new BABYLON.Color3(0, 0, 0);
	startMat.emissiveColor = new BABYLON.Color3(1, 1, 1);
	
	startRoomTop = BABYLON.Mesh.CreatePlane("startRoomTop", 30.0, scene);
    startRoomTop.material = startMat;
	startRoomTop.position = new BABYLON.Vector3(0,30,0);
	startRoomTop.rotation = new BABYLON.Vector3(-Math.PI/2, 0, 0);

	var startRoomBottom = BABYLON.Mesh.CreatePlane("startRoomBottom", 30.0, scene);
    startRoomBottom.material = startMat;
	startRoomBottom.position = new BABYLON.Vector3(0,0,0);
	startRoomBottom.rotation = new BABYLON.Vector3(Math.PI/2, 0, 0);
	startRoomBottom.checkCollisions = true;
	
	var startRoomPX = BABYLON.Mesh.CreatePlane("startRoomPX", 30.0, scene);
    startRoomPX.material = startMat;
	startRoomPX.position = new BABYLON.Vector3(15,15,0);
	startRoomPX.rotation = new BABYLON.Vector3(0, Math.PI/2, 0);
	startRoomPX.checkCollisions = true;
	
	var startRoomNX = BABYLON.Mesh.CreatePlane("startRoomNX", 30.0, scene);
    startRoomNX.material = startMat;
	startRoomNX.position = new BABYLON.Vector3(-15,15,0);
	startRoomNX.rotation = new BABYLON.Vector3(0, -Math.PI/2, 0);
	startRoomNX.checkCollisions = true;

	var startRoomPZl = BABYLON.MeshBuilder.CreatePlane("startRoomPZl", {height:30, width: 14}, scene);
    startRoomPZl.material = startMat;
	startRoomPZl.position = new BABYLON.Vector3(-8,15,15);
	startRoomPZl.rotation = new BABYLON.Vector3(0, 0, 0);
	startRoomPZl.checkCollisions = true;
	
	var startRoomPZr = BABYLON.MeshBuilder.CreatePlane("startRoomPZr", {height:30, width: 14}, scene);
    startRoomPZr.material = startMat;
	startRoomPZr.position = new BABYLON.Vector3(8,15,15);
	startRoomPZr.rotation = new BABYLON.Vector3(0, 0, 0);
	startRoomPZr.checkCollisions = true;
	
	var startRoomPZm = BABYLON.MeshBuilder.CreatePlane("startRoomPZm", {height:26, width: 2}, scene);
    startRoomPZm.material = startMat;
	startRoomPZm.position = new BABYLON.Vector3(0,17,15);
	startRoomPZm.rotation = new BABYLON.Vector3(0, 0, 0);
	
	var startRoomNZ = BABYLON.Mesh.CreatePlane("startRoomNZ", 30.0, scene);
    startRoomNZ.material = startMat;
	startRoomNZ.position = new BABYLON.Vector3(0,15,-15);
	startRoomNZ.rotation = new BABYLON.Vector3(Math.PI, 0, 0);
	startRoomNZ.checkCollisions = true;
	
	
	
	
	
	
	
	
	// Test ground
	var ground = BABYLON.Mesh.CreatePlane("ground", 250.0, scene);
    ground.material = new BABYLON.StandardMaterial("groundMat", scene);
    ground.material.diffuseColor = new BABYLON.Color3(0.5, 0.75, 1);
    ground.material.backFaceCulling = false;
    ground.position = new BABYLON.Vector3(5, -1, -15);
    ground.rotation = new BABYLON.Vector3(Math.PI/2, 0, 0);
	ground.checkCollisions = true;
	
	// PINK BOX
	var box = BABYLON.MeshBuilder.CreateBox("box", {height: 5, width: 1, depth: 1}, scene);
	box.material = new BABYLON.StandardMaterial("box", scene);
	box.material.diffuseColor = new BABYLON.Color3(1, 0, 1);
	box.material.emissiveColor = new BABYLON.Color3(0.25, 0, 0.25);
	box.position.y = 1.5;
	box.position.z = 25;

	// Test ground
	var ground = BABYLON.Mesh.CreatePlane("ground", 100.0, scene);
    ground.material = new BABYLON.StandardMaterial("groundMat", scene);
    ground.material.diffuseColor = new BABYLON.Color3(0.5, 0.75, 1);
    ground.material.backFaceCulling = false;
    ground.position = new BABYLON.Vector3(5, -1, -15);
    ground.rotation = new BABYLON.Vector3(Math.PI/2, 0, 0);
	ground.checkCollisions = true;
	
	
	
	
	
    
	
    
}