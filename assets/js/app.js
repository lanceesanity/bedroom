//COLORS
let Colors = {
    red:0xf25346,
    white:0xd8d0d1,
    brown:0x59332e,
    pink:0xF5986E,
    brownDark:0x23190f,
    blue:0x68c3c0,
  };
  
  // THREEJS RELATED VARIABLES
  
  let scene,
    camera, fieldOfView, aspectRatio, nearPlane, farPlane,
    renderer, container;
  
  
  //INIT THREE JS, SCREEN AND MOUSE EVENTS
  
  function createScene() {
  
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  
  scene = new THREE.Scene();
  aspectRatio = WIDTH / HEIGHT;
  fieldOfView = 105;
  nearPlane = 1;
  farPlane = 10000;
  
  camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane
    );
  
  // scene.fog = new THREE.Fog(0x404040, 100,950);

  camera.position.x = 100;
  //adjust position of charaacter
  camera.position.z = 200;
  
  camera.position.y = 200;
  camera.rotation.y =0.1;
  
  
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(WIDTH, HEIGHT);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type=THREE.BasicShadowMap;
  container = document.getElementById('world');
  container.appendChild(renderer.domElement);
  
  window.addEventListener('resize', handleWindowResize, false);
  }
  
  // HANDLE SCREEN EVENTS
  
  function handleWindowResize() {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = WIDTH / HEIGHT;
  camera.updateProjectionMatrix();
  }
  
  
  // LIGHTS
  
  let ambientLight, hemisphereLight, shadowLight;
  
  function createLights() {
  
  hemisphereLight = new THREE.HemisphereLight(0xaaaaaa,0x000000, .9)
  shadowLight = new THREE.DirectionalLight(0xffffff, .9);
  ambientLight = new THREE.AmbientLight( 0x404040, 0.9); // soft white light
  pointLight = new THREE.PointLight(0xffffff, 1,100);

  pointLight.position.set(-10,600,-1800);
  pointLight.castShadow = true;
  pointLight.shadow.camera.near = 1;
  pointLight.shadow.camera.far = 20000;
  
  shadowLight.position.set(-10, 600, -1800);
  shadowLight.castShadow = true;
  
  scene.add(hemisphereLight);
  scene.add(shadowLight);
  scene.add(ambientLight);
  scene.add(pointLight);
  }
  
  
  let Room = function(){
  this.mesh = new THREE.Object3D();
  this.mesh.receiveShadow = true;
  this.mesh.castShadow=true;
  this.mesh.name = "Room";
  controls = new THREE.OrbitControls (camera, renderer.domElement);

  // Create the main floor
  const geomBuilding= new THREE.BoxGeometry(5000,100,2500,1,1,1);
  //texture for main floor
  let textureMain = new THREE.TextureLoader().load( 'assets/textures/wood2.jpg' );
  let matBuilding = new THREE.MeshPhongMaterial({shading:THREE.FlatShading, map:textureMain});
  let building = new THREE.Mesh(geomBuilding, matBuilding);
  building.position.x =- 1;
  building.position.y =- 400;
  building.position.z =- 1;
  building.castShadow = true;
  building.receiveShadow = true;
  this.mesh.add(building);
  
  
  // Create the main wall
  const geomWall= new THREE.BoxGeometry(100,2000,2500,1,1,1);
  //texture for main wall
  let textureWall = new THREE.TextureLoader().load( 'assets/textures/wood2.jpg' );
  let matWall = new THREE.MeshPhongMaterial({shading:THREE.FlatShading, map:textureWall});
  let wall = new THREE.Mesh(geomWall, matWall);
  wall.position.x =- 2500;
  wall.position.y = 600;
  wall.position.z =- 1;
  wall.castShadow = true;
  wall.receiveShadow = true;
  this.mesh.add(wall);

  // Create the 2nd main wall
  const geomWall2= new THREE.BoxGeometry(100,2000,2500,1,1,1);
  let textureWall2 = new THREE.TextureLoader().load( 'assets/textures/wood2.jpg' );
  let matWall2 = new THREE.MeshPhongMaterial({shading:THREE.FlatShading, map:textureWall2});
  let wall2 = new THREE.Mesh(geomWall2, matWall2);
  wall2.position.x = 2500;
  wall2.position.y = 600;
  wall2.position.z =- 1;
  wall2.castShadow = true;
  wall2.receiveShadow = true;
  this.mesh.add(wall2);


  // Create window
  const geomWindow= new THREE.BoxGeometry(1000,1000,200,1,1,1);
  let textureWindow= new THREE.TextureLoader().load( 'assets/textures/window4.png' );
  let matWindow = new THREE.MeshPhongMaterial({shading:THREE.FlatShading,transparent:true,opacity:5,map:textureWindow});
  this.window = new THREE.Mesh(geomWindow, matWindow);
  this.window.position.set(-10,0,1200);
  this.window.rotation.y= 11;
  this.window.castShadow = true;
  this.window.receiveShadow = true;

   // Create door
  const geomDoor= new THREE.BoxGeometry(1000,1500,200,1,1,1);
  let textureDoor= new THREE.TextureLoader().load( 'assets/textures/door3.png' );
  let matDoor = new THREE.MeshPhongMaterial({shading:THREE.FlatShading, map:textureDoor,transparent:true});
  this.door = new THREE.Mesh(geomDoor, matDoor);
  this.door.position.set(-10,-200,-1000);
  this.door.rotation.y = 11;
  this.door.castShadow = true;
  this.door.receiveShadow = true;

  // Create the 3rd main wall
  const geomWall3= new THREE.BoxGeometry(100,2000,5000,1,1,1);
  let textureWall3 = new THREE.TextureLoader().load( 'assets/textures/wood2.jpg' );
  let matWall3 = new THREE.MeshPhongMaterial({shading:THREE.FlatShading, map:textureWall3,transparent:true});
  this.wall3 = new THREE.Mesh(geomWall3, matWall3);
  this.wall3.position.x = -10;
  this.wall3.position.y = 600;
  this.wall3.position.z =- 1200;
  this.wall3.rotation.y = 11;
  this.wall3.castShadow = true;
  this.wall3.receiveShadow = true;
  this.wall3.add(this.window);
  this.wall3.add(this.door);
  this.mesh.add(this.wall3);
  
  // Create the 4th main wall
  const geomWall4= new THREE.BoxGeometry(100,2000,5000,1,1,1);
  let textureWall4 = new THREE.TextureLoader().load( 'assets/textures/wood2.jpg' );
  let matWall4 = new THREE.MeshPhongMaterial({shading:THREE.FlatShading, map:textureWall4});
  let wall4 = new THREE.Mesh(geomWall4, matWall4);
  wall4.position.x = 10;
  wall4.position.y = 600;
  wall4.position.z = 1200;
  wall4.rotation.y = 11;
  wall4.castShadow = true;
  wall4.receiveShadow = true;
  this.mesh.add(wall4);

  
  // Create dresser
  const geomDresser= new THREE.BoxGeometry(400,800,800,1,1,1);
  let textureDresser= new THREE.TextureLoader().load( 'assets/textures/planks.png' );
  let matDresser = new THREE.MeshLambertMaterial({shading:THREE.FlatShading, map:textureDresser});
  let dresser = new THREE.Mesh(geomDresser, matDresser);
  dresser.position.set(50,0,1000);
  dresser.rotation.y = 11;
  dresser.castShadow = true;
  dresser.receiveShadow = true;
  this.mesh.add(dresser);

  // Create bed
  const geomBed= new THREE.BoxGeometry(1500,1000,100,1,1,1);
  let textureBed= new THREE.TextureLoader().load( 'assets/textures/wool.png' );
  let matBed = new THREE.MeshPhongMaterial({shading:THREE.FlatShading, map:textureBed});
  let bed = new THREE.Mesh(geomBed, matBed);
  bed.position.set(-1500,-200,0);
  bed.rotation.x =11;
  bed.castShadow = true;
  bed.receiveShadow = true;
  this.mesh.add(bed);

  // Create bed holder
  const geomHolder= new THREE.BoxGeometry(1700,1000,100,1,1,1);
  let textureHolder= new THREE.TextureLoader().load( 'assets/textures/wood.png' );
  let matHolder = new THREE.MeshStandardMaterial({shading:THREE.FlatShading, map:textureHolder});
  let holder = new THREE.Mesh(geomHolder, matHolder);
  holder.position.set(-1500,-300,0);
  holder.rotation.x =11;
  holder.castShadow = true;
  holder.receiveShadow = true;
  this.mesh.add(holder);

  

  //sky
  let skyTexture= new THREE.TextureLoader().load( 'assets/textures/water.jpg' );
  let skyMat= new THREE.MeshBasicMaterial({map:skyTexture})
  };
  
  
  Grass = function(){
  let geomGrass = new THREE.PlaneGeometry(10000,10000,5000);
  geomGrass.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));
  let textureGrass = new THREE.TextureLoader().load( 'assets/textures/grass.png' );
  let matGrass = new THREE.MeshPhongMaterial({
    color:Colors.blue,
    // transparent:true,
    // opacity:.6,
    shading:THREE.FlatShading,
    map: textureGrass
  });
  this.mesh = new THREE.Mesh(geomGrass, matGrass);
  this.mesh.receiveShadow = true;
  }
   
  // 3D Models
  let grass;
  let room;
  
  function createRoom(){
  room = new Room();
  room.mesh.scale.set(.25,.25,.25);
  room.mesh.position.y = 100;
  scene.add(room.mesh);
  }
  
  function createGrass(){
  grass = new Grass();
  scene.add(grass.mesh);
  }
  
  function loop(){
  controls.update();
  renderer.render(scene, camera);
  renderer.shadowMapEnabled=true;
  requestAnimationFrame(loop);
  }
  
  
  function init(event){
  createScene();
  createLights();
  createRoom();
  createGrass();
  loop();
  }
  
  window.addEventListener('load', init, false);  