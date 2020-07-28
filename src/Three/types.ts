export interface createCubeType {
  width: number;
  height: number;
  depth: number;
  material: any; // @TODO
}

export interface cameraPropsType {
  fov: number;
  aspect: number;
  near: number;
  far: number;
}

export interface renderPropsType {
  width: number;
  height: number;
}

export interface animationType {
  render: Function;
}

export interface ThreeType {
  createCube(args: createCubeType): Function;
  start: Function;
  camera: any; // @todo
  scene: any; // @todo
  addAnimationCallback(args: animationType): Function;
}
