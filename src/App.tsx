import './App.css'
import SectionAbout from './SectionAbout'
import SectionGallery from './SectionGallery'
import SectionHero from './SectionHero'
import * as THREE from "three"
import { Canvas, useFrame } from '@react-three/fiber'
import { TunnelR3f } from './TunnelR3f'
import { Preload } from '@react-three/drei'
import { calcThreeWindowHeight } from './three_utils'

function MyDirectionalLight(){
  const directionalLight=new THREE.DirectionalLight();
  directionalLight.intensity=1.0;
  directionalLight.castShadow=true;

  const directionalLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
  useFrame((state)=>{
    const {camera}=state;
    if(camera instanceof THREE.PerspectiveCamera){
      const threeWindowHeight=calcThreeWindowHeight(camera);
      const threeWindowWidth=threeWindowHeight*state.viewport.aspect;
      directionalLight.shadow.camera.near=0.1;
      directionalLight.shadow.camera.far=20;
      directionalLight.position.set(0,1,5);
      directionalLight.shadow.mapSize.set(1024,1024);
      directionalLight.shadow.camera.left=threeWindowWidth*-0.5 * 2;
      directionalLight.shadow.camera.right=threeWindowWidth*+0.5 * 2;
      directionalLight.shadow.camera.top=threeWindowHeight*+0.5 * 3;
      directionalLight.shadow.camera.bottom=threeWindowHeight*-0.5 * 3;
      directionalLightShadowHelper.update();
      }
    directionalLightShadowHelper.visible=false;
  })

  return (<>
    <primitive object={directionalLight} />
    <primitive object={directionalLightShadowHelper}/>
  </>);

}

function App() {

  return (
    <>
      <div id="viewWrapper">
        <Canvas shadows={true} camera={{fov:20}} style={{pointerEvents:"none"}}>
          <ambientLight intensity={0.6} />
          <MyDirectionalLight/>
          <TunnelR3f.Out/>
          <Preload all/>
        </Canvas>
      </div>
      <SectionHero/>
      <SectionGallery/>
      <SectionAbout/>
    </>
  )
}

export default App
