import {  PrimitiveProps, useFrame, useLoader } from "@react-three/fiber";
import styles from "./ArticleGalleryThree.module.scss";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import {  forwardRef,  useRef } from "react";
import { BufferGeometryUtils } from "three/examples/jsm/Addons.js";
import { TunnelR3f } from "./TunnelR3f";
import { ScrollGroup } from "./ScrollGroup";
import {RigidBody,RapierRigidBody} from "@react-three/rapier";


const Suzanne=forwardRef((props:Partial<PrimitiveProps>,ref?: React.ForwardedRef<THREE.Mesh>)=>{
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
    <primitive {...merged} ref={ref}/>
  );
});

const MyBox = forwardRef(({children,w,h,d}:{children:JSX.Element[]|JSX.Element|null,w:number,h:number,d:number},ref?: React.ForwardedRef<THREE.Group>)=>{
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
    <group position={[0,0,0 + d * -0.5]} ref={ref}>
      <mesh receiveShadow={true}>
        <bufferGeometry {...boxGeometryInner} />
        <meshStandardMaterial roughness={0.2} metalness={0} />
      </mesh>
      <mesh receiveShadow={true} renderOrder={-1}>
        <bufferGeometry {...boxGeometryOuter} />
        <meshBasicMaterial colorWrite={false} />
      </mesh>
      {children}
    </group>
  );

});


function ScrollGroupScene({track}:{track:React.RefObject<HTMLElement>}){
  const scrollGroupRef=useRef<THREE.Group>(null);
  const boxRef = useRef<THREE.Group>(null);
  const suzanne01Ref = useRef<THREE.Mesh>(null);
  const suzanne02Ref = useRef<THREE.Mesh>(null);
  const boxRigidBodyRef = useRef<RapierRigidBody>(null);
  const suzanne01RigidBodyRef = useRef<RapierRigidBody>(null);
  const suzanne02RigidBodyRef = useRef<RapierRigidBody>(null);
  const suzanne01Position = new THREE.Vector3(-1,0.5,0 - 3);
  const suzanne02Position = new THREE.Vector3(1,-0.5,2 - 3);
  let previousScrollPosition:THREE.Vector3|null = null;
  const slipSq = Math.pow(0.5,2);
  useFrame(()=>{
    if([
      boxRef,
      suzanne01Ref,
      suzanne02Ref,
      scrollGroupRef,
      boxRigidBodyRef,
      suzanne01RigidBodyRef,
      suzanne02RigidBodyRef,
    ].every((ref)=>ref.current)){
      const scrollGroup=scrollGroupRef.current!;
      const boxRigidBody=boxRigidBodyRef.current!;
      const suzanne01RigidBody=suzanne01RigidBodyRef.current!;
      const suzanne02RigidBody=suzanne02RigidBodyRef.current!;
      
      const scrollPosition=new THREE.Vector3();
      scrollGroup.getWorldPosition(scrollPosition);

      if(previousScrollPosition && previousScrollPosition.clone().sub(scrollPosition).lengthSq() < slipSq){
        boxRigidBody.setTranslation(scrollPosition,true);
        // boxRigidBody.setNextKinematicTranslation(scrollPosition);

      }else{
        // const box=boxRef.current!;
        // const suzanne01=suzanne01Ref.current!;
        // const suzanne02=suzanne02Ref.current!;
        // box.scale.copy(scrollGroup.scale);
        // suzanne01.scale.copy(scrollGroup.scale);
        // suzanne02.scale.copy(scrollGroup.scale);

        boxRigidBody.setTranslation(scrollPosition,true);
        suzanne01RigidBody.setTranslation(suzanne01Position,true);
        suzanne02RigidBody.setTranslation(suzanne02Position,true);
  
      }
      previousScrollPosition=scrollPosition;

    }

  });

  return (
    <>
      <ScrollGroup track={track} threeHeight={4} ref={scrollGroupRef}>
        <RigidBody colliders="trimesh" type="kinematicPosition" ref={boxRigidBodyRef} lockRotations lockTranslations >
          <MyBox w={6} h={4} d={6} ref={boxRef}>
          </MyBox>
        </RigidBody>
        <RigidBody colliders="hull" ref={suzanne01RigidBodyRef} >
          <Suzanne position={suzanne01Position.toArray()} ref={suzanne01Ref}/>
        </RigidBody>
        <RigidBody colliders="hull" ref={suzanne02RigidBodyRef} >
          <Suzanne position={suzanne02Position.toArray()} ref={suzanne02Ref}/>
        </RigidBody>
      </ScrollGroup>
    </>
    
  );

}

// 3:2を前提にしている、高さ4m

export default function ArticleGalleryThree() {
  const articleRef = useRef<HTMLElement>(null);

  
  return (
    <article ref={articleRef} className={styles["component"]}>
      <TunnelR3f.In>
        <ScrollGroupScene track={articleRef}/>
      </TunnelR3f.In>
      <h3 className={styles["component__title"]}>Article Three Title</h3>
    </article>
  );
}
