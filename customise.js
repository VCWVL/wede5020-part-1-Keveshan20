// === Scene, camera, renderer ===
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xeeeeee);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / 600,
  0.1,
  1000
);
camera.position.set(0, 1.5, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, 600);
document.getElementById('car-container').appendChild(renderer.domElement);

// === Lights ===
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

scene.add(new THREE.AmbientLight(0x404040, 1.5));

// === Orbit Controls ===
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 2;
controls.maxDistance = 10;
controls.maxPolarAngle = Math.PI / 2;

// === Load the GLB car model ===
const loader = new THREE.GLTFLoader();
loader.load(
  "car.glb", // make sure this file is in the SAME folder as your HTML
  function (gltf) {
    const model = gltf.scene;

    // Auto scale & center
    model.scale.set(1, 1, 1);
    model.position.set(0, 0, 0);

    scene.add(model);
  },
  undefined,
  function (error) {
    console.error("Error loading model:", error);
  }
);

// === Animation loop ===
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// === Handle window resize ===
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / 600;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, 600);
});
