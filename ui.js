
import { casinoConfig } from "./config.js";


export function createCasinoUI(){


const root=document.createElement("div");

root.id="silly-casino-root";



root.innerHTML=`

<button class="casino-orb"
type="button"
aria-label="SILLY CASINO">
</button>


<div class="casino-panel">

<div class="casino-window">

SILLY CASINO

</div>

</div>


`;



document.body.appendChild(root);

const saved=
localStorage.getItem(
"silly-casino-orb-position"
);


if(saved){

try{


const pos=JSON.parse(saved);


orb.style.left=pos.x+"px";

orb.style.top=pos.y+"px";

orb.style.right="auto";

orb.style.bottom="auto";


}catch(e){}


}

const orb=root.querySelector(".casino-orb");
function updateOrbVisibility(){

    if(casinoConfig.showOrb){

        orb.style.display="block";

    }else{

        orb.style.display="none";

    }

}


updateOrbVisibility();

export function setCasinoOrbVisible(value){

    casinoConfig.showOrb=value;


    const orb=document.querySelector(
        ".casino-orb"
    );


    if(!orb)return;


    orb.style.display=
        value ? "block":"none";


}
    
const panel=root.querySelector(".casino-panel");

let orbDrag = null;
let suppressOrbClick = false;
function clampPosition(x,y){

    const size = orb.offsetWidth;

    const maxX = window.innerWidth - size;
    const maxY = window.innerHeight - size;


    return {

        x:Math.max(0,Math.min(maxX,x)),

        y:Math.max(0,Math.min(maxY,y))

    };

}



function moveOrb(x,y){

    const pos = clampPosition(x,y);


    orb.style.left = pos.x+"px";

    orb.style.top = pos.y+"px";

    orb.style.right="auto";

    orb.style.bottom="auto";


    return pos;

}

root.addEventListener(
"pointerdown",
event=>{


if(!event.target.closest(".casino-orb")) return;


if(event.button!==0) return;



const rect=orb.getBoundingClientRect();


orbDrag={


pointerId:event.pointerId,


startX:event.clientX,

startY:event.clientY,


originX:rect.left,

originY:rect.top,


x:rect.left,

y:rect.top,


moved:false


};



orb.setPointerCapture?.(
event.pointerId
);


orb.classList.add(
"is-dragging"
);


});

  root.addEventListener(
"pointermove",
event=>{


if(
!orbDrag ||
event.pointerId!==orbDrag.pointerId
)return;



const dx=
event.clientX-orbDrag.startX;


const dy=
event.clientY-orbDrag.startY;



if(
Math.hypot(dx,dy)>5
){

orbDrag.moved=true;

}



if(!orbDrag.moved)return;



const pos=moveOrb(

orbDrag.originX+dx,

orbDrag.originY+dy

);



orbDrag.x=pos.x;

orbDrag.y=pos.y;



event.preventDefault();


});

  function finishDrag(event){


if(
!orbDrag ||
event.pointerId!==orbDrag.pointerId
)return;



orb.classList.remove(
"is-dragging"
);



orb.releasePointerCapture?.(
event.pointerId
);



if(orbDrag.moved){


suppressOrbClick=true;


setTimeout(()=>{

suppressOrbClick=false;

},260);


localStorage.setItem(

"silly-casino-orb-position",

JSON.stringify({

x:orbDrag.x,

y:orbDrag.y

})

);


}


orbDrag=null;


}



root.addEventListener(
"pointerup",
finishDrag
);


root.addEventListener(
"pointercancel",
finishDrag
);

  
  
orb.addEventListener(
"click",
()=>{


if(suppressOrbClick){

suppressOrbClick=false;

return;

}


panel.classList.toggle("show");


});



return {

root,

orb,

panel

};



}
