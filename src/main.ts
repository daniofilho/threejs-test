import { TextureLoader, NearestFilter, MeshBasicMaterial, LoadingManager } from 'three';

import Three from './Three';
import { createCubeType } from './Three/types';

// -------- SETUP ---------

// # Global variables -----
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

const cameraProps = {
  fov: 75,
  aspect: screenWidth / screenHeight,
  near: 1, // anything below this number won't be displayed, to near
  far: 100000, // same here but far
};

const renderProps = {
  width: screenWidth,
  height: screenHeight,
};

// Create the Three Class
const three = Three(renderProps, cameraProps);

// Start ThreeJS
three.start();

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Add a box / square
const loadManager = new LoadingManager();
const loader = new TextureLoader(loadManager);

const textureSides = loader.load('assets/textures/grass_dirt.png');
textureSides.magFilter = NearestFilter; // Allow pixelate effect when resize

const textureTop = loader.load('assets/textures/grass.png');
textureTop.magFilter = NearestFilter;

const textureBottom = loader.load('assets/textures/dirt.png');
textureBottom.magFilter = NearestFilter;

const materials = [
  new MeshBasicMaterial({ map: textureSides }),
  new MeshBasicMaterial({ map: textureSides }),
  new MeshBasicMaterial({ map: textureTop }),
  new MeshBasicMaterial({ map: textureBottom }),
  new MeshBasicMaterial({ map: textureSides }),
  new MeshBasicMaterial({ map: textureSides }),
];

const cubeProps: createCubeType = {
  width: 2,
  height: 2,
  depth: 2,
  material: materials,
};

// Create cube only after image loaded
loadManager.onLoad = () => {
  const cube = three.createCube(cubeProps);

  // Rotate cube
  three.addAnimationCallback({
    render: () => {
      cube.rotation.x += 0.001;
      cube.rotation.y += 0.01;
    },
  });
};
