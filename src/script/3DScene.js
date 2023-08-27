import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const container = document.getElementById('container');
const objectWidth = 200;
const objectHeight = 200;

const movementAmplitude = 10; // Amplitude do movimento
const movementSpeed = 0.001;   // Velocidade do movimento

const stackInfo = [
  { name: 'CSS', modelPath: '/obj/css.obj' },
  { name: 'HTML', modelPath: '/obj/html.obj' },
  { name: 'JavaScript', modelPath: '/obj/js.obj' },
  { name: 'MySQL', modelPath: '/obj/mysql.obj' },
  { name: 'Git', modelPath: '/obj/git.obj' },
  { name: 'CPP', modelPath: '/obj/cpp.obj' },
  { name: 'SASS', modelPath: '/obj/sass.obj' },
  { name: 'Bootstrap', modelPath: '/obj/bootstrap.obj' },
  { name: 'JQuery', modelPath: '/obj/jquery.obj' }
];

const loader = new OBJLoader();

const objectScenes = stackInfo.map(stack => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, objectWidth / objectHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true });

  const canvas = renderer.domElement;
  canvas.style.width = objectWidth + 'px';
  canvas.style.height = objectHeight + 'px';
  container.appendChild(canvas);

  renderer.setSize(objectWidth, objectHeight);

  loader.load(stack.modelPath, obj => {
    const model = obj;

    // Ajuste o tamanho do objeto para preencher a cena
    const boundingBox = new THREE.Box3().setFromObject(model);
    const objectSize = new THREE.Vector3();
    boundingBox.getSize(objectSize);
    const maxDimension = Math.max(objectSize.x, objectSize.y, objectSize.z);
    
    // Aumente o fator de escala para tornar os objetos maiores
    const scaleFactor = 1.5; // Ajuste conforme necessário
    const objectScale = (objectWidth / maxDimension) * scaleFactor;
    model.scale.set(objectScale, objectScale, objectScale);

    scene.add(model);
  });

  // Posicione a câmera
  camera.position.z = 500;

  // Configurar as luzes e controles de órbita
  const light = new THREE.HemisphereLight(0xd4d4d4, 0xf5730a, 1);
  scene.add(light);

  const ambientLight = new THREE.AmbientLight(0x404040);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  scene.add(directionalLight);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.1;
  controls.rotateSpeed = 0.5;
  controls.enableZoom = false;

  return { scene, camera, renderer, controls };
});

function animate() {
  requestAnimationFrame(animate);
  const time = performance.now() * movementSpeed;

  objectScenes.forEach(({ scene, camera, renderer, controls }) => {
    scene.traverse(obj => {
      if (obj.isMesh) {
        // Calcule a posição de deslocamento usando funções senoidais para criar um movimento suave
        const displacementY = Math.sin(time) * movementAmplitude;
        const displacementZ = Math.sin(time * 0.25) * movementAmplitude; // Adicione essa linha

        // Aplique a posição de deslocamento apenas na coordenada y (altura)
        obj.position.y = displacementY;
        obj.position.z = displacementZ;
      }
    });

    controls.update();
    renderer.render(scene, camera);
  });
}

function updateLightPosition(event) {
  const mouseX = (event.clientX / objectWidth) * 2 - 1;
  const mouseY = -(event.clientY / objectHeight) * 2 + 1;

  const lightIntensity = 1 + Math.abs(mouseX * 0.2); // Ajuste o fator conforme necessário

  objectScenes.forEach(({ scene }) => {
    scene.traverse(obj => {
      if (obj.isHemisphereLight) {
        obj.intensity = lightIntensity;
        obj.position.set(mouseX * 100, mouseY * 100, 300); // Ajuste os valores conforme necessário
      }
    });
  });
}

// Registre o evento mousemove para atualizar a posição da luz conforme o mouse se move
container.addEventListener('mousemove', updateLightPosition);

animate();