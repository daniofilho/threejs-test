import {
  TextureLoader,
  CubeTextureLoader,
  MeshBasicMaterial,
  NearestFilter,
  MeshLambertMaterial,
} from 'three';

import Three from './Three';
import { createCubeType } from './Three/types';

// -------- SETUP ---------

// # Global variables -----
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

const cameraProps = {
  fov: 75,
  aspect: screenWidth / screenHeight,
  near: 0.1, // anything below this number won't be displayed, to near
  far: 1000, // same here but far
};

const renderProps = {
  width: screenWidth,
  height: screenHeight,
};

// Create the Three Class
const three = Three(renderProps, cameraProps);

// Start ThreeJS
three.start();

const { camera, scene } = three;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Add a box / square

const textureFlat = new TextureLoader().load('assets/textures/grass.png');
const texture = new CubeTextureLoader().load([
  'assets/textures/grass.png',
  'assets/textures/dirt.png',
  'assets/textures/dirt.png',
  'assets/textures/dirt.png',
  'assets/textures/dirt.png',
  'assets/textures/dirt.png',
]);
texture.magFilter = NearestFilter; // Allow pixelate effect when resize

const material = new MeshBasicMaterial({ map: textureFlat });

const cubeProps: createCubeType = {
  width: 2,
  height: 2,
  depth: 2,
  material,
};
const cube = three.createCube(cubeProps);

camera.position.z = 5;

// Rotate cube
three.addAnimationCallback({
  render: () => {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  },
});
