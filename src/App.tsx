import { GlobalCanvas, SmoothScrollbar } from '@14islands/r3f-scroll-rig'
import './App.css'
import SectionAbout from './SectionAbout'
import SectionGallery from './SectionGallery'
import SectionHero from './SectionHero'

function App() {

  return (
    <>
      <GlobalCanvas shadows={true} debug={true}>
        <ambientLight intensity={0.6} />
        <directionalLight intensity={1.0} position={[0, 3, 5]} castShadow={true}/>

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
