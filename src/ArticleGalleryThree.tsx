import {  PrimitiveProps, useLoader } from "@react-three/fiber";
import styles from "./ArticleGalleryThree.module.scss";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Float } from "@react-three/drei";
import { MutableRefObject, useRef } from "react";
import { ScrollScene, UseCanvas } from "@14islands/r3f-scroll-rig";


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
      object3d.receiveShadow=false;
    }
  })
  
  return (
    <primitive {...merged}/>
  );
}


export default function ArticleGalleryThree() {
  const articleRef = useRef<HTMLElement|null>(null);
  
  return (
    <article ref={articleRef} className={styles["component"]}>
      <UseCanvas>
        <ScrollScene track={articleRef as MutableRefObject<HTMLElement>} >
          {({...props})=>(<group scale={props.scale.xy.min() * 0.2}>
              <mesh position={[0,0,0]} receiveShadow={true}>
                <boxGeometry args={[4,3,6]}  />
                <meshStandardMaterial roughness={0.2} metalness={0} side={THREE.BackSide} />
              </mesh>
              <Float>
                <Suzanne position={[-1,0,-2]}/>
              </Float>
              <Float>
                <Suzanne position={[1,0,0]}/>
              </Float>

            </group>
          )}
        </ScrollScene>
      </UseCanvas>
        
      <h3 className={styles["component__title"]}>Article Three Title</h3>
    </article>
  );
}
