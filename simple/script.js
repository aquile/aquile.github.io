/**
 * Created by aquile_bernadotte on 01.11.15.
 */
var renderer, scene, camera, ww, wh, particles;

ww = window.innerWidth;
    wh = window.innerHeight;

var centerVector = new THREE.Vector3(0, 0, 0);
var previousTime = 0;
speed = 10;
isMouseDown = false;

var getImageData = function(image) {

    var canvas = document.createElement("canvas");
    var image = document.createElement("img");
    image.src = imgData;
    canvas.width = image.width;
    canvas.height = image.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0);

    return ctx.getImageData(0, 0, image.width, image.height);
};

var drawTheMap = function() {

    var geometry = new THREE.Geometry();
    var material = new THREE.PointsMaterial({
        size: 3,
        color: 0xFF9900,
        sizeAttenuation: false
    });
    for (var y = 0, y2 = imagedata.height; y < y2; y += 2) {
        for (var x = 0, x2 = imagedata.width; x < x2; x += 2) {
            if (imagedata.data[(x * 4 + y * 4 * imagedata.width)] < 128) {

                var vertex = new THREE.Vector3();
                vertex.x = x - imagedata.width / 2;
                vertex.y = -y + imagedata.height / 2;
                vertex.z = -Math.random()*500;

                vertex.speed = Math.random() / speed + 0.015;

                geometry.vertices.push(vertex);
            }
        }
    }
    particles = new THREE.Points(geometry, material);

    scene.add(particles);

    requestAnimationFrame(render);
};

var init = function() {
    renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById("map"),
        antialias: true
    });
    renderer.setSize(ww, wh);
    renderer.setClearColor(0x00010D);

    scene = new THREE.Scene();

    camera = new THREE.OrthographicCamera( ww / - 2, ww / 2, wh / 2, wh / - 2, 1, 1000 );
    camera.position.set(7, 0, 4);
    camera.lookAt(centerVector);
    scene.add(camera);
    camera.zoom = 4;
    camera.updateProjectionMatrix();

    imagedata = getImageData();
    drawTheMap();

    window.addEventListener('mousemove', onMousemove, false);
    window.addEventListener('mousedown', onMousedown, false);
    window.addEventListener('mouseup', onMouseup, false);
    window.addEventListener('resize', onResize, false);

};
var onResize = function(){
    ww = window.innerWidth;
    wh = window.innerHeight;
    renderer.setSize(ww, wh);
    camera.left    = ww / - 2;
    camera.right   = ww / 2;
    camera.top     = wh / 2;
    camera.bottom  = wh / - 2;
    camera.updateProjectionMatrix();
};

var onMouseup = function(){
    isMouseDown = false;
};
var onMousedown = function(e){
    isMouseDown = true;
    lastMousePos = {x:e.clientX, y:e.clientY};
};
var onMousemove = function(e){
    if(isMouseDown){
        camera.position.x += (e.clientX-lastMousePos.x)/100;
        camera.position.y -= (e.clientY-lastMousePos.y)/100;
        camera.lookAt(centerVector);
        lastMousePos = {x:e.clientX, y:e.clientY};
    }
};

var render = function(a) {

    requestAnimationFrame(render);


    particles.geometry.verticesNeedUpdate = true;
    if(!isMouseDown){
        camera.position.x += (0-camera.position.x)*0.06;
        camera.position.y += (0-camera.position.y)*0.06;
        camera.lookAt(centerVector);
    }

    renderer.render(scene, camera);
};

var imgData ="data:image/jpeg;base64,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"
init();