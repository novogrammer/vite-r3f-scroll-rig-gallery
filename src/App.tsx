import './App.css'
import SectionAbout from './SectionAbout'
import SectionGallery from './SectionGallery'
import SectionHero from './SectionHero'
// import * as THREE from "three"
import { Canvas } from '@react-three/fiber'
import { TunnelR3f } from './TunnelR3f'
import { Preload, SoftShadows } from '@react-three/drei'

function MyDirectionalLight(){

  return (<directionalLight position={[0,1,5]} intensity={1.0} castShadow shadow-mapSize={[1024*2,1024*2]}>
    <orthographicCamera attach="shadow-camera" args={[-10,10,10,-10]}/>
  </directionalLight>);

}
const Scene=()=>{
  return (
    <>
      <SoftShadows />
      <ambientLight intensity={0.6} />
      <MyDirectionalLight/>
      <TunnelR3f.Out/>
      <Preload all/>
    </>
  );
}

function App() {

  return (
    <>
      <div id="viewWrapper">
        <Canvas shadows camera={{fov:20,position:[0,0,20]}} style={{pointerEvents:"none"}}>
          <Scene/>
        </Canvas>
      </div>
      <SectionHero/>
      <SectionGallery/>
      <SectionAbout/>
    </>
  )
}

export default App
