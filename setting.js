 //基本設定
 var width = 900;//横幅
 var height = 900;//縦幅

 var renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#canvas"),//id="canvas"に描画
  alpha: true //背景を透過する
 });
 renderer.setPixelRatio(window.devicePixelRatio);
 renderer.setSize(width, height);
 var scene = new THREE.Scene();

 // カメラ設定
 var camera = new THREE.PerspectiveCamera(3,width / height,1,10000);//視野角,縦横比,手前の距離,奥の距離
 camera.position.set(0, 0, 1000);//カメラ位置
    
 // ライト設定
 ambientLight = new THREE.AmbientLight(0xffffff);//環境光源
 hemisphereLight = new THREE.HemisphereLight(0xffffff,0x4169e1, 0.5);//半球光源
 scene.add(hemisphereLight);
 scene.add(ambientLight);


 // ★追加 マウス操作
 var controls = new THREE.OrbitControls(camera);
 controls.enableZoom = false;
 controls.autoRotate = true;

 // ★追加 MTL,Obj読み込み
 new THREE.MTLLoader().setPath('./three/')
 .load('table.mtl',
 function(materials){
  materials.preload();
  new THREE.OBJLoader().setPath('./three/').setMaterials(materials).load('table.obj',
  function(object){
   objmodel = object.clone();
   obj = new THREE.Object3D();
   obj.add(objmodel);
   obj.position.set(0, -1.2, 0);
   scene.add(obj);        
  }
  );
 });
 var obj = new THREE.Mesh();


 // ボックス
  geometry = new THREE.BoxGeometry(10, 10, 10);//x,y,z
  material = new THREE.MeshStandardMaterial({color: 0xaaaaaa});
  box = new THREE.Mesh(geometry, material);
  scene.add(box);


 // 実行
 animate();
 function animate(){
   renderer.render(scene, camera);
 };