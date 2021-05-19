import * as THREE from '../utils/three.module.js'
import { RectAreaLightUniformsLib } from '../utils/RectAreaLightUniformsLib.js'
export const addLights = (scene) => {
  /**
   * add lights
   **/
  RectAreaLightUniformsLib.init()
  const lightProperty = { intensity: 10, width: 8, height: 20 }
  const redLight = new THREE.RectAreaLight(0xff0000, lightProperty.intensity, lightProperty.width, lightProperty.height)
  const greenLight = new THREE.RectAreaLight(
    0x00ff00,
    lightProperty.intensity,
    lightProperty.width,
    lightProperty.height,
  )
  const blueLight = new THREE.RectAreaLight(
    0x0000ff,
    lightProperty.intensity,
    lightProperty.width,
    lightProperty.height,
  )

  redLight.position.set(-5, 0, -10)
  greenLight.position.set(5, 0, -10)
  blueLight.position.set(15, 0, -10)
  redLight.rotateY(Math.PI)
  greenLight.rotateY(Math.PI)
  blueLight.rotateY(Math.PI)
  scene.add(redLight)
  scene.add(greenLight)
  scene.add(blueLight)

  scene.background = new THREE.Color().setHSL(0.51, 0.4, 0.01)
  scene.fog = new THREE.Fog(scene.background, 3500, 15000)
}
