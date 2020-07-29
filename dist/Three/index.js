"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const THREE = require("three");
const Three = (renderProps, cameraProps) => {
    // ----------------------- SETUP ---------------------------------
    // # Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xcce0ff);
    scene.fog = new THREE.Fog(0xcce0ff, 500, 10000);
    // # Camera
    // https://threejs.org/docs/index.html#api/en/cameras/PerspectiveCamera
    const camera = new THREE.PerspectiveCamera(cameraProps.fov, cameraProps.aspect, cameraProps.near, cameraProps.far);
    //camera.position.set(1200, -250, 20000); // camera inside skybox
    camera.position.z = 5;
    const loader = new THREE.TextureLoader();
    // # Render
    const render = new THREE.WebGLRenderer();
    // # Animations callbacks
    const animationsCallbacks = [];
    // ----------------------------------------------------------------
    // -------------------------- MAIN -------------------------------
    // Resize window on WindowResize
    const onWindowResize = () => {
        // not working yet!!!!
        camera.aspect = cameraProps.aspect;
        camera.updateProjectionMatrix();
        render.setSize(renderProps.width, renderProps.height);
    };
    // Three JS loop
    const animate = () => {
        requestAnimationFrame(animate);
        // Loop every animations attached
        animationsCallbacks.map((animation) => {
            if (animation)
                animation.render();
        });
        render.render(scene, camera);
    };
    // Start everything
    const start = () => {
        render.setSize(renderProps.width, renderProps.height);
        // Append renderer on HTML
        document.body.appendChild(render.domElement);
        window.addEventListener('resize', onWindowResize, false);
        animate();
    };
    // ----------------------------------------------------------------
    const addAnimationCallback = (animation) => {
        animationsCallbacks.push(animation);
    };
    // https://threejs.org/docs/index.html#api/en/geometries/BoxGeometry
    const createCube = ({ width, height, depth, material }) => {
        const geometry = new THREE.BoxGeometry(width, height, depth);
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        return cube;
    };
    // ----------------------------------------------------------------
    return {
        createCube,
        start,
        addAnimationCallback,
        camera,
        scene,
    };
};
exports.default = Three;
//# sourceMappingURL=index.js.map