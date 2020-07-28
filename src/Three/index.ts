import { BoxGeometry, Mesh, PerspectiveCamera, WebGLRenderer, Scene } from 'three';

import { createCubeType, cameraPropsType, renderPropsType, animationType } from './types';

const Three = (renderProps: renderPropsType, cameraProps: cameraPropsType) => {
  // ----------------------- SETUP ---------------------------------

  // # Scene
  const scene = new Scene();

  // # Camera
  // https://threejs.org/docs/index.html#api/en/cameras/PerspectiveCamera
  const camera = new PerspectiveCamera(
    cameraProps.fov,
    cameraProps.aspect,
    cameraProps.near,
    cameraProps.far
  );

  // # Render
  const render = new WebGLRenderer();

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
    animationsCallbacks.map((animation: animationType) => {
      if (animation) animation.render();
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

  const addAnimationCallback = (animation: animationType) => {
    animationsCallbacks.push(animation);
  };

  // https://threejs.org/docs/index.html#api/en/geometries/BoxGeometry
  const createCube = ({ width, height, depth, material }: createCubeType) => {
    const geometry = new BoxGeometry(width, height, depth);
    const cube = new Mesh(geometry, material);
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

export default Three;
