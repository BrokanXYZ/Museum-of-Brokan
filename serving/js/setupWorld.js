
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
	scene.clearColor = new BABYLON.Color3(0.45,0.75,1);
	
	// Enable Collisions
    scene.collisionsEnabled = true;
	
	// Light0
	light0 = new BABYLON.SpotLight("light0", new BABYLON.Vector3(90, 100, -72), new BABYLON.Vector3(0, -1, 1), 1.25, 2, scene);
	light0.diffuse = new BABYLON.Color3(1, 1, 1);
	light0.specular = new BABYLON.Color3(0.75, 0.75, 0.75);
	light0.groundColor = new BABYLON.Color3(0, 0, 0);
	
	// Sun Rays!
	var godrays = new BABYLON.VolumetricLightScatteringPostProcess('godrays', 1, camera, null, 100, BABYLON.Texture.BILINEAR_SAMPLINGMODE, engine, false);
	godrays.mesh.material.diffuseTexture = new BABYLON.Texture('/serving/textures/sun.png', scene, true, false, BABYLON.Texture.BILINEAR_SAMPLINGMODE);
	godrays.mesh.material.diffuseTexture.hasAlpha = true;
	godrays.mesh.position = light0.position;
	godrays.mesh.scaling = new BABYLON.Vector3(13, 13, 13);
	
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
	

	// Materials
	var startMat = new BABYLON.StandardMaterial("startMat", scene);
	startMat.diffuseColor = new BABYLON.Color3(0, 0, 0);
	startMat.specularColor = new BABYLON.Color3(0, 0, 0);
	startMat.emissiveColor = new BABYLON.Color3(1, 1, 1);
	
	
	ring2 = new BABYLON.StandardMaterial("ring2", scene);
	ring2.diffuseColor = new BABYLON.Color3(1, 1, 1);
	ring2.specularColor = new BABYLON.Color3(0.2, 0.2, 0.2);
	ring2.emissiveColor = new BABYLON.Color3(0, 0, 0);
	
	ring4= new BABYLON.StandardMaterial("ring4", scene);
	ring4.diffuseColor = new BABYLON.Color3(1, 1, 0.75);
	ring4.specularColor = new BABYLON.Color3(0.35, 0.35, 0.35);
	ring4.emissiveColor = new BABYLON.Color3(0.1, 0.1, 0);
	

	// Import Blender scene
	BABYLON.SceneLoader.ImportMesh("", "/serving/meshes/", "lobby.babylon", scene, function (newMeshes) {
		
		console.log(newMeshes);
		
		
		for(var x=0; x<newMeshes.length; x++){
		
			newMeshes[x].checkCollisions = true;

			if(newMeshes[x].id=="startBox"){
				newMeshes[x].material = startMat;
			}else if(newMeshes[x].id=="ring1"){
				newMeshes[x].material.specularColor = new BABYLON.Color3(0.2, 0.2, 0.2);
				newMeshes[x].receiveShadows = true;
			}else if(newMeshes[x].id=="ring2"){
				newMeshes[x].material = ring2;
				newMeshes[x].receiveShadows = true;
			}else if(newMeshes[x].id=="ring3"){
				newMeshes[x].material.specularColor = new BABYLON.Color3(0.5, 0.5, 0.5);
				newMeshes[x].material.emissiveColor = new BABYLON.Color3(0.2, 0.2, 0.2);
				newMeshes[x].receiveShadows = true;
			}else if(newMeshes[x].id=="ring4"){
				newMeshes[x].material = ring4;
				newMeshes[x].receiveShadows = true;
			}else if(newMeshes[x].id=="lobbyCylinder"){
				//shadowGenerator.addShadowCaster(newMeshes[x]);
				newMeshes[x].receiveShadows = true;
			}else if(newMeshes[x].id.substring(0,6)=="colBox"){
				newMeshes[x].visibility = false;
			}else{
				shadowGenerator.addShadowCaster(newMeshes[x]);
			}
		}
		
	});
	

	
	
	
	
	
	
	
    
	
    
}