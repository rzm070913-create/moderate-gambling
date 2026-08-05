export function createCasinoUI(){


const root=document.createElement("div");


root.id="silly-casino-root";



const float=document.createElement("div");


float.id="silly-casino-float";



root.appendChild(float);



document.body.appendChild(root);



return {

root,

float

};


}
