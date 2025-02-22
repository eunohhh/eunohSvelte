import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import workDb from './models.js';
import { reloadCounter, selected } from '../store.js'
"use strict";

async function viewerApp(){

let reloadCount = 0;
let loadCounter = 0;
let currentSelected = 0;
let expandCount = true;
let nowLoading = 1;
let idleTime = 0;

const guiTop = document.querySelector('.gui-main-3d');
const isMobile = () => {
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}; // =========> mobile device check function
const isAnd = () => {
    return /Android/i.test(navigator.userAgent);
}

/************* create elements ***************/
let loadDiv = document.createElement('div');
loadDiv.setAttribute('class', 'xyz-loading');
const overlay = document.createElement("div");
    overlay.setAttribute('class', 'temporal')
    overlay.style.position = "fixed";
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.height = "calc(var(--vh, 1vh) * 100)";
    overlay.style.zIndex = 10000; 
    overlay.style.opacity = 1;
    overlay.style.background = "rgba(255, 255, 255, 0.8)";
    overlay.style.pointerEvents = "none";
    overlay.style.display = "block";

const lightControl = document.querySelector('.btm-right-control');
const xyzCanvas = document.querySelector('.xyz-canvas');
const expand = document.querySelectorAll('.btm-left-3d span');
const swipe = document.querySelector('.gui-swipe-3d');
const rotateIcon = document.querySelector('.btm-right-3d span');
const rightIcon = document.querySelectorAll('.xyzright');
const midBox = document.querySelector('.mid-3d');
const rightBox = document.querySelector('.btm-right-3d');

let blankPage = document.createElement('div');
    blankPage.setAttribute('class', 'xyz-none-landscape');

let warn = document.createElement('h3');
    warn.innerHTML = `Looks good in portrait mode!`;

    blankPage.insertAdjacentElement('beforeend', warn);

guiTop.insertAdjacentElement('afterbegin', blankPage);
guiTop.insertAdjacentElement('afterbegin', overlay);

let eachBox = document.createElement('div');
    eachBox.setAttribute('class', 'gui-swipe-each-box');

workDb.forEach((e)=>{
    let cards = document.createElement('div');
        cards.setAttribute('class', 'gui-swipe-each');
        cards.setAttribute('data-num', e.num);
        cards.style.backgroundImage = `url(${e.thumb})`
        eachBox.insertAdjacentElement('beforeend',cards);
    swipe.insertAdjacentElement('beforeend', eachBox)
})

let navigateBox = document.createElement('div');
    navigateBox.setAttribute('class', 'gui-swipe-arrow-box');

navigateBox.insertAdjacentHTML('beforeend', insDownArrow('navigate_before', 'xyzbefore'));
navigateBox.insertAdjacentHTML('beforeend', insDownArrow('navigate_next', 'xyzafter'));
swipe.insertAdjacentElement('beforeend', navigateBox);

eachBox.lastChild.style.marginRight = '3rem';

function insDownArrow(str, where){
    let leftRight = `<div class="gui-down-arrow ${where}"><span class="material-icons-outlined" data-name="${where}">${str}</span></div>`;
    return leftRight;
}

const swipeAll = document.querySelectorAll('.gui-swipe-each');

/** ====== Generate a resize event if the device doesn't do it ====== */  
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener("orientationchange", () => window.dispatchEvent(new Event("resize")), false);

const fixedWidth = window.innerWidth; 
const fixedHeight = window.innerHeight;

// let halfWidth = fixedWidth / 2;
// let halfHeight = fixedHeight / 2;

/************* scene ***************/
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xc7c7c7);
scene.fog = new THREE.Fog( 0xc7c7c7, 10, 50 );

/************* renderer ***************/
const renderer = new THREE.WebGLRenderer({ antialias: true }); //canvas : canvas,
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( fixedWidth, fixedHeight);
renderer.setClearColor(0xffffff, 1);
// renderer.autoClear = false;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
renderer.outputColorSpace = THREE.SRGBColorSpace;

// xyzCanvas.insertAdjacentElement('beforeend', renderer.domElement );
xyzCanvas.appendChild(renderer.domElement );


/************* camera ***************/
// const cameraOrtho = new THREE.OrthographicCamera(- halfWidth, halfWidth, halfHeight, - halfHeight, - 10000, 10000);
// cameraOrtho.position.z = 100;

const camera = new THREE.PerspectiveCamera(
    85, // FOV
    fixedWidth / fixedHeight, // aspect ratio
    1, // near
    10000 // far
);
scene.add(camera);

isMobile() ? camera.position.set(0,2,17) : camera.position.set(0,2,11);

/************* controls ***************/
const controls = new OrbitControls( camera, renderer.domElement );
controls.autoRotate = true;
controls.update();

/************* effects ***************/
// const composer = new EffectComposer( renderer );
// const renderPass = new RenderPass( scene, camera );
// composer.addPass( renderPass );
// composer.addPass( glitchPass );

/************* lights ***************/

const colors = {
    sun : 0xfdfdf4,
    ired : 0xdcf6fe,
    bulb : 0xffe4c3,
    pin : 0xffffff
}

const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444, 0.3 );
hemiLight.position.set( 0, 20, -20 );

const ambLight = new THREE.AmbientLight(0xfdfdf4, 0.45);

const pointLight = new THREE.PointLight( 0xffffff, 0.3, 80 );
pointLight.position.set( 0, 20, 13 );
pointLight.castShadow = true; // default false
pointLight.shadow.radius = 8;
//Set up shadow properties for the light
pointLight.shadow.mapSize.width = 1024; // 2x
pointLight.shadow.mapSize.height = 1024; // 2x
pointLight.shadow.camera.near = 1; // default
pointLight.shadow.camera.far = 10000; // default
pointLight.shadow.camera.focus = 1;

const sunLight = new THREE.DirectionalLight(colors.sun, 1.1);
sunLight.position.set( 0, 20, 30 );

const iredLight = new THREE.DirectionalLight(colors.ired, 1.6);
iredLight.position.set( 0, 20, 30 );

const bulbLight = new THREE.DirectionalLight(colors.bulb, 1.7);
bulbLight.position.set( 0, 20, 30 );

const pinLight = new THREE.PointLight( colors.pin, 3.3, 50, 3 );
pinLight.position.set( 0, 10, 5 );

scene.add( hemiLight );
scene.add( ambLight );
scene.add( pointLight );

scene.add( sunLight );

//Create a helper for the shadow camera (optional)
// const helper = new THREE.CameraHelper( pointLight.shadow.camera );
// scene.add( helper );

// const helper2 = new THREE.HemisphereLightHelper( hemiLight, 3 );
// scene.add( helper2 );

// const helper3 = new THREE.DirectionalLightHelper( sunLight, 5 );
// scene.add( helper3 );

const mesh = new THREE.Mesh( new THREE.PlaneGeometry( 1000, 1000 ), new THREE.MeshPhongMaterial( { color: 0xeeeeee, depthWrite: false } ) );
mesh.rotation.x = - Math.PI / 2;
mesh.position.y = -3;
mesh.receiveShadow = true;
scene.add( mesh );

window.addEventListener('resize', () => setScreenSize());
if(window.innerWidth <= window.innerHeight) {
    setScreenSize();//portrait
} else {
    setScreenSize();//landscape
};

/************* model loader ***************/
const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( '/examples/jsm/libs/draco/' );
loader.setDRACOLoader( dracoLoader );

let myReq;
let lightMode = 'sun';
let startStop = true;
let curr = 0;
let name = '';

// reloadCounter.subscribe(async (value)=>{
//     reloadCount = value;
//     // console.log(reloadCount);
//     if(isAnd() && reloadCount === 5){
//         window.location.reload();
//     }else if(reloadCount === 8){
//         // localStorage.setItem('selected', 0);
//         window.location.reload();
//     }
// });

// let pullSelected = localStorage.getItem('selected');
// if( Number(pullSelected) > 0 ){
//     let guiDownArrow = document.querySelectorAll('.gui-down-arrow');
//     let toggleBtn = document.querySelector('.less');
//     await modelDispose();
//     await delCache();
//     modelLoad(workDb[pullSelected]);
//     swipe.classList.remove('xyzhide');
//     swipeAll[pullSelected].style.outline = '1px solid #b6b6b6';
//     toggleBtn.innerHTML = 'expand_more';
//     toggleBtn.classList.add('xyzon');
//     expandCount = !expandCount;
//     guiDownArrow.forEach((e)=>{
//         e.classList.add('xyzafter-on');
//     })
//     scrollStart();
// }

selected.subscribe(async (value)=>{
    currentSelected = value;
    // console.log(currentSelected, 'in subscribe');

    // let pullSelected = localStorage.getItem('selected');
    // if( pullSelected === undefined || pullSelected === null ){
        // console.log('first visit');

        if(currentSelected === 0){
            await modelDispose();
            await delCache();
            modelLoad(workDb[0]);
        }else{
            await modelDispose();
            await delCache();
            modelLoad(workDb[currentSelected]);
        }
        
    // }else if( Number(pullSelected) > 0 ){
    //     // console.log(localStorage.getItem('selected'), 'this is localstorage');
    // }
})
initAnimate();


/************* apps ***************/
function setScreenSize() {
    let vh = window.innerHeight * 0.01; 
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
};

function scrollSmoothly(x, y) {
    const startTime = performance.now();
    const duration = 300; 
    const startX = swipe.scrollLeft;
    const startY = swipe.scrollTop;

    function animate(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1); // 0부터 1까지의 진행 상황
    
        swipe.scrollTo(startX + x * progress, startY + y * progress);
    
        if (elapsedTime < duration) {
        requestAnimationFrame(animate); // 다음 프레임 요청
        }
    }
    requestAnimationFrame(animate); // 첫 번째 프레임 요청
}

document.body.addEventListener('click',()=> idleTime = 0)

swipe.addEventListener('click', async (e)=>{

    // console.log(e.target.dataset.name)
    let eachSwipe = document.querySelectorAll('.gui-swipe-each');

    if(typeof e.target.dataset.name === 'string'){
        e.target.style.color = `#ff6666`
        setTimeout(() => {
            e.target.style.color = `black`
        }, 100);
        let name = e.target.dataset.name;
        switch(name){
            case 'xyzbefore':
                isMobile() || window.innerWidth < 800 ? scrollSmoothly(-120, 0) : scrollSmoothly(-240, 0);
            break;
            case 'xyzafter' :
                // console.log(isMobile())

                isMobile() || window.innerWidth < 800 ? scrollSmoothly(120, 0) : scrollSmoothly(240, 0);
            break;
        }
    }

    let dataSet = Number(e.target.dataset.num);
    let dataName = e.target.dataset.name;

    if(!isNaN(dataSet)){
        scene.children.forEach((e)=>{
            if(typeof e.number === 'number' ){
                curr = e.number;
                name = e.name;
            }
        });
        if(curr === dataSet){
            console.log('same');
        } else {
            // console.log(dataSet)
            await modelDispose();
            await delCache(); // del cache
            modelLoad(workDb[dataSet]);
            // initAnimate();
            // rotateIcon.classList.remove('xyzon');
            // rotateIcon.classList.add('xyzon');

            let center = window.innerWidth / 2
            let rect = e.target.getBoundingClientRect();
            // console.log(rect)

            if(center <= rect.left){
                if(curr >= workDb.length -3){
                    // console.log('dont scroll next')
                }else{
                    // console.log('swipe click scroll next')
                    scrollSmoothly(rect.left - center, 0)
                }
            }else if(center >= rect.left){
                if(curr <= 3){
                    // console.log('dont scroll before')
                }else{
                    // console.log('swipe click scroll before')
                    scrollSmoothly(rect.left - center, 0)
                }
            }
            eachSwipe.forEach((ev)=>{
                ev.style.outline = 'none';
                
            })
            eachSwipe[dataSet].style.outline = '1.5px solid #ff6666'
        }
    }
    // console.log(Number(e.target.dataset.num) )
})

let lastTapTime = 0;
const delay = 300; // 더블 탭으로 판단하기 위한 시간 간격(밀리초)
midBox.addEventListener('mousedown', (e)=>{
    let center = window.innerWidth / 2
    if(nowLoading === 0 || e.detail === 2){
        alert('좀 천천히하셈');
    } else {
        midboxAction(e, center);
    }
});

midBox.addEventListener('touchend', (e)=>{
    e.preventDefault(); // 클릭이벤트 발생 방지;
    let currentTime = new Date().getTime();
    let timeDifference = currentTime - lastTapTime;

    if(timeDifference < delay && timeDifference > 0){
        alert('좀 천천히하셈');
    } else {
        let center = window.innerWidth / 2;
        if(nowLoading === 0){
            alert('좀 천천히하셈');
        } else {
            midboxAction(e, center);
        }
    }
    lastTapTime = currentTime; // 마지막 탭 시간을 현재 시간으로 업데이트
});

async function midboxAction(e, center){
    if(e.target.innerHTML === 'navigate_before'){
        scene.children.forEach((e)=>{
            if(typeof e.number === 'number' ){
                curr = e.number;
                name = e.name;
            }
        }); // can change with store.js ??
        if(curr > 0 && curr <= workDb.length -1){
            // rotateIcon.classList.remove('xyzon');
            // rotateIcon.classList.add('xyzon');

            await modelDispose();
            await delCache(); // del cache
            modelLoad(workDb[curr - 1]);
            // initAnimate();

            swipeAll.forEach((ev)=>{
                ev.style.outline = 'none';     
            });
            swipeAll[curr -1].style.outline = '1px solid #b6b6b6'

            let rect = swipeAll[curr -1].getBoundingClientRect();
    
            if(center >= rect.left){
                if(curr <= 3){
                    // console.log('dont scroll before')
                }else{
                    // console.log('nav click scroll before')
                    scrollSmoothly(rect.left - center, 0)
                }
            }else if(rect.right >= 2000){
                scrollSmoothly(rect.left - center, 0)
            }

        } else if(curr === 0){
            console.log('is first')
        } 
        e.target.style.color = `#ff6666`
        setTimeout(() => {
            e.target.style.color = `black`
        }, 100);
    } else if(e.target.innerHTML === 'navigate_next'){
        scene.children.forEach((e)=>{
            if(typeof e.number === 'number' ){
                curr = e.number;
                name = e.name;
            }
        });
        if(curr >= 0 && curr <= workDb.length -2){
            // rotateIcon.classList.remove('xyzon');
            // rotateIcon.classList.add('xyzon');

            await modelDispose();
            await delCache(); // del cache
            modelLoad(workDb[curr + 1]);
            // initAnimate();

            swipeAll.forEach((ev)=>{
                ev.style.outline = 'none';
            });
            swipeAll[curr +1].style.outline = '1px solid #b6b6b6';

            let rect = swipeAll[curr + 1].getBoundingClientRect();
            if(center <= rect.left){
                if(curr >= workDb.length -3){
                    // console.log('dont scroll next')
                }else{
                    // console.log('nav click scroll next')
                    scrollSmoothly(rect.left - center, 0)
                }
            }else if(rect.left < 0){
                scrollSmoothly(rect.left - center, 0)
            }

        } else if(curr === workDb.length -1){
            console.log('is last')
        } 
        e.target.style.color = `#ff6666`
        setTimeout(() => {
            e.target.style.color = `black`
        }, 100);
    }
}

rightBox.addEventListener('click', (e)=>{
    switch(e.target.innerHTML){
        case '360' :
                rotateIcon.classList.toggle('xyzon');
                if(startStop === true){
                    cancelAnimationFrame(myReq);
                    animateStoped();
                    // controls.autoRotate = false;
                    // controls.update();
                    // autoRotating = false;
                    // reqCounter = myReq;
                    // animateStoped();
                    startStop = false;
                } else {
                    cancelAnimationFrame(myReq)
                    initAnimate()
                    // cancelAnimationFrame(myReq_2)
                    // controls.autoRotate = true;
                    // controls.update();
                    // initAnimate();
                    startStop = true;
                }
            break;
        case 'wb_sunny' :
                onOff(e.target);
                lightModeChange(e.target.innerHTML);
                // console.log('basic light')
            break;
        case 'wb_iridescent' :
                onOff(e.target);
                lightModeChange(e.target.innerHTML);
                // console.log('iredescent');
            break;
        case 'lightbulb' :
                onOff(e.target);
                lightModeChange(e.target.innerHTML);
                // console.log('lightbulb');
            break;
        case 'highlight' :
                onOff(e.target);
                lightModeChange(e.target.innerHTML);
                // console.log('highlight');
            break;
    }
    
    function onOff(target){
        rightIcon.forEach((el)=>{
            el.classList.remove('xyzon');
        });
        target.classList.add('xyzon')
    }
});

lightControl.addEventListener('click', (e)=>{
    btnLightControl(e.target);
    e.target.style.color = `#ff6666`
    setTimeout(() => {
        e.target.style.color = `black`
    }, 100);
})

expand[0].addEventListener('click', (e)=>{
    let guiDownArrow = document.querySelectorAll('.gui-down-arrow');
    if(expandCount === true){
        e.currentTarget.innerHTML = 'expand_more';
        guiDownArrow.forEach((e)=>{
            e.classList.toggle('xyzafter-on')
        })
        expandCount = !expandCount;
    } else if(expandCount === false){
        e.currentTarget.innerHTML = 'expand_less';

        guiDownArrow.forEach((e)=>{
            e.classList.toggle('xyzafter-on')
        })
        expandCount = !expandCount;
    }
    e.currentTarget.classList.toggle('xyzon');
    swipe.classList.toggle('xyzhide');  
})

/**************** functions *****************/
function lightModeChange(target){
    switch(target){
        case 'wb_sunny' :
            lightMode = 'sun';
            removeLight();
            scene.add( sunLight );
            break;
        case 'wb_iridescent' :
            lightMode = 'ired';
            removeLight();
            scene.add( iredLight );
            break;
        case 'lightbulb' : 
            lightMode = 'bulb';
            removeLight();
            scene.add( bulbLight );
            break;
        case 'highlight' :
            lightMode = 'pin';
            removeLight();
            scene.add( pinLight );
            break;
    }
}

function removeLight(){
    if(sunLight || iredLight || bulbLight || pinLight){
        scene.remove( sunLight );
        scene.remove( iredLight );
        scene.remove( bulbLight );
        scene.remove( pinLight );
    } 
}

let xCounter = 0;
let zCounter = 30;
let yCounter = 20;
let pinZCounter = 10;
let pinYCounter = 5;
let limitClick = 0;
function btnLightControl(target){
    limitClick ++;
    switch(target.innerHTML){
        case 'arrow_upward' :
            lightSwitcher('up');
            break;
        case 'arrow_downward' :
            lightSwitcher('down');
            break;
        case 'arrow_back' : 
            lightSwitcher('back');
            break;
        case 'arrow_forward' :
            lightSwitcher('forward');
            break;
    }
}

function lightSwitcher(position){
    switch(lightMode){
        case 'sun' :
            setLightPosition(position, sunLight);
            break;
        case 'ired' :
            setLightPosition(position, iredLight);
            break;
        case 'bulb' :
            setLightPosition(position, bulbLight);
            break;
        case 'pin' :
            setLightPosition(position, pinLight);
            break;
    }
}

function setLightPosition(position, light) {
    if(light === 'sun' || light === 'ired' || light === 'bulb'){
        if(position === 'up'){
            zCounter -= 5;
            yCounter += 5;
            light.position.set( xCounter, yCounter, zCounter );
            limit();
        } else if(position === 'down'){
            zCounter += 1;
            yCounter -= 5;
            light.position.set( xCounter, yCounter, zCounter);
            limit();
        } else if(position === 'back'){
            xCounter -= 5;
            zCounter += 5;
            light.position.set( xCounter, yCounter, zCounter);
            limit();  
        } else if(position === 'forward'){
            xCounter += 5;
            zCounter -= 5;
            light.position.set( xCounter, yCounter, zCounter);
            limit();
        }
    } else {
        if(position === 'up'){
            pinZCounter -= 2;
            pinYCounter += 2;
            light.position.set( xCounter, pinYCounter, pinZCounter );
            if (limitClick >= 9){ 
                limitClick = 0;
                light.position.set(0, 10, 5);
                xCounter = 0; pinZCounter = 5; pinYCounter = 10;
            }
        } else if(position === 'down'){
            pinZCounter += 0.5;
            pinYCounter -= 2;
            light.position.set( xCounter, pinYCounter, pinZCounter);
            if (limitClick >= 9){ 
                limitClick = 0;
                light.position.set(0, 10, 5);
                xCounter = 0; pinZCounter = 5; pinYCounter = 10;
            }
        } else if(position === 'back'){
            pinZCounter -= 1;
            xCounter -= 1;
            light.position.set( xCounter, pinYCounter, pinZCounter);
            if (limitClick >= 9){ 
                limitClick = 0;
                light.position.set(0, 10, 5);
                xCounter = 0; pinZCounter = 5; pinYCounter = 10;
            } 
        } else if(position === 'forward'){
            pinZCounter += 1;
            xCounter += 1;
            light.position.set( xCounter, pinYCounter, pinZCounter);
            if (limitClick >= 9){ 
                limitClick = 0;
                light.position.set(0, 10, 5);
                xCounter = 0; pinZCounter = 5; pinYCounter = 10;
            }
        }
    }

    if(xCounter >= 50 || xCounter <= -50){
        xCounter = 0;
    }
    if(zCounter >= 50 || zCounter <= -50){
        zCounter = 30;
    }
    if(yCounter >= 50 || yCounter <= -50){
        yCounter = 20;
    }
    
    function limit(){
        if (limitClick >= 9){ 
            limitClick = 0 
            light.position.set(0, 20, 30);
            xCounter = 0;
            zCounter = 30;
            yCounter = 20;
        }
    }
}
async function delCache(){
    caches.keys().then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
            return caches.delete(key);
        }));
    });
    // console.log('캐시삭제완료')
}

function modelLoad(model){
    // if(reloadCounter === 10) window.location.reload(); // force reload
    loader.load(      
        model.obj,       
        (gltf)=>{
            // console.log(gltf.scene.scale)
            // console.log(gltf.scene)

            let box = new THREE.Box3().setFromObject( gltf.scene );
            let size = box.getSize( new THREE.Vector3() );
            let scaleFactor = 8 / Math.max(size.x, size.y, size.z);
            gltf.scene.scale.set(scaleFactor, scaleFactor, scaleFactor);

            gltf.scene.rotation.y = -1.7;
        
            gltf.scene.position.y = -3;

            gltf.scene.traverse(function(object){
                if ( object.isMesh ) {
                    object.castShadow = true;
                } else {
                    object.castShadow = true;
                }
            })
            gltf.scene.castShadow = true;
            gltf.scene.name = model.nick;
            gltf.scene.number = model.num;

            scene.add(gltf.scene);

            // startStop = true;
        }, 
        ( xhr ) => {
            loadCounter = ( xhr.loaded / xhr.total * 100 );
            loadDiv.innerHTML = `Loading.. ${Math.round(loadCounter)}%`;
            const mid3d = document.querySelector('.mid-3d');
                mid3d.insertAdjacentElement('beforeend', loadDiv);
            // console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            overlay.style.transition = `opacity ${ loadCounter / 100 }s ease-out ${ loadCounter / 100 }s`;
            if(loadCounter === 100){
                nowLoading = 1;
                loadDiv.remove();
                //reloadCounter.update(n => n + 1);
                selected.set(model.num);
                // localStorage.setItem('selected', currentSelected);
                overlay.style.opacity = "0";
                overlay.style.display = 'none';
                document.querySelector('.mid-left-3d span').style.pointerEvents = 'auto';
                document.querySelector('.mid-right-3d span').style.pointerEvents = 'auto';
                swipe.style.pointerEvents = 'auto';
            }else if(loadCounter < 100){
                nowLoading = 0;
                document.querySelector('.mid-left-3d span').style.pointerEvents = 'none';
                document.querySelector('.mid-right-3d span').style.pointerEvents = 'none';
                swipe.style.pointerEvents = 'none';
            }
        }, 
        ( error ) => { 
            loadDiv.innerHTML = `error ocurred! restart page!`;
            loadDiv.style.fontSize = '1rem';
            const mid3d = document.querySelector('.mid-3d');
                mid3d.insertAdjacentElement('beforeend', loadDiv);
            console.error( error );
        }
    );
}

async function modelDispose(){
    scene.children.forEach((e)=>{
        if(typeof e.number === 'number' ){
            scene.remove(e);
            if (e.children[0].geometry) {
                // console.log('지오 폐기')
                e.children[0].geometry.dispose();
            }
            if (e.children[0].material) {
                // console.log('메터리얼 폐기')
                e.children[0].material.dispose();
            }
            if (e.children[0].material.map) {
                // console.log('텍스처 폐기')
                e.children[0].material.map.dispose();
            }
            // renderer.dispose();
            // renderer.renderLists.dispose();
            // console.log(myReq)
            // console.log(myReq_2)
            // console.log(renderer.info);
            // console.log(renderer);
        }       
    })
    // // console.log(myReq)
    // if(reqCounter === myReq){
    //     console.log('stopped')
    // } else {
    //     // console.log('회전중임');
    //     // cancelAnimationFrame(myReq);
    //     // autoRotating = false;
    //     reqCounter = myReq;
    //     startStop = false;
    //     // animateStoped();
    // }
    return console.log('model disposed')
}

function initAnimate(){
    if ( WebGL.isWebGLAvailable() ) {
        // Initiate function or other initializations here
        animate();
    } else {    
        const warning = WebGL.getWebGLErrorMessage();
        document.getElementById( 'container' ).appendChild( warning );   
    }
}

function animate() {
    myReq = requestAnimationFrame( animate );
    controls.autoRotate = true;
    controls.update();
    renderer.render(scene, camera);
}

function animateStoped() {
    myReq = requestAnimationFrame( animateStoped );
    controls.autoRotate = false;
    controls.update();
    renderer.render(scene, camera);

}

function scrollStart(){
    let center = window.innerWidth / 2
    const swipeAll = document.querySelectorAll('.gui-swipe-each');
    let pullSelected = localStorage.getItem('selected');
    let rect = swipeAll[pullSelected].getBoundingClientRect();
    scrollSmoothly(rect.left - center, 0)
}

setInterval(()=>{
    idleTime = idleTime + 1;
    if (idleTime >= 2) { // 2 minutes
        alert('자리비우지마셈')
        window.location.href = "/";
    }
}, 60000)
}
export default viewerApp
// npx vite