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
    near: 0.1,
    far: 1000,
};
const renderProps = {
    width: screenWidth,
    height: screenHeight,
};
// Create the Three Class
const three = Three_1.default(renderProps, cameraProps);
// Start ThreeJS
three.start();
const { camera, scene } = three;
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Add a box / square
const textureFlat = new three_1.TextureLoader().load('assets/textures/grass.png');
const texture = new three_1.CubeTextureLoader().load([
    'assets/textures/grass.png',
    'assets/textures/dirt.png',
    'assets/textures/dirt.png',
    'assets/textures/dirt.png',
    'assets/textures/dirt.png',
    'assets/textures/dirt.png',
]);
texture.magFilter = three_1.NearestFilter; // Allow pixelate effect when resize
const material = new three_1.MeshBasicMaterial({ map: textureFlat });
const cubeProps = {
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
//# sourceMappingURL=main.js.map