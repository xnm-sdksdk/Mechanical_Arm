import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  1000
);

const controls = new OrbitControls(camera, renderer.domElement);
const loader = new GLTFLoader();

// Plane
const floor = new THREE.TextureLoader().load("../assets/Material_1861.jpg");

function PlaneConstructor() {
  this.geometry = new THREE.PlaneGeometry(100, 100);
  this.material = new THREE.MeshBasicMaterial({
    map: floor,
    // roughness: 7,
    // metalness: 5,
  });
  this.mesh = new THREE.Mesh(this.geometry, this.material);
  this.mesh.position.set(0, -5, 0);
  this.mesh.rotation.x = -Math.PI / 2;
  scene.add(this.mesh);
}

let customPositionPlane = new PlaneConstructor({
  position: new THREE.Vector3(0, 0, 0),
});

PlaneConstructor.prototype.update = () => {};

const cylinderMetal = new THREE.TextureLoader().load(
  "../assets/Metal_Plate_Cylinder.jpg"
);

function CylinderConstructor() {
  this.geometry = new THREE.CylinderGeometry(5, 5, 10, 32);
  this.material = new THREE.MeshBasicMaterial({
    map: cylinderMetal,
  });
  this.mesh = new THREE.Mesh(this.geometry, this.material);
  scene.add(this.mesh);

  let axesHelper = new THREE.AxesHelper(10);
  this.mesh.add(axesHelper);

  this.pivot = new THREE.Group();
  this.pivot.add(this.mesh);

  this.lowerArmGeometry = new THREE.CylinderGeometry(5, 5, 10, 32);
  this.lowerArmMaterial = new THREE.MeshBasicMaterial({ map: cylinderMetal });
  this.lowerArmMesh = new THREE.Mesh(
    this.lowerArmGeometry,
    this.lowerArmMaterial
  );
  this.lowerArmMesh.add(axesHelper);
  this.lowerArmMesh.position.y = 15;
  this.lowerArmMesh.position.x = 0;
  this.pivot.add(this.lowerArmMesh);
  scene.add(this.pivot);
}

let customPositionCylinder = new CylinderConstructor({
  position: new THREE.Vector3(0, 0, 0),
});

function EdgesConstructor() {}

CylinderConstructor.prototype.update = () => {};

const sphereMetal = new THREE.TextureLoader().load("../assets/MetalSphere.jpg");

function SphereConstructor() {
  this.geometry = new THREE.SphereGeometry(5, 64, 32);
  this.material = new THREE.MeshBasicMaterial({ map: sphereMetal });
  this.sphere = new THREE.Mesh(this.geometry, this.material);
  this.sphere.position.y = 7;

  let axesHelper = new THREE.AxesHelper(15);
  this.sphere.add(axesHelper);

  this.pivot = new THREE.Group();
  this.pivot.add(this.sphere);

  this.secondArticulation = new THREE.SphereGeometry(5, 64, 32);
  this.secondArticulationMaterial = new THREE.MeshBasicMaterial({
    map: sphereMetal,
  });
  this.sphereArticulation = new THREE.Mesh(
    this.secondArticulation,
    this.secondArticulationMaterial
  );
  this.sphereArticulation.position.y = 22;

  let secondArticulationHelper = new THREE.AxesHelper(15);
  this.sphereArticulation.add(secondArticulationHelper);

  this.pivot.add(this.sphereArticulation);

  scene.add(this.sphere);
  scene.add(this.pivot);
}

let customPositionSphere = new SphereConstructor({
  position: new THREE.Vector3(0, 0, 0),
});

SphereConstructor.prototype.update = () => {};

const boxPlate = new THREE.TextureLoader().load("../assets/MetalPlate.jpg");
const boxSquare = new THREE.TextureLoader().load("../assets/MetalSquare.jpg");

function BoxConstructor() {
  this.geometry = new THREE.BoxGeometry(10, 10, 10);
  this.material = new THREE.MeshBasicMaterial({
    map: boxPlate,
  });
  this.cube = new THREE.Mesh(this.geometry, this.material);
  this.cube.position.x = 35;
  this.cube.position.y = 0;

  this.boxSquareGeometry = new THREE.BoxGeometry(10, 10, 10);
  this.boxSquareMaterial = new THREE.MeshBasicMaterial({
    map: boxSquare,
  });
  this.boxSquareCube = new THREE.Mesh(
    this.boxSquareGeometry,
    this.boxSquareMaterial
  );
  this.boxSquareCube.position.x = 35;
  this.boxSquareCube.position.y = 0;
  this.boxSquareCube.position.z = 15;
  scene.add(this.cube, this.boxSquareCube);
}

let customPositionCube = new BoxConstructor({
  position: new THREE.Vector3(0, 0, 0),
});

camera.position.set(0, 20, 100);
controls.update();

// Render loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();

  // Render the scene
  renderer.render(scene, camera);
}

// Start the animation loop
animate();
