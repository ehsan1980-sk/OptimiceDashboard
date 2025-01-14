var clock = new THREE.Clock();
var delta = clock.getDelta(); // seconds.
var rotateAngle = Math.PI / 2 * delta; // pi/2 radians (90 degrees) per second
var container, stats;

var camera, scene, renderer;

var mouseX = 0,
    mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var isLoaded = false;


init();
animate();


function init() {

    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.z = 600;

    // scene

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf1f1f1);

    var ambient = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambient);

    var directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);

    // texture

    var manager = new THREE.LoadingManager();
    manager.onProgress = function (item, loaded, total) {

        console.log(item, loaded, total);

    };

    // model
    let i = 0;
    var loader = new THREE.OBJLoader(manager);
    loader.load('assets/3d/optimicev2_hand.obj', function (object) {
        isLoaded = true;
        document.body.classList.add('fade');
        object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                if (i == 1) {
                    let material = new THREE.MeshStandardMaterial();
                    material.color.setHex(0x080808);
                    material.opacity = 0.2;
                    material.transparent = true;
                    child.material = material;
                }
            }
            i++;
        });

        // object.position.x = - 60;
        object.position.y = -80;
        object.rotation.x = 270 * Math.PI / 180;
        // object.rotation.y = 180* Math.PI / 180;
        // object.rotation.z = 1* Math.PI / 180;
        object.scale.x = 2;
        object.scale.y = 2;
        object.scale.z = 2;
        obj = object
        scene.add(obj);

    });

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    document.addEventListener('mousemove', onDocumentMouseMove, false);

    window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) / 2;
    mouseY = (event.clientY - windowHalfY) / 2;
}

function animate() {
    requestAnimationFrame(animate);
    if (isLoaded) {
        render();
    }
}

function render() {

    obj.rotation.z += (0.2 * (Math.PI / 180));
    obj.rotation.z %= 360;

    // camera.position.x += ( mouseX - camera.position.x ) * .05;
    // camera.position.y += ( - mouseY - camera.position.y ) * .05;

    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}