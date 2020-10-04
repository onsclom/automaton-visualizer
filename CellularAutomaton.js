/// <reference path="node_modules/@types/p5/global.d.ts" />


function generate_automaton(rules, size) {

    automaton = []

    img = createImage(size*2-1,size);
    img.loadPixels();

    for (let y = 0; y<size; y++) {
        let cur_row=[]
        for (let x = 0; x<size*2-1;x++) {
            if (y==0) {
                //if first row, the only true is the middle
                cur_row.push(x==size-1?1:0)
            }
            else {
                //get top right
                let bit1;
                if (x+1 >= size*2-1) {
                    bit1 = 0;
                }
                else {
                    bit1 = automaton[y-1][x+1];
                }
                //get top middle
                let bit2;
                bit2 = automaton[y-1][x];
                //get top left
                let bit3;
                if (x-1 <= 0) {
                    bit3 = 0;
                }
                else {
                    bit3 = automaton[y-1][x-1];
                }

                //get index
                index = 7-bit1-bit2*2-bit3*4
                cur_row.push(rules[index])
            }

            img.set(x,y, cur_row[cur_row.length-1]==1?color('#111'):color('#eee'))
        }
        automaton.push(cur_row)
    }

    img.updatePixels()
    loading.style.display = "none"

    return automaton
}