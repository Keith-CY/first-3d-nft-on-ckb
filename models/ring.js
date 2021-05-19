import * as THREE from '../utils/three.module.js'
import CSG from '../utils/CSGMesh.js'
export const getRing = (color) => {
  const textureCube = new THREE.CubeTextureLoader()
    .setPath('./imgs/')
    .load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'])

  textureCube.mapping = THREE.CubeReflectionMapping

  const material = new THREE.MeshStandardMaterial({
    envMap: textureCube,
    metalness: 0.9,
    roughness: 0.1,
    color,
  })
  const cylinderOuterGeo = new THREE.CylinderBufferGeometry(5.3, 5.3, 1.6, 128, 1, false)
  const cylinderInnerGeo = new THREE.CylinderBufferGeometry(5, 5, 1.6, 128, 1, false)
  const chamferBottomGeo = new THREE.CylinderBufferGeometry(5.05, 4,1.6, 128, 1, false)
  const chamferTopGeo = new THREE.CylinderBufferGeometry(5.05, 4,1.6, 128, 1, false)

  const cylinderOuter = new THREE.Mesh(cylinderOuterGeo, material)
  const cylinderInner = new THREE.Mesh(cylinderInnerGeo, material)
  const chamferBottom = new THREE.Mesh(chamferBottomGeo, material)
  const chamferTop = new THREE.Mesh(chamferTopGeo, material)

  cylinderOuter.position.set(0, 0, 0)
  cylinderInner.position.set(0, 0, 0)
  cylinderInner.geometry.rotateX(Math.PI)
  chamferBottom.position.set(0,0,0)
  chamferBottom.geometry.rotateX(Math.PI)
  chamferTop.position.set(0,1.6,0)

  const cylinderCSG1 = CSG.fromMesh(cylinderOuter)
  const cylinderCSG2 = CSG.fromMesh(cylinderInner)
  const chamferBottomCSG = CSG.fromMesh(chamferBottom)
  const chamferTopCSG = CSG.fromMesh(chamferTop)

  const ringCSG = cylinderCSG1
  .subtract(cylinderCSG2)
  .subtract(chamferBottomCSG)
  .subtract(chamferTopCSG)
  const ringMesh = CSG.toMesh(ringCSG, new THREE.Matrix4())
  const engravedMesh = new THREE.Mesh(ringMesh.geometry, material)
  return { ringMesh, ringCSG, engravedMesh }
}
