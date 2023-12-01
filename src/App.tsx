import { GlobalCanvas, SmoothScrollbar } from '@14islands/r3f-scroll-rig'
import './App.css'
import SectionAbout from './SectionAbout'
import SectionGallery from './SectionGallery'
import SectionHero from './SectionHero'
import { useEffect } from 'react'
import * as THREE from "three"
import { useFrame } from '@react-three/fiber'

function MyDirectionalLight(){
  const directionalLight=new THREE.DirectionalLight();
  directionalLight.intensity=1.0;
  directionalLight.castShadow=true;

  const directionalLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
  directionalLightShadowHelper.visible=false;
  useFrame(()=>{
    const width=window.innerWidth;
    const height=window.innerHeight;
    directionalLight.shadow.camera.near=0.1;
    directionalLight.shadow.camera.far=1000;
    directionalLight.position.set(0,100,500);
    directionalLight.shadow.mapSize.set(1024,1024);
    directionalLight.shadow.camera.left=width*-0.5;
    directionalLight.shadow.camera.right=width*+0.5;
    directionalLight.shadow.camera.top=height*+0.5 * 3;
    directionalLight.shadow.camera.bottom=height*-0.5 * 3;
    directionalLightShadowHelper.update();
  })

  return (<>
    <primitive object={directionalLight} />
    <primitive object={directionalLightShadowHelper}/>
  </>);

}

function App() {

  return (
    <>
      <GlobalCanvas shadows={true} camera={{fov:20}}>
        <ambientLight intensity={0.6} />
        <MyDirectionalLight/>

      </GlobalCanvas>
      <SmoothScrollbar config={{
          duration:0.25,
      }} />
      <SectionHero/>
      <SectionGallery/>
      <SectionAbout/>
    </>
  )
}

export default App
