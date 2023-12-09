import './App.css'
import SectionAbout from './SectionAbout'
import SectionGallery from './SectionGallery'
import SectionHero from './SectionHero'
import * as THREE from "three"
import { Canvas, useFrame } from '@react-three/fiber'
import { TunnelR3f } from './TunnelR3f'
import { Preload, SoftShadows } from '@react-three/drei'
import {Physics} from "@react-three/rapier";
import { useEffect, useLayoutEffect, useState } from 'react'

function MyDirectionalLight(){

  return (<directionalLight position={[0,1,5]} intensity={1.0} castShadow shadow-mapSize={[1024*2,1024*2]}>
    <orthographicCamera attach="shadow-camera" args={[-10,10,10,-10]}/>
  </directionalLight>);

}
const Scene=()=>{
  return (
    <>
      <FovUpdateByFovx fovx={20}/>
      <SoftShadows />
      <ambientLight intensity={0.6} />
      <MyDirectionalLight/>
      <TunnelR3f.Out/>
      <Preload all/>
    </>
  );
}
function FovUpdateByFovx({fovx}:{fovx:number}){
  
  useFrame((state)=>{
    
    const fovy=Math.atan(Math.tan(fovx*THREE.MathUtils.DEG2RAD)/state.viewport.aspect)*THREE.MathUtils.RAD2DEG;
    if(state.camera instanceof THREE.PerspectiveCamera){
      const epsilon=0.001;
      if(epsilon<Math.abs(state.camera.fov - fovy)){
        state.camera.fov=fovy;
        state.camera.updateProjectionMatrix();
      }

    }

  })
  return null;
}


function App() {
  const [physicsKey, setPhysicsKey] = useState<number>(0);

  const resetPhysics=()=>setPhysicsKey((key)=>key+1);

  useEffect(()=>{
    const timerId=setInterval(()=>{
      resetPhysics();
    },1000);
    return ()=>{
      clearInterval(timerId);
    }
  })

  return (
    <>
      <div id="viewWrapper">
        <Canvas shadows camera={{position:[0,0,20]}} style={{pointerEvents:"none"}}>
          <Physics key={physicsKey} debug={true} gravity={[0,0,0]}>
            <Scene/>
          </Physics>
        </Canvas>
      </div>
      <SectionHero/>
      <SectionGallery/>
      <SectionAbout/>
    </>
  )
}

export default App
