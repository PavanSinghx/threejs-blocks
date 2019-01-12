var x = function () {

    var stats = new Stats();
    stats.showPanel(0);
    document.body.appendChild(stats.dom);

    //global vars
    var scene;
    var camera;
    var renderer;

    //lighting
    var ambLight;
    var spotlight;

    //particles
    var particleSystem;

    //objects
    var surface;
    var boxes;
    var box;


    function configureCamera() {
        //set camera's position
        camera.position.set(0, 0, -300);
        camera.rotation.x = 0;
    }

    function initScene() {
        //set up camera/renderer and get div container for webgl
        scene = new THREE.Scene();
        boxes = new BoxFactory(scene);
        //set up ambient light - light that remains uniform throughout the scene
        ambLight = new THREE.AmbientLight(0x2980b9);
        //spot light emitted from a single point
        spotlight = new THREE.SpotLight(0xffffff);
        spotlight.position.set(100, 1000, 100);
        spotlight.angle = Math.PI / 3;
        //Do a check to see whether the browser can suppor webgl else use an html5 canvas renderer 
        renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer();
        //rendering across the entire screen (sets div to 100% height and width)
        renderer.setSize(window.innerWidth, window.innerHeight);
        //get webgl container and append the renderer
        document.getElementById('webgl-container').appendChild(renderer.domElement);
        //add ambient lighting to the scene
        scene.add(ambLight);
        scene.add(spotlight);

        //set up the camera FOV, Aspect ratio, closest, furthest
        camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 1000);
        //add the camera to the scene
        configureCamera();
        scene.add(camera);

        //Create a standard box that acts as a surface
        surface = boxes.generateSpecularSurface("0x0088aa", "0x003344", 200, 5, 200, 0, 0, 0);
        box = boxes.generateRect(18, 18, 18, "#2d2d2d", -90, 20, 90);


        for (let i = -5; i < 6; i++) {
            boxes.generateRect(200, 50, 2, "#ffffff", 0, 0, 20 * i);
        }

        for (let i = -5; i < 6; i++) {
            boxes.generateRect(2, 50, 200, "#ffffff", 20 * i, 0, 0);
        }

        //add particles
        var partCount = 1900;
        var particles = new THREE.Geometry();
        var partMaterial = new THREE.ParticleBasicMaterial({
            color: 0xffffff,
            size: 16,
            map: THREE.ImageUtils.loadTexture(
                "materials/flare.png"
            ),
            blending: THREE.AdditiveBlending,
            transparent: true
        })

        for (let i = 0; i < partCount; i++) {
            var x = Math.random() * 500 - 200;
            var y = Math.random() * 500 - 200;
            var z = Math.random() * 500 - 200;
            var particle = new THREE.Vector3(x, y, z)
            particles.vertices.push(particle);
        }
        particleSystem = new THREE.Points(
            particles,
            partMaterial
        );
        scene.add(particleSystem);

        render();
    }

    function initAnimation() {
        if (camera.rotation.x >= -0.4) {
            camera.rotation.x -= 0.02;
        }
        if (camera.position.y <= 150) {
            camera.position.y += 2;
        }
        if (camera.position.z <= 280) {
            camera.position.z += 1.5;
        }
    }

    function animateParticles() {
        if (typeof (particleSystem.rotation) != 'undefined') {
            particleSystem.rotation.y += 0.001;
            particleSystem.rotation.x += 0.001;
            particleSystem.rotation.z += 0.001;
        }
    }

    function moveBlock() {
        window.addEventListener("keydown", function (event) {
            if (typeof(box) != 'undefined') {                
                if (event.defaultPrevented) {
                    return;
                }
                switch (event.key) {
                    case "ArrowDown":
                        if (box.position.z >= -90 && box.position.z < 90) {
                            box.position.z += 20;
                        }
                        break;
                    case "ArrowUp":
                        if (box.position.z > -90 && box.position.z <= 90) {
                            box.position.z -= 20;
                        }
                        break;
                    case "ArrowLeft":
                        if (box.position.x > -90 && box.position.x <= 90) {
                            box.position.x -= 20;
                        }
                        break;
                    case "ArrowRight":
                        if (box.position.x >= -90 && box.position.x < 90) {
                            box.position.x += 20;
                        }
                        break;
                    default:
                        return;
                }
            }

            event.preventDefault();
        }, true);
    }

    function render() {
        initAnimation();
        moveBlock();
        animateParticles();
        //fixed render updates
        stats.update();
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    window.onload = initScene;

}();


/*box = new THREE.Mesh(
    new THREE.BoxGeometry(20, 20, 20),
    new THREE.MeshBasicMaterial({
        vertexColors: THREE.VertexColors,
    })
);

    
var mat = new THREE.MeshBasicMaterial({
    vertexColors: THREE.VertexColors,
    side: THREE.DoubleSide
})

//define general geometry
var triangleGeometry = new THREE.Geometry();
//specify vertices
triangleGeometry.vertices.push(new THREE.Vector3(0.0, 1.0, 0.0));
triangleGeometry.vertices.push(new THREE.Vector3(-1.0, -1.0, 0.0));
triangleGeometry.vertices.push(new THREE.Vector3(1.0, -1.0, 0.0));
//show how theyre linked together
triangleGeometry.faces.push(new THREE.Face3(0, 1, 2));

//triangle geometry colors
triangleGeometry.faces[0].vertexColors[0] = new THREE.Color(0xff0000);
triangleGeometry.faces[0].vertexColors[1] = new THREE.Color(0x00ff00);
triangleGeometry.faces[0].vertexColors[2] = new THREE.Color(0x0000ff);

//squash it all together into a mesh
var manualGeometry = new THREE.Mesh(triangleGeometry, mat);

scene.add(manualGeometry); */

/*
        var loader = new THREE.OBJLoader();
        loader.load(
            'models/TREE.obj',
            (object) => {
                window.tree = object;
                console.log(tree.position.x);
                scene.add(object);
            }
        );
*/