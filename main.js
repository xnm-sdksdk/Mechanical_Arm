// Imports
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DragControls } from "three/addons/controls/DragControls.js";

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Initialization of Scene and Camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  1000
);

// Event to resize automatically the window
window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

const controls = new OrbitControls(camera, renderer.domElement);
const loader = new GLTFLoader();

// Plane
const floor = new THREE.TextureLoader().load("../assets/Material_1861.jpg");

// Plane Definition
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

// Cylinder Definition
function CylinderConstructor() {
  // First Cylinder
  this.geometry = new THREE.CylinderGeometry(5, 5, 10, 32);
  this.material = new THREE.MeshBasicMaterial({
    map: cylinderMetal,
  });
  this.mesh = new THREE.Mesh(this.geometry, this.material);
  scene.add(this.mesh);

  let axesHelper = new THREE.AxesHelper(18);
  this.mesh.add(axesHelper);

  this.pivot = new THREE.Group();
  this.pivot.add(this.mesh);

  // Second Cylinder
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

  // Third Cylinder
  this.upperArmGeometry = new THREE.CylinderGeometry(5, 5, 10, 32);
  this.upperArmMaterial = new THREE.MeshBasicMaterial({ map: cylinderMetal });
  this.upperArmMesh = new THREE.Mesh(
    this.upperArmGeometry,
    this.upperArmMaterial
  );
  this.upperArmMesh.add(axesHelper);
  this.upperArmMesh.position.y = 30;
  this.upperArmMesh.position.x = 0;
  this.pivot.add(this.upperArmMesh);
  scene.add(this.pivot);
}

let customPositionCylinder = new CylinderConstructor({
  position: new THREE.Vector3(0, 0, 0),
});

function EdgesConstructor() {}

CylinderConstructor.prototype.update = () => {};

const sphereMetal = new THREE.TextureLoader().load("../assets/MetalSphere.jpg");

// Sphere Definition
function SphereConstructor() {
  // First Sphere
  this.geometry = new THREE.SphereGeometry(5, 64, 32);
  this.material = new THREE.MeshBasicMaterial({ map: sphereMetal });
  this.sphere = new THREE.Mesh(this.geometry, this.material);
  this.sphere.position.y = 7;

  let axesHelper = new THREE.AxesHelper(15);
  this.sphere.add(axesHelper);

  this.pivot = new THREE.Group();
  this.pivot.add(this.sphere);

  // Second Sphere
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

  // Third Sphere
  this.firstArticulation = new THREE.SphereGeometry(5, 64, 32);
  this.firstArticulationMaterial = new THREE.MeshBasicMaterial({
    map: sphereMetal,
  });
  this.firstSphereArticulation = new THREE.Mesh(
    this.firstArticulation,
    this.firstArticulationMaterial
  );
  this.firstSphereArticulation.position.y = 37;

  let firstArticulationHelper = new THREE.AxesHelper(15);
  this.firstSphereArticulation.add(firstArticulationHelper);

  this.pivot.add(this.firstSphereArticulation);

  scene.add(this.sphere);
  scene.add(this.pivot);
}

let customPositionSphere = new SphereConstructor({
  position: new THREE.Vector3(0, 0, 0),
});

SphereConstructor.prototype.update = () => {};

const boxPlate = new THREE.TextureLoader().load("../assets/MetalPlate.jpg");
const boxSquare = new THREE.TextureLoader().load("../assets/MetalSquare.jpg");
const boxMetal = new THREE.TextureLoader().load("../assets/MetalBox.jpg");

// Box Definition
function BoxConstructor() {
  // First Box
  this.geometry = new THREE.BoxGeometry(10, 10, 10);
  this.material = new THREE.MeshBasicMaterial({
    map: boxPlate,
  });
  this.cube = new THREE.Mesh(this.geometry, this.material);
  this.cube.position.x = 35;
  this.cube.position.y = 0;

  // Second Box
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

  // Third Box
  this.thirdBox = new THREE.BoxGeometry(10, 10, 10);
  this.thirdBoxMaterial = new THREE.MeshBasicMaterial({ map: boxMetal });
  this.thirdCube = new THREE.Mesh(this.thirdBox, this.thirdBoxMaterial);
  this.thirdCube.position.y = 0;
  this.thirdCube.position.x = 35;
  this.thirdCube.position.z = -15;
  scene.add(this.cube, this.boxSquareCube, this.thirdCube);
}

let customPositionCube = new BoxConstructor({
  position: new THREE.Vector3(0, 0, 0),
});

// const cubes = [""];

// const geometryl = new THREE.SphereGeometry(100, 100, 100);

// const wireframe = new THREE.WireframeGeometry(geometryl);

// const line = new THREE.LineSegments(wireframe);
// line.material.depthTest = false;
// line.material.opacity = 0.25;
// line.material.transparent = true;

// scene.add(line);

// const geometry = new THREE.BoxGeometry(100, 100, 100);
// const edges = new THREE.EdgesGeometry(geometry);
// const linel = new THREE.LineSegments(
//   edges,
//   new THREE.LineBasicMaterial({ color: 0xffffff })
// );
// scene.add(linel);

// DragControls
// const dragControls = new DragControls(cubes, camera, renderer.domElement);

// add event listener to highlight dragged objects

// dragControls.addEventListener("dragstart", function (event) {
//   event.object.material.emissive.set(0xaaaaaa);
// });

// dragControls.addEventListener("dragend", function (event) {
//   event.object.material.emissive.set(0x000000);
// });

// Camera Position
camera.position.set(0, 20, 100);
controls.update();

// Render loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();

  // line.rotation.x += 0.001;
  // line.rotation.y += 0.00001;
  // line.rotation.z += 0.00001;
  // Render the scene
  renderer.render(scene, camera);
}

// Start the animation loop
animate();
