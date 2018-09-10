
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
	
	var meshTask1 = assetsManager.addMeshTask("meshTask1", "", "/serving/meshes/", "lobby.babylon");
	meshTask1.onSuccess = function (task) {
		// Scene meshes
		importedMeshes = task.loadedMeshes;
		// Setup the scene!
		setupWorld();
	}

	/*var audioTask1 = assetsManager.addBinaryFileTask("audioTask1", "serving/sounds/effects/block.wav");
	audioTask1.onSuccess = function (task) {
		block = new BABYLON.Sound("block", task.data, scene, null, {volume: 4});
	}*/
	// 		***********  LOADING DONE!  ***********
	
	assetsManager.onFinish = function (tasks) {
		engine.runRenderLoop(function () {
			scene.render();
			// Print FPS
			//console.log(engine.getFps().toFixed());
		});
	};
	
	assetsManager.load();
	
}



function setupWorld(){
	
	// ----Optimization----
	// 
	//	freeze matrices
	//	delete backfaces
	//  1 time shadow render
	//
	//
	
	
	
	//Scene Background Color
	scene.clearColor = new BABYLON.Color3(0.45,0.75,1);
	
	// Enable Collisions
    scene.collisionsEnabled = true;
	
	// New rendering Pipeline
	var pipeline = new BABYLON.DefaultRenderingPipeline(
		"default", // The name of the pipeline
		true, // Do you want HDR textures ?
		scene, // The scene instance
		[camera] // The list of cameras to be attached to
	);
	
	// --Render Quality--
	
	// *LOW
	// nothing here
	
	// *MEDIUM
	//pipeline.fxaaEnabled = true;
	//pipeline.bloomEnabled = true;
	
	// *HIGH QUALITY
	pipeline.samples = 4;
	pipeline.bloomEnabled = true;
	
	// Light0
	light0 = new BABYLON.SpotLight("light0", new BABYLON.Vector3(90, 100, -100), new BABYLON.Vector3(0, -1, 1), 1.25, 2, scene);
	light0.diffuse = new BABYLON.Color3(1, 1, 1);
	light0.specular = new BABYLON.Color3(0.75, 0.75, 0.75);
	light0.groundColor = new BABYLON.Color3(0, 0, 0);
	
	// Sun Rays!
	var godrays = new BABYLON.VolumetricLightScatteringPostProcess('godrays', 1, camera, null, 100, BABYLON.Texture.BILINEAR_SAMPLINGMODE, engine, false);
	godrays.mesh.material.diffuseTexture = new BABYLON.Texture('/serving/textures/sun.png', scene, true, false, BABYLON.Texture.BILINEAR_SAMPLINGMODE);
	godrays.mesh.material.diffuseTexture.hasAlpha = true;
	godrays.mesh.position = light0.position;
	godrays.mesh.scaling = new BABYLON.Vector3(13, 13, 13);
	
	
	// Light boxes??
	
	var myBox = BABYLON.MeshBuilder.CreateBox("myBox", {height: 4.5, width: 1, depth: 1}, scene);
	myBox.position = new BABYLON.Vector3(50,1,0);
	myBox.material = new BABYLON.StandardMaterial("myBox", scene);
	myBox.material.diffuseColor = new BABYLON.Color3(0, 0, 0);
	myBox.material.specularColor = new BABYLON.Color3(0, 0, 0);
	myBox.material.emissiveColor = new BABYLON.Color3(1, 0.25, 0.25);
	
	var light1 = new BABYLON.PointLight("light", new BABYLON.Vector3(0, 1, 0), scene);
	light1.diffuse = new BABYLON.Color3(1, 0.15, 0.15);
	light1.specular = new BABYLON.Color3(1, 0.15, 0.15);
	light1.position = new BABYLON.Vector3(50,1,0);
	light1.range = 3.5;
	light1.intensity = 2;
	
	
	
	
	
	// Light Tracker
	/*var lightTracker = BABYLON.MeshBuilder.CreateSphere("lightTracker", {diameter: 5, diameterX: 5}, scene);

	engine.runRenderLoop(function () {
		lightTracker.position = light0.position;
	});*/

	
	// Shadows
	var shadowGenerator = new BABYLON.ShadowGenerator(2068, light0);
	//light0.shadowMaxZ = 100;
	//light0.shadowMinZ = -100;
	shadowGenerator.useContactHardeningShadow = true;
	shadowGenerator.contactHardeningLightSizeUVRatio = 0.4;
	shadowGenerator.setDarkness(0.35);
	
	// Shadow Bias!! 
	// ** Play with these once new columns are placed
	//
	shadowGenerator.bias = 0.0001;
	//shadowGenerator.normalBias = 0.01;
	
	
	
	// Materials
	var startMat = new BABYLON.StandardMaterial("startMat", scene);
	startMat.diffuseColor = new BABYLON.Color3(0, 0, 0);
	startMat.specularColor = new BABYLON.Color3(0, 0, 0);
	startMat.emissiveColor = new BABYLON.Color3(1, 1, 1);

	// Configure Blender scene
	for(var x=0; x<importedMeshes.length; x++){

		// Collisions
		importedMeshes[x].checkCollisions = true;
		
		
		// Shading
		if(importedMeshes[x].id!="startBox"){
			importedMeshes[x].receiveShadows = true;
			shadowGenerator.addShadowCaster(importedMeshes[x]);
		}
		
		
		// Materials
		if(importedMeshes[x].id=="startBox"){
			importedMeshes[x].material = startMat;
		}else if(importedMeshes[x].id=="startBoxDoorway"){
			importedMeshes[x].material.specularColor = new BABYLON.Color3(0, 0, 0);
		}else if(importedMeshes[x].id=="ring1"){
			importedMeshes[x].material.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1);
		}else if(importedMeshes[x].id=="ring2"){
			
		}else if(importedMeshes[x].id=="ring3"){
			importedMeshes[x].material.specularColor = new BABYLON.Color3(0, 0, 0);
		}else if(importedMeshes[x].id=="ring4"){
			
		}else if(importedMeshes[x].id=="lobbyCylinder"){
			importedMeshes[x].material.specularColor = new BABYLON.Color3(0, 0, 0);
		}else if(importedMeshes[x].id.substring(0,8)=="lobbyTop"){
			importedMeshes[x].material.specularColor = new BABYLON.Color3(0, 0, 0);
		}else if(importedMeshes[x].id.substring(0,4)=="cBox" || importedMeshes[x].id=="mapBox"){
			importedMeshes[x].visibility = false;
		}else if(importedMeshes[x].id.substring(0,3)=="col"){
			
		}else if(importedMeshes[x].id=="mapStand"){
			importedMeshes[x].material = new BABYLON.StandardMaterial("standMat", scene);
			importedMeshes[x].material.diffuseColor = new BABYLON.Color3(0.05, 0.05, 0.05);
			importedMeshes[x].material.specularColor = new BABYLON.Color3(0.5, 0.5, 0.5);
		}else if(importedMeshes[x].id=="map"){
			importedMeshes[x].material.emissiveColor = new BABYLON.Color3(0.3, 0.3, 0.3);
		}
		
	}





	
	
    
}