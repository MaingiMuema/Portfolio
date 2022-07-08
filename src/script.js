import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { PointLightHelper } from 'three';
const img = document.querySelector("img"); 


//Loading
const textureLoader = new THREE.TextureLoader()

const normalTexture = textureLoader.load('/Textures/NormalMap.png')

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereBufferGeometry(1.2, 64, 32, 6.283185307179586, 6.283185307179586, 2.50070775225748, 6.283185307179586)

// Materials

const material = new THREE.MeshStandardMaterial()
material.color = new THREE.Color(0x0dcaf0)
material.metalness = 0.7
material.roughness = 0.2
material.normalMap = normalTexture;
// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights
//Light 1
const pointLight = new THREE.PointLight(0xfff799, 0.6)
pointLight.position.x = 2
pointLight.position.y = 8
pointLight.position.z = 2
scene.add(pointLight)

//Light 2
const pointLight2 = new THREE.PointLight(0xfff799, 0.8)
pointLight2.position.set(-0.95,1.85,-3.2)
pointLight2.intensity = 10

scene.add(pointLight2)

/*gui.add(pointLight2.position, 'y').min(-3).max(3).step(0.01)
gui.add(pointLight2.position, 'x').min(-6).max(3).step(0.01)
gui.add(pointLight2.position, 'z').min(-5).max(3).step(0.01)
gui.add(pointLight2, 'intensity').min(0).max(10).step(0.01)*/


const pointLightHelper2 = new THREE.PointLightHelper(pointLight2, 2)
scene.add(pointLightHelper2)
//Light 3
const pointLight3 = new THREE.PointLight(0x12ffff, 1)
pointLight3.position.set(2.57,-0.87,-1.11)
pointLight3.intensity = 10

scene.add(pointLight3)

/*gui.add(pointLight3.position, 'y').min(-3).max(3).step(0.01)
gui.add(pointLight3.position, 'x').min(-6).max(3).step(0.01)
gui.add(pointLight3.position, 'z').min(-5).max(3).step(0.01)
gui.add(pointLight3, 'intensity').min(0).max(10).step(0.01)*/

const pointLightHelper3 = new THREE.PointLightHelper(pointLight3, 2)
scene.add(pointLightHelper3)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 3
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */


document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;

function onDocumentMouseMove(event){
    mouseX = (event.clientX - windowX)
    mouseY = (event.clientY - windowY)
}

const clock = new THREE.Clock()

const tick = () =>
{

    targetX = mouseX* .001
    targetY = mouseY* .001
     

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .3* elapsedTime

    sphere.rotation.y += .5* (targetX - sphere.rotation.y)
    sphere.rotation.x += .05* (targetY - sphere.rotation.x)
    sphere.rotation.z += -0.5* (targetY - sphere.rotation.x)
    sphere.position.z += -0.1* (targetY - sphere.rotation.x)
    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()