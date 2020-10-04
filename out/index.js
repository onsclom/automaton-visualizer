/// <reference path="node_modules/@types/p5/global.d.ts" />
function setup() {
    createCanvas(windowWidth, windowHeight);
}
function draw() {
    background(128);
    rectMode(CENTER);
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
