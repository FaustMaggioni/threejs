import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'


const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg')
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30)

const geometry = new THREE.TorusGeometry(10,3,16,100)
const material = new THREE.MeshStandardMaterial({color: 0xc3c3c3})
const torus = new THREE.Mesh(geometry,material)

scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(20,20,20)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight,ambientLight)

/*const lightHelper = new THREE.PointLightHelper(pointLight)
const gridhelper = new THREE.GridHelper(200,50)
scene.add(lightHelper, gridhelper) */

const controls = new OrbitControls(camera,renderer.domElement)

function addStar(){
    console.log('star')
    const geometry = new THREE.SphereGeometry(0.25,24,24)
    const material = new THREE.MeshStandardMaterial({color: 0xffffff})
    const star = new THREE.Mesh( geometry, material )

    const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))

    star.position.set(x,y,z)
    scene.add(star)
}

Array(200).fill().forEach(() => addStar())


const spaceTexture = new THREE.TextureLoader().load('assets/fondo2.jpg')
scene.background = spaceTexture

const fausTexture = new THREE.TextureLoader().load('assets/yo2.webp')
const faus = new THREE.Mesh(
    new THREE.BoxGeometry(2,2,2),
    new THREE.MeshBasicMaterial({map: fausTexture})
)
faus.position.z = -5;
faus.position.x = 2;
scene.add(faus)

const faus2 = new THREE.Mesh(
    new THREE.BoxGeometry(2,2,2),
    new THREE.MeshBasicMaterial({map: fausTexture})
)
faus2.position.z = -5;
faus2.position.x = 2;
faus2.position.y = -10
scene.add(faus2)

const ballTexture = new THREE.TextureLoader().load('assets/ball.jpg')
const ball = new THREE.Mesh(
    new THREE.SphereGeometry(3,32,32),
    new THREE.MeshStandardMaterial({map: ballTexture})
)
ball.position.z = 30;
ball.position.setX(-10)
scene.add(ball)



function moveCamera(){
    const t = document.body.getBoundingClientRect().top
    ball.rotation.x += 0.05;
    ball.rotation.y += 0.05;
    ball.rotation.z += 0.05;

    faus.rotation.y += 0.001;
    faus.rotation.x += 0.001;

    faus2.rotation.y += 0.001;
    faus2.rotation.x += 0.001;

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.01;
    camera.position.y = t * -0.01;
}

document.body.onscroll = moveCamera

function animate(){
    requestAnimationFrame( animate )
    torus.rotation.x += 0.01;
    torus.rotation.y +=0.005;
    torus.rotation.z += 0.01
    renderer.render(scene, camera)
}

animate()