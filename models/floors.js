import * as THREE from '../utils/three.module.js'
export const addFloor = (scene) => {
  const floor = new THREE.BoxGeometry(2000, 0.1, 2000)
  const matStdFloor = new THREE.MeshStandardMaterial({ color: 0x808080, roughness: 0.1, metalness: 0 })
  const mshStdFloor = new THREE.Mesh(floor, matStdFloor)
  scene.add(mshStdFloor)
  mshStdFloor.position.set(0, -5, 500)
}
