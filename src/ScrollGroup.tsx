import { useFrame } from "@react-three/fiber";
import React, { useImperativeHandle } from "react";
import { useRef } from "react";
import * as THREE from "three";


function calcThreeWindowHeight(camera:THREE.PerspectiveCamera):number{
  return Math.tan(camera.fov * THREE.MathUtils.DEG2RAD /2)*camera.position.z*2;
}

export const ScrollGroup = React.forwardRef(({track,threeHeight,children}:{track:React.RefObject<HTMLElement>,threeHeight:number,children:React.ReactNode[]|React.ReactNode},ref?: React.ForwardedRef<THREE.Group>)=>{

  const innerRef=useRef<THREE.Group>(null);
  useImperativeHandle(ref, () => innerRef.current!);
  useFrame((state/*,delta*/)=>{
    if(track.current && innerRef.current){
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
        innerRef.current.position.x=toThreeLength(x)+offsetX;
        innerRef.current.position.y=(toThreeLength(y)+offsetY)*-1;
        const scale=toThreeLength(height / threeHeight);
        innerRef.current.scale.set(scale,scale,scale);
      }
    }
  });
  return (
    <group ref={innerRef}>
      {children}
    </group>
  );

});
