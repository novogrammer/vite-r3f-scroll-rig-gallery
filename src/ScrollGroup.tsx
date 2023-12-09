import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";


function calcThreeWindowHeight(camera:THREE.PerspectiveCamera):number{
  return Math.tan(camera.fov * THREE.MathUtils.DEG2RAD /2)*camera.position.z*2;
}

export function ScrollGroup({track,threeHeight,children}:{track:React.RefObject<HTMLElement>,threeHeight:number,children:React.ReactNode[]|React.ReactNode}){
  const groupRef=useRef<THREE.Group>(null);
  useFrame((state/*,delta*/)=>{
    if(track.current && groupRef.current){
      const rect=track.current.getBoundingClientRect();
      const {left,top,width,height}=rect;
      const x=left+width/2;
      const y=top+height/2;
      const {camera}=state;
      if(camera instanceof THREE.PerspectiveCamera){
        const threeWindowHeight=calcThreeWindowHeight(camera);
        const threeWindowWidth=threeWindowHeight*state.viewport.aspect;
        const windowHeight=state.size.height;
        // const windowWidth=state.size.height;
        const toThreeLength=(domLength:number)=>domLength/windowHeight*threeWindowHeight;
        const offsetY=threeWindowHeight/2 * -1;
        const offsetX=threeWindowWidth/2 * -1;
        groupRef.current.position.x=toThreeLength(x)+offsetX;
        groupRef.current.position.y=(toThreeLength(y)+offsetY)*-1;
        const scale=toThreeLength(height / threeHeight);
        groupRef.current.scale.set(scale,scale,scale);
      }
    }
  });
  return (
    <group ref={groupRef}>
      {children}
    </group>
  );

}