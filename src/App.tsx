import { GlobalCanvas, SmoothScrollbar } from '@14islands/r3f-scroll-rig'
import './App.css'
import SectionAbout from './SectionAbout'
import SectionGallery from './SectionGallery'
import SectionHero from './SectionHero'
import * as THREE from "three"
import { useFrame } from '@react-three/fiber'
import { SoftShadows } from '@react-three/drei'

function MyDirectionalLight(){
  const directionalLight=new THREE.DirectionalLight();
  directionalLight.intensity=1.0;
  directionalLight.castShadow=true;

  const directionalLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
  useFrame((state)=>{
    const width=window.innerWidth;
    const height=window.innerHeight;
    directionalLight.shadow.camera.near=0.1;
    directionalLight.shadow.camera.far=2000;
    directionalLight.position.set(0,100,500);
    directionalLight.shadow.mapSize.set(1024,1024);
    directionalLight.shadow.camera.left=width * -0.5 * 0.01;
    directionalLight.shadow.camera.right=width * +0.5 * 0.01;
    directionalLight.shadow.camera.top=height * +0.5 * 0.01 * 3;
    directionalLight.shadow.camera.bottom=height * -0.5 * 0.01 * 3;
    directionalLightShadowHelper.update();
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
      <GlobalCanvas shadows={true} camera={{fov:20}} scaleMultiplier={0.01}>
        <ambientLight intensity={0.6} />
        <MyDirectionalLight/>
        <SoftShadows focus={0.25} />

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
