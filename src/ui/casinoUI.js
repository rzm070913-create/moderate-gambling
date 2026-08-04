const ICON =
"https://i.postimg.cc/dVLjqnXs/IMG-7085.png";



let dragging=false;

let moved=false;


let startX=0;

let startY=0;


let originX=0;

let originY=0;




export function createCasinoUI(){



if(
document.querySelector(
"#mg-root"
)
){

return;

}



$("body").append(`


<div id="mg-root">


<div id="mg-orb">

<img src="${ICON}">

</div>



<div id="mg-panel">


<div class="mg-header">

<span>
🎰 Lucky Palace
</span>


<button id="mg-close">
×
</button>


</div>



<div class="mg-player">

👤 玩家


</div>




<div class="mg-chip">

🟡 1000

</div>



<div class="mg-games">


<button>
🎰老虎机
</button>


<button>
🏇赛马
</button>


<button>
🃏扑克
</button>


<button>
🎲骰子
</button>


</div>


</div>


</div>


`);




$("#mg-panel")
.hide();



bindOrb();



$("#mg-close")
.on(
"click",
()=>{

$("#mg-panel")
.hide();

}

);



}





function bindOrb(){



const orb =
document.querySelector(
"#mg-orb"
);



orb.addEventListener(
"pointerdown",
(e)=>{


dragging=true;

moved=false;


startX=e.clientX;

startY=e.clientY;



const rect =
orb.getBoundingClientRect();


originX =
rect.left;


originY =
rect.top;



orb.setPointerCapture(
e.pointerId
);



}

);






orb.addEventListener(
"pointermove",
(e)=>{


if(!dragging)
return;



const dx =
e.clientX-startX;


const dy =
e.clientY-startY;



if(
Math.sqrt(
dx*dx+dy*dy
)
>5
){

moved=true;

}




if(!moved)
return;



orb.style.left =
originX+dx+"px";


orb.style.top =
originY+dy+"px";



orb.style.right =
"auto";


orb.style.bottom =
"auto";



}

);







orb.addEventListener(
"pointerup",
()=>{


dragging=false;



if(!moved){


$("#mg-panel")
.show();


}



}

);



}




export function removeCasinoUI(){

$("#mg-root")
.remove();

}
