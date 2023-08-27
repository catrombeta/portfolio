import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

const container = document.getElementById('container');
const objectWidth = 200;
const objectHeight = 200;

const stackInfo = [
  { name: 'CSS', modelPath: '/obj/css.obj' },
  // Adicione mais objetos conforme necessário
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
    const objectScale = objectWidth / maxDimension;
    model.scale.set(objectScale, objectScale, objectScale);

    scene.add(model);
  });

  // Posicione a câmera
  camera.position.z = 500;

  return { scene, camera, renderer };
});

function animate() {
  requestAnimationFrame(animate);
  objectScenes.forEach(({ scene, camera, renderer }) => {
    renderer.render(scene, camera);
  });
}

animate();
