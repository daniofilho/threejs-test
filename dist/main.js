"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const three_1 = require("three");
const Three_1 = require("./Three");
// -------- SETUP ---------
// # Global variables -----
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
const cameraProps = {
    fov: 75,
    aspect: screenWidth / screenHeight,
    near: 1,
    far: 100000,
};
const renderProps = {
    width: screenWidth,
    height: screenHeight,
};
// Create the Three Class
const three = Three_1.default(renderProps, cameraProps);
// Start ThreeJS
three.start();
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Add a box / square
const loadManager = new three_1.LoadingManager();
const loader = new three_1.TextureLoader(loadManager);
const textureSides = loader.load('assets/textures/grass_dirt.png');
textureSides.magFilter = three_1.NearestFilter; // Allow pixelate effect when resize
const textureTop = loader.load('assets/textures/grass.png');
textureTop.magFilter = three_1.NearestFilter;
const textureBottom = loader.load('assets/textures/dirt.png');
textureBottom.magFilter = three_1.NearestFilter;
const materials = [
    new three_1.MeshBasicMaterial({ map: textureSides }),
    new three_1.MeshBasicMaterial({ map: textureSides }),
    new three_1.MeshBasicMaterial({ map: textureTop }),
    new three_1.MeshBasicMaterial({ map: textureBottom }),
    new three_1.MeshBasicMaterial({ map: textureSides }),
    new three_1.MeshBasicMaterial({ map: textureSides }),
];
const cubeProps = {
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
//# sourceMappingURL=main.js.map