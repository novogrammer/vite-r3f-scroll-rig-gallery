import {  PrimitiveProps, useLoader } from "@react-three/fiber";
import styles from "./ArticleGalleryThree.module.scss";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Float } from "@react-three/drei";
import { MutableRefObject, useRef } from "react";
import { ScrollScene, UseCanvas } from "@14islands/r3f-scroll-rig";
import { BufferGeometryUtils } from "three/examples/jsm/Addons.js";


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
      object3d.material.side=THREE.FrontSide
    }
  })
  
  return (
    <primitive {...merged}/>
  );
}
function MyBox({children,w,h,d}:{children:JSX.Element[],w:number,h:number,d:number}){
  const boxGeometryInner=new THREE.BoxGeometry(w*0.999,h*0.999,d*0.999);
  boxGeometryInner.applyMatrix4(new THREE.Matrix4().makeScale(-1, 1, 1));
  const planeGeometryOuterLeft=new THREE.PlaneGeometry(d,h);
  {
    planeGeometryOuterLeft.applyMatrix4(new THREE.Matrix4().makeRotationY(90 * THREE.MathUtils.DEG2RAD));
    planeGeometryOuterLeft.applyMatrix4(new THREE.Matrix4().makeTranslation(w*+0.5,0,0));
  }
  const planeGeometryOuterRight=new THREE.PlaneGeometry(d,h);
  {
    planeGeometryOuterRight.applyMatrix4(new THREE.Matrix4().makeRotationY(-90 * THREE.MathUtils.DEG2RAD));
    planeGeometryOuterRight.applyMatrix4(new THREE.Matrix4().makeTranslation(w*-0.5,0,0));
  }
  const planeGeometryOuterTop=new THREE.PlaneGeometry(w,d);
  {
    planeGeometryOuterTop.applyMatrix4(new THREE.Matrix4().makeRotationX(-90 * THREE.MathUtils.DEG2RAD));
    planeGeometryOuterTop.applyMatrix4(new THREE.Matrix4().makeTranslation(0,h*+0.5,0));
  }
  const planeGeometryOuterBottom=new THREE.PlaneGeometry(w,d);
  {
    planeGeometryOuterBottom.applyMatrix4(new THREE.Matrix4().makeRotationX(90 * THREE.MathUtils.DEG2RAD));
    planeGeometryOuterBottom.applyMatrix4(new THREE.Matrix4().makeTranslation(0,h*-0.5,0));
  }

  const boxGeometryOuter=BufferGeometryUtils.mergeGeometries([
    planeGeometryOuterLeft,
    planeGeometryOuterRight,
    planeGeometryOuterTop,
    planeGeometryOuterBottom,
  ],false);
  boxGeometryInner.computeVertexNormals();
  return (
    <group position={[0,0,0 + d * -0.5]}>
      <mesh receiveShadow={true}>
        <bufferGeometry {...boxGeometryInner} />
        <meshStandardMaterial roughness={0.2} metalness={0} />
      </mesh>
      <mesh receiveShadow={true} renderOrder={-1}>
        <bufferGeometry {...boxGeometryOuter} />
        <meshBasicMaterial colorWrite={false} />
      </mesh>
      {...children}
    </group>
  )

}

// 3:2を前提にしている、高さ4m

export default function ArticleGalleryThree() {
  const articleRef = useRef<HTMLElement|null>(null);
  
  return (
    <article ref={articleRef} className={styles["component"]}>
      <UseCanvas>
        <ScrollScene track={articleRef as MutableRefObject<HTMLElement>} >
          {({...props})=>(<group scale={props.scale.xy.min() * 0.25}>
              <MyBox w={6} h={4} d={6}>
                <Float>
                  <Suzanne position={[-1,0.5,0]}/>
                </Float>
                <Float>
                  <Suzanne position={[1,-0.5,2]}/>
                </Float>
              </MyBox>
            </group>
          )}
        </ScrollScene>
      </UseCanvas>
        
      <h3 className={styles["component__title"]}>Article Three Title</h3>
    </article>
  );
}
