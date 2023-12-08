import {  PrimitiveProps, useFrame, useLoader } from "@react-three/fiber";
import styles from "./ArticleGalleryThree.module.scss";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Float } from "@react-three/drei";
import {  useRef } from "react";
import { BufferGeometryUtils } from "three/examples/jsm/Addons.js";
import { TunnelR3f } from "./TunnelR3f";
import { calcThreeWindowHeight } from "./three_utils";


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

function ScrollGroup({track,threeHeight,children}:{track:React.RefObject<HTMLElement>,threeHeight:number,children:React.ReactNode[]|React.ReactNode}){
  const groupRef=useRef<THREE.Group>(null);
  useFrame((state/*,delta*/)=>{
    if(track.current && groupRef.current){
      const rect=track.current.getBoundingClientRect();
      const {left,top,width,height}=rect;
      const x=left+width/2;
      const y=top+height/2;
      const {camera}=state;
      if(camera instanceof THREE.PerspectiveCamera){
        const threeWindowHeight=calcThreeWindowHeight(camera);
        const threeWindowWidth=threeWindowHeight*state.viewport.aspect;
        const windowHeight=state.size.height;
        // const windowWidth=state.size.height;
        const toThreeLength=(domLength:number)=>domLength/windowHeight*threeWindowHeight;
        const offsetY=threeWindowHeight/2 * -1;
        const offsetX=threeWindowWidth/2 * -1;
        groupRef.current.position.x=toThreeLength(x)+offsetX;
        groupRef.current.position.y=(toThreeLength(y)+offsetY)*-1;
        const scale=toThreeLength(height / threeHeight);
        groupRef.current.scale.set(scale,scale,scale);
      }
    }
  });
  return (
    <group ref={groupRef}>
      {children}
    </group>
  );

}

// 3:2を前提にしている、高さ4m

export default function ArticleGalleryThree() {
  const articleRef = useRef<HTMLElement>(null);
  
  return (
    <article ref={articleRef} className={styles["component"]}>
      <TunnelR3f.In>
      <ScrollGroup track={articleRef} threeHeight={4}>
        <MyBox w={6} h={4} d={6}>
          <Float>
            <Suzanne position={[-1,0.5,0]}/>
          </Float>
          <Float>
            <Suzanne position={[1,-0.5,2]}/>
          </Float>
        </MyBox>
      </ScrollGroup>
      </TunnelR3f.In>
      <h3 className={styles["component__title"]}>Article Three Title</h3>
    </article>
  );
}
