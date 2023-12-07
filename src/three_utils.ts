import * as THREE from "three";
export function calcThreeWindowHeight(camera:THREE.PerspectiveCamera):number{
  return Math.tan(camera.fov * THREE.MathUtils.DEG2RAD /2)*camera.position.z*2;
}