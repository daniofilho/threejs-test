"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const three_1 = require("three");
const Three = (renderProps, cameraProps) => {
    // ----------------------- SETUP ---------------------------------
    // # Scene
    const scene = new three_1.Scene();
    // # Camera
    // https://threejs.org/docs/index.html#api/en/cameras/PerspectiveCamera
    const camera = new three_1.PerspectiveCamera(cameraProps.fov, cameraProps.aspect, cameraProps.near, cameraProps.far);
    // # Render
    const render = new three_1.WebGLRenderer();
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
        const geometry = new three_1.BoxGeometry(width, height, depth);
        const cube = new three_1.Mesh(geometry, material);
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