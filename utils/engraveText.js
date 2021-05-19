import * as THREE from './three.module.js'
import CSG from './CSGMesh.js'
import Bender from './bender.js'
const bender = new Bender()

export const engraveText = (scene, ringCSG, engravedMesh, font, innerText, outerText) => {
  const [innerTextGeometry, outerTextGeometry] = [innerText, outerText].map((text, idx) => {
    const geo = new THREE.TextBufferGeometry(text, {
      font,
      size: idx ? 0.5 : 1,
      height: idx ? 0.1 : 0.2,
      curveSegments: 2,
    })
    geo.center()
    if (idx) {
      geo.rotateY(Math.PI)
    }
    bender.bend(geo, 'y', Math.PI / 16)
    return geo
  })
  innerTextGeometry.translate(0, 0, -5)
  outerTextGeometry.translate(0, 0, -5.3)
  const engravedCSG = innerText
    ? ringCSG.subtract(CSG.fromGeometry(innerTextGeometry)).subtract(CSG.fromGeometry(outerTextGeometry))
    : ringCSG.subtract(CSG.fromGeometry(outerTextGeometry))
  engravedMesh.geometry.dispose()
  engravedMesh.geometry = CSG.toMesh(engravedCSG, new THREE.Matrix4()).geometry
  scene.add(engravedMesh)
}
