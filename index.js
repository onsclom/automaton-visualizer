/// <reference path="node_modules/@types/p5/global.d.ts" />

//p5.disableFriendlyErrors = true;

let center_x = 0
let center_y = 0
let zoom = 50
let unit
let automaton
let img

const zoomP = document.getElementById("zoomP")
const resetZoomButton = document.getElementById("ResetZoom")
const recalculateButton = document.getElementById("Recalculate")
const ruleInput = document.getElementById("ruleInput")
const shuffle = document.getElementById("Shuffle")
const size = document.getElementById("sizeInput")
const loading = document.getElementById("loading")
const download = document.getElementById("download")

document.addEventListener("touchmove", () => {
    document.trigger('mousewheel')
})

download.addEventListener("click", () => {
    save(img, 'automaton.png')
})

recalculateButton.addEventListener("click", () => {
    let binary = int(ruleInput.value).toString(2)

    binary = "0".repeat(8-binary.length)+binary
    
    loading.style.display = "block"
    setTimeout(()=>{
        automaton = generate_automaton( [...binary], int(size.value))
        automaton_x_cent = automaton[0].length/2.0-.5
        automaton_y_cent = automaton.length/2.0-.5
    },20)

})

shuffle.addEventListener("click", () => {

    let binary = String( Math.floor(random(256)) );
    ruleInput.value = binary;

    binary = int(ruleInput.value).toString(2)

    loading.style.display = "block"
    setTimeout(()=>{
        automaton = generate_automaton( [...binary], int(size.value))
        automaton_x_cent = automaton[0].length/2.0-.5
        automaton_y_cent = automaton.length/2.0-.5
    },20)
})

resetZoomButton.addEventListener("click", () => {
    zoom = 50;
    center_x = 0
    center_y = 0
    zoomP.innerText = `Zoom level: 1/${Math.round(zoom)}`
})


function preload() {
}

function setup() {
    unit = displayHeight/zoom;
    
    let canvas;

    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        // true for mobile device
        canvas = createCanvas(displayWidth, displayHeight)
      }else{
        // false for not mobile device
        canvas = createCanvas(windowWidth, windowHeight)
      }
    
    canvas.drawingContext.imageSmoothingEnabled=false
    canvas.position(0,0)
    canvas.style('z-index', '-1')

    console.log(canvas)

    canvas.canvas.addEventListener("touchstart",  function(event) {event.preventDefault()})
    canvas.canvas.addEventListener("touchmove",   function(event) {event.preventDefault()})
    canvas.canvas.addEventListener("touchend",    function(event) {event.preventDefault()})
    canvas.canvas.addEventListener("touchcancel", function(event) {event.preventDefault()})

    textSize(32)
    textAlign(CENTER, CENTER)
    rectMode(CENTER)

    zoomP.innerText = `Zoom level: 1/${Math.round(zoom)}`

    automaton = generate_automaton([0,0,0,1,1,1,1,0], 50)
    automaton_x_cent = automaton[0].length/2.0-.5
    automaton_y_cent = automaton.length/2.0-.5

    setAttributes('antialias', false);
}

function draw() {
    background(color('#eee'));

    unit = windowHeight/zoom;

    if (mouseIsPressed) {
        center_x += (winMouseX - pwinMouseX)/unit
        center_y += (winMouseY - pwinMouseY)/unit
    }
    
    push()
    translate( (windowWidth)/2,(windowHeight)/2)
    
    translate( center_x*unit, center_y*unit )

    // for (let y=0; y<automaton.length; y++) {
    //     for (let x=0; x<automaton[0].length; x++) {
    //         if (automaton[y][x]==1) {
    //             fill(color('#111'))
    //             stroke(color('#111'))
    //             rect(unit*(x-automaton_x_cent), unit*(y-automaton_y_cent),unit,unit)
    //         }
    //     }
    // }
    
    //image(img, 0, 0, unit*automaton.length*2, unit*automaton.length)
    image(img, -img.width*unit/2, -img.height*unit/2,img.width*unit, img.height*unit)
    pop()
}

function mouseWheel(event) {
    zoom += event.delta/20;
    zoom = max(10,zoom)

    zoomP.innerText = `Zoom level: 1/${Math.round(zoom)}`

    return false;
}


function windowResized() {
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        // true for mobile device
        resizeCanvas(displayWidth, displayHeight)
      }else{
        // false for not mobile device
        resizeCanvas(windowWidth, windowHeight)
      }
      
    unit = windowHeight/zoom
}