
let casinoOpen = false;


const ICON =
"https://i.postimg.cc/dVLjqnXs/IMG-7085.png";



export function initCasinoUI(){


    if(document.querySelector("#mg-casino-root")){
        return;
    }


    $("body").append(`


<div id="mg-casino-root">


<div id="mg-casino-orb">

<img src="${ICON}">

</div>



<div id="mg-casino-panel">


<div class="casino-header">


<div>
🎰 Lucky Palace
</div>


<button id="casino-close">
×
</button>


</div>



<div class="casino-user">


<div class="casino-avatar">
👤
</div>


<div>

<div id="casino-username">
玩家
</div>


<div class="casino-chip">

🟡 1000 Chips

</div>


</div>


</div>



<div class="casino-line"></div>



<div class="casino-title">
游戏大厅
</div>



<div class="casino-games">


<button>
🎰
<br>
老虎机
</button>


<button>
🏇
<br>
赛马
</button>


<button>
🃏
<br>
扑克
</button>


<button>
🎲
<br>
骰子
</button>


</div>



<div class="casino-line"></div>



<div class="casino-title">
福利中心
</div>


<button class="casino-wide">

🎁 每日签到

</button>


<button class="casino-wide">

🎡 幸运转盘

</button>



</div>


</div>


`);



    loadUser();



    setupOrb();



    $("#casino-close")
    .on(
        "click",
        ()=>{

            closeCasino();

        }
    );



}



function setupOrb(){


const orb =
document.querySelector(
"#mg-casino-orb"
);



let dragging=false;

let moved=false;


let startX=0;

let startY=0;


let offsetX=0;

let offsetY=0;



const saved =
JSON.parse(
localStorage.getItem(
"MG_ORB_POS"
)
);



if(saved){

orb.style.left=
saved.x+"px";


orb.style.top=
saved.y+"px";


orb.style.right="auto";

orb.style.bottom="auto";

}



orb.addEventListener(
"pointerdown",
e=>{


orb.setPointerCapture(
e.pointerId
);


dragging=true;

moved=false;


startX=e.clientX;

startY=e.clientY;


const rect=
orb.getBoundingClientRect();


offsetX=
e.clientX-rect.left;


offsetY=
e.clientY-rect.top;



}
);




orb.addEventListener(
"pointermove",
e=>{


if(!dragging)
return;



let x=
e.clientX-offsetX;


let y=
e.clientY-offsetY;



if(
Math.abs(e.clientX-startX)>5 ||
Math.abs(e.clientY-startY)>5
){

moved=true;

}



if(!moved)
return;



orb.style.left=
x+"px";


orb.style.top=
y+"px";


orb.style.right="auto";

orb.style.bottom="auto";


}
);




orb.addEventListener(
"pointerup",
e=>{


dragging=false;



if(!moved){

openCasino();

return;

}



let rect=
orb.getBoundingClientRect();



let x=rect.left;


if(
rect.left + rect.width/2
<
window.innerWidth/2
){

x=10;

}

else{

x=
window.innerWidth-
rect.width-
10;

}



orb.style.left=x+"px";



localStorage.setItem(

"MG_ORB_POS",

JSON.stringify({

x:x,

y:rect.top

})

);



}
);



}





function openCasino(){


$("#mg-casino-panel")
.show();


casinoOpen=true;


}




function closeCasino(){


$("#mg-casino-panel")
.hide();


casinoOpen=false;


}





function loadUser(){


try{


const ctx =
window.SillyTavern
?.getContext?.();



if(ctx?.name){


$("#casino-username")
.text(
ctx.name
);


}



}
catch(e){


console.log(
"用户读取失败",
e
);


}



}
