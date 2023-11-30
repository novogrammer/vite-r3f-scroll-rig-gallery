import { Canvas, PrimitiveProps, useLoader } from "@react-three/fiber";
import styles from "./ArticleGalleryThree.module.scss";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Float, PerspectiveCamera } from "@react-three/drei";


function Suzanne(props:Partial<PrimitiveProps>) {
  const gltf = useLoader(GLTFLoader, "./assets/Suzanne.glb");
  const merged=Object.assign(
    Object.assign({},props),
    {
      object:gltf.scene.clone()
    }
  );
  merged.object.traverse((object3d)=>{
    if(object3d instanceof THREE.Mesh){
      object3d.castShadow=true;
      object3d.receiveShadow=true;
    }
  })
  
  return (
    <primitive {...merged}/>
  );
}


export default function ArticleGalleryThree() {
  
  return (
    <article className={styles["component"]}>
      <div className={styles["component__view-wrapper"]}>
        <Canvas className={styles["component__view"]} shadows={true}>
          <PerspectiveCamera makeDefault position={[0,1,5]} fov={30} />
          <ambientLight intensity={0.6} />
          <directionalLight intensity={1.0} position={[0, 3, 5]} castShadow={true}/>
          <mesh position={[0,1.5,0]} receiveShadow={true}>
            <boxGeometry args={[4,3,6]}  />
            <meshStandardMaterial roughness={0.2} metalness={0} side={THREE.BackSide} />
          </mesh>
          <Float>
            <Suzanne position={[-1,1.5,-2]}/>
          </Float>
          <Float>
            <Suzanne position={[1,1.5,0]}/>
          </Float>
          {/* <OrbitControls position={[0,0,2]} target={[0,0,0]}/> */}
          {/* <Stats/> */}
        </Canvas>
      </div>
      <h3 className={styles["component__title"]}>Article Three Title</h3>
    </article>
  );
}
