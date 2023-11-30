import { GlobalCanvas, SmoothScrollbar } from '@14islands/r3f-scroll-rig'
import './App.css'
import SectionAbout from './SectionAbout'
import SectionGallery from './SectionGallery'
import SectionHero from './SectionHero'
import { PerspectiveCamera } from '@react-three/drei'

function App() {

  return (
    <>
      <GlobalCanvas shadows={true} camera={{fov:20}}>
        <ambientLight intensity={0.6} />
        <directionalLight intensity={1.0} position={[0, 1, 5]} castShadow={true}>
          <orthographicCamera attach="shadow-camera" near={1} far={10000} top={-1000} bottom={1000} left={-1000} right={1000}/>
        </directionalLight>

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
