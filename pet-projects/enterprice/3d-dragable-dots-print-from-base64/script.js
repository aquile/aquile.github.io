/**
 * Created by aquile_bernadotte on 01.11.15.
 */
var renderer, scene, camera, ww, wh, particles;

ww = window.innerWidth;
    wh = window.innerHeight;

var centerVector = new THREE.Vector3(0, 0, 0);
var previousTime = 0;
var speed = 10;
var isMouseDown = false;

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
        size: 1,
        color: 0xFFFFFF,
        sizeAttenuation: false
    });
    for (var y = 0, y2 = imagedata.height * 4; y < y2; y += 2) {
        for (var x = 0, x2 = imagedata.width * 4; x < x2; x += 2) {
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
    camera.zoom = 1.2;
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

var imgData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0CAMAAAD8CC+4AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAxZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjhDM0NDN0FGQjZDMTFFNjk2QTI4MjlDRjJCODUwRjkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjhDM0NDNzlGQjZDMTFFNjk2QTI4MjlDRjJCODUwRjkiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgTWFjaW50b3NoIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9IjdDQjQ3RDNENkU0QjBEQ0M3MTVEM0QxMjU3OTdEQUFDIiBzdFJlZjpkb2N1bWVudElEPSI3Q0I0N0QzRDZFNEIwRENDNzE1RDNEMTI1Nzk3REFBQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pl82qtQAAAAGUExURaCgoCEhIXhOB9gAADhGSURBVHja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";
//var imgData ="data:image/jpeg;base64,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"
//var imgData ="data:image/jpeg;base64,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"
init();