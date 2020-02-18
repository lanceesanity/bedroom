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
  
  
  //INIT THREE JS, SCREEN
  
  function createScene() {
  
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  
  scene = new THREE.Scene();
  aspectRatio = WIDTH / HEIGHT;
  fieldOfView = 100;
  nearPlane = 1;
  farPlane = 10000;
  
  camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane
    );
  
    // scene.fog = new THREE.Fog(0xf7d9aa, 100,950);

  camera.position.x = 100;
  //adjust position of charaacter
  camera.position.z = 200;
  
  camera.position.y = 400;
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
  ambientLight = new THREE.AmbientLight( 0xffffff, 0.6); // soft white light
  pointLight = new THREE.PointLight(0xffffff, 1,100);

  pointLight.position.set(-10,600,-1800);
  pointLight.castShadow = true;
  pointLight.shadow.camera.near = 1;
  pointLight.shadow.camera.far = 20000;
  
  shadowLight.position.set(-10, 600, -1800);
  shadowLight.castShadow = true;
  
  shadowLight.shadow.camera.left = -800;
  shadowLight.shadow.camera.right = 800;
  shadowLight.shadow.camera.top = 800;
  shadowLight.shadow.camera.bottom = -800;

  shadowLight.shadow.camera.near = 1;
  shadowLight.shadow.camera.far = 10000;
  shadowLight.shadow.mapSize.width = 2048;
  shadowLight.shadow.mapSize.height = 2048;
  
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
  
  //create roof
  const geomRoof= new THREE.BoxGeometry(5000,500,2500,1,1,1);
  let textureRoof= new THREE.TextureLoader().load( 'assets/textures/roof.png' );
  let matRoof = new THREE.MeshPhongMaterial({shading:THREE.FlatShading, map:textureRoof});
  let roof = new THREE.Mesh(geomRoof, matRoof);
  roof.position.set(-1,1850 ,-1);
  roof.castShadow = true;
  roof.receiveShadow = true;
  this.mesh.add(roof);

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


  // Create window transparent:true,opacity:.9
  const geomWindow= new THREE.BoxGeometry(800,1000,20,1,1,1);
  let textureWindow= new THREE.TextureLoader().load( 'assets/textures/window.png' );
  let matWindow = new THREE.MeshPhongMaterial({shading:THREE.FlatShading,transparent:true,opacity:.9,map:textureWindow});
  this.window = new THREE.Mesh(geomWindow, matWindow);

  this.window.position.set(-200,-680,1250);
  this.window.rotation.y= -0.9;
  this.window.castShadow = true;
  this.window.receiveShadow = true;

  this.window2 = new THREE.Mesh(geomWindow, matWindow);
  this.window2.position.set(-250,-680,2750);
  this.window2.rotation.y= 0.9;
  this.window2.castShadow = true;
  this.window2.receiveShadow = true;

  this.window3 = new THREE.Mesh(geomWindow, matWindow);
  this.window3.position.set(-250,-680,-1250);
  this.window3.rotation.y= 0.9;
  this.window3.castShadow = true;
  this.window3.receiveShadow = true;

  this.window4 = new THREE.Mesh(geomWindow, matWindow);
  this.window4.position.set(-200,-680,-2750);
  this.window4.rotation.y= -0.9;
  this.window4.castShadow = true;
  this.window4.receiveShadow = true;

   // Create door
  const geomDoor= new THREE.BoxGeometry(1000,1500,200,1,1,1);
  let textureDoor= new THREE.TextureLoader().load( 'assets/textures/door3.png' );
  let matDoor = new THREE.MeshPhongMaterial({shading:THREE.FlatShading, map:textureDoor,transparent:true});
  this.door = new THREE.Mesh(geomDoor, matDoor);
  this.door.position.set(-10,-1000 ,-1);
  this.door.rotation.y = 11;
  this.door.castShadow = true;
  this.door.receiveShadow = true;

  // Create the 3rd main wall
  const geomWall3= new THREE.BoxGeometry(100,500,5000,1,1,1);
  let textureWall3 = new THREE.TextureLoader().load( 'assets/textures/wood2.jpg' );
  let matWall3 = new THREE.MeshPhongMaterial({shading:THREE.FlatShading, map:textureWall3,transparent:true});
  this.wall3 = new THREE.Mesh(geomWall3, matWall3);
  this.wall3.position.x = -10;
  this.wall3.position.y = 1350;
  this.wall3.position.z =- 1200;
  this.wall3.rotation.y = 11;
  this.wall3.castShadow = true;
  this.wall3.receiveShadow = true;
  this.wall3.add(this.door);
  this.wall3.add(this.window);
  this.wall3.add(this.window2);
  this.wall3.add(this.window3);
  this.wall3.add(this.window4);
  this.mesh.add(this.wall3);
  
  //create subwall 1
  const subWall1= new THREE.BoxGeometry(100,800,5000,1,1,1);
  let texturesubWall1 = new THREE.TextureLoader().load( 'assets/textures/wood2.jpg' );
  let matsubWall1 = new THREE.MeshPhongMaterial({shading:THREE.FlatShading, map:texturesubWall1,transparent:true});
  let subwall1 = new THREE.Mesh(subWall1, matsubWall1);
  subwall1.position.x = -10;
  subwall1.position.y = -100;
  subwall1.position.z =- 1200;
  subwall1.rotation.y = 11;
  subwall1.castShadow = true;
  subwall1.receiveShadow = true;
  this.mesh.add(subwall1);
  //create subwall 2
  const subWall2= new THREE.BoxGeometry(100,800,1000,1,1,1);
  let texturesubWall2 = new THREE.TextureLoader().load( 'assets/textures/wood2.jpg' );
  let matsubWall2 = new THREE.MeshPhongMaterial({shading:THREE.FlatShading, map:texturesubWall2,transparent:true});
  let subwall2 = new THREE.Mesh(subWall2, matsubWall2);
  subwall2.position.x = -1000;
  subwall2.position.y = 700;
  subwall2.position.z =- 1200;
  subwall2.rotation.y =  11;
  subwall2.castShadow = true;
  subwall2.receiveShadow = true;
  this.mesh.add(subwall2);
  //create subwall 2
  const subWall3= new THREE.BoxGeometry(100,800,1000,1,1,1);
  let texturesubWall3 = new THREE.TextureLoader().load( 'assets/textures/wood2.jpg' );
  let matsubWall3 = new THREE.MeshPhongMaterial({shading:THREE.FlatShading, map:texturesubWall3,transparent:true});
  let subwall3 = new THREE.Mesh(subWall3, matsubWall3);
  subwall3.position.x = 1000;
  subwall3.position.y = 700;
  subwall3.position.z =- 1200;
  subwall3.rotation.y =  11;
  subwall3.castShadow = true;
  subwall3.receiveShadow = true;
  this.mesh.add(subwall3);

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
  //create pillow
  const geomPillow= new THREE.BoxGeometry(200,1000,100,1,1,1);
  let texturePillow= new THREE.TextureLoader().load( 'assets/textures/wool.png' );
  let matPillow = new THREE.MeshPhongMaterial({shading:THREE.FlatShading, map:texturePillow});
  let pillow = new THREE.Mesh(geomPillow, matPillow);
  pillow.position.set(-2100,-100,0);
  pillow.rotation.x =11;
  pillow.castShadow = true;
  pillow.receiveShadow = true;
  this.mesh.add(pillow);

  //create blanket
  const geomBlanket= new THREE.BoxGeometry(900,1000,10,1,1,1);
  let textureBlanket= new THREE.TextureLoader().load( 'assets/textures/gray.jpg' );
  let matBlanket = new THREE.MeshPhongMaterial({shading:THREE.FlatShading, map:textureBlanket});
  let blanket = new THREE.Mesh(geomBlanket, matBlanket);
  blanket.position.set(-1300,-120,0);
  blanket.rotation.x =11;
  blanket.castShadow = true;
  blanket.receiveShadow = true;
  this.mesh.add(blanket);
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

  // Create tv
  const geomTv= new THREE.BoxGeometry(1500,700,70,1,1,1);
  let textureTv= new THREE.TextureLoader().load( 'assets/textures/tv.png' );
  let matTv = new THREE.MeshStandardMaterial({shading:THREE.FlatShading, map:textureTv});
  let tv = new THREE.Mesh(geomTv, matTv);
  tv.rotation.y=11;
  tv.position.set(2400,600,0);
  tv.castShadow = true;
  tv.receiveShadow = true;
  this.mesh.add(tv);

  // Create tv box
  const geomBox= new THREE.BoxGeometry(1500,100,70,1,1,1);
  let textureBox= new THREE.TextureLoader().load( 'assets/textures/wood.png' );
  let matBox = new THREE.MeshStandardMaterial({shading:THREE.FlatShading, map:textureBox});
  let box = new THREE.Mesh(geomBox, matBox);
  box.rotation.y=11;
  box.position.set(2400,1000,0);
  box.castShadow = true;
  box.receiveShadow = true;
  this.mesh.add(box);

  let box2 = new THREE.Mesh(geomBox, matBox);
  box2.rotation.y=11;
  box2.position.set(2400,200,0);
  box2.castShadow = true;
  box2.receiveShadow = true;
  this.mesh.add(box2);

  
  // Create table
  const geomTable= new THREE.BoxGeometry(1000,1000,70,1,1,1);
  let textureTable= new THREE.TextureLoader().load( 'assets/textures/wood.png' );
  let matTable = new THREE.MeshStandardMaterial({shading:THREE.FlatShading, map:textureTable});
  let table = new THREE.Mesh(geomTable, matTable);
  table.position.set(1500,1,0);
  table.rotation.x =11;
  table.castShadow = true;
  table.receiveShadow = true;
  this.mesh.add(table);

  // Create table leg
  const geomTableLeg= new THREE.BoxGeometry(100,50,400,1,1,1);
  let textureTableLeg= new THREE.TextureLoader().load( 'assets/textures/wood.png' );
  let matTableLeg = new THREE.MeshStandardMaterial({shading:THREE.FlatShading, map:textureTableLeg});
  let tableLeg = new THREE.Mesh(geomTableLeg, matTableLeg);
  tableLeg.position.set(1800,-200,400);
  tableLeg.rotation.x =11;
  tableLeg.castShadow = true;
  tableLeg.receiveShadow = true;
  this.mesh.add(tableLeg);


  let tableLeg2 = new THREE.Mesh(geomTableLeg, matTableLeg);
  tableLeg2.position.set(1800,-200,-400);
  tableLeg2.rotation.x =11;
  tableLeg2.castShadow = true;
  tableLeg2.receiveShadow = true;
  this.mesh.add(tableLeg2);
  

  let tableLeg3 = new THREE.Mesh(geomTableLeg, matTableLeg);
  tableLeg3.position.set(1200,-200,400);
  tableLeg3.rotation.x =11;
  tableLeg3.castShadow = true;
  tableLeg3.receiveShadow = true;
  this.mesh.add(tableLeg3);

  let tableLeg4 = new THREE.Mesh(geomTableLeg, matTableLeg);
  tableLeg4.position.set(1200,-200,-400);
  tableLeg4.rotation.x =11;
  tableLeg4.castShadow = true;
  tableLeg4.receiveShadow = true;
  this.mesh.add(tableLeg4);

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