// Configuration de base
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
    antialias: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(50);

// Création des particules
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 2000;
const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 30;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

// Matériel des particules
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    color: '#FF69B4',
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

// Création du système de particules
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Animation
function animate() {
    requestAnimationFrame(animate);
    
    particlesMesh.rotation.x += 0.0005;
    particlesMesh.rotation.y += 0.0003;
    
    renderer.render(scene, camera);
}

// Gestion du redimensionnement
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Interaction avec la souris
document.addEventListener('mousemove', (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    
    particlesMesh.rotation.x = mouseY * 0.0001;
    particlesMesh.rotation.y = mouseX * 0.0001;
});

// Démarrer l'animation
animate(); 