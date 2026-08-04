const ICON =
"https://i.postimg.cc/dVLjqnXs/IMG-7085.png";


let dragging = false;

let moved = false;

let startX = 0;

let startY = 0;

let originX = 0;

let originY = 0;



export function createCasinoUI(){


    if(document.querySelector("#mg-root")){
        return;
    }



$("body").append(`


<div id="mg-root">


<div id="mg-orb">

<img src="${ICON}">

</div>




<div id="mg-panel">





<div class="casino-header">


<div class="casino-name">

🎰 SILLY CASINO

</div>


<button id="mg-close">

×

</button>


</div>






<div class="casino-games">



<button data-game="roulette">

🎡轮盘

</button>



<button data-game="poker">

🃏扑克

</button>






<div class="casino-user">


<div class="casino-avatar">

👤

</div>



<div>


<div class="casino-username">

PLAYER

</div>


<div class="casino-chip">

🟡1000

</div>


</div>


</div>






<button data-game="slot">

🎰老虎机

</button>



<button data-game="dice">

🎲骰子

</button>



</div>








<div class="casino-main">


<h2>

游戏大厅

</h2>


<p>

请选择游戏

</p>


</div>







<div class="casino-extra">


<button data-game="stock">

📈股票

</button>



<button data-game="crypto">

💎虚拟货币

</button>



<button data-game="work">

🛠打工

</button>




<button data-game="setting">

⚙设置

</button>



</div>






</div>


</div>


`);






$("#mg-panel").hide();




bindOrb();



bindGames();




$("#mg-close").on(
"click",
()=>{

$("#mg-panel").hide();

});



}







function bindGames(){


$(".casino-games button")
.on(
"click",
function(){


let game =
$(this).data("game");



$("#game-display").html(`

<h2>

${game}

</h2>


<p>

游戏模块准备中

</p>

`);



});


}







function bindOrb(){


const orb =
document.querySelector("#mg-orb");


if(!orb)return;



orb.addEventListener(
"pointerdown",
(e)=>{


dragging=true;

moved=false;


startX=e.clientX;

startY=e.clientY;



const rect =
orb.getBoundingClientRect();


originX=rect.left;

originY=rect.top;



orb.setPointerCapture(
e.pointerId
);



});






orb.addEventListener(
"pointermove",
(e)=>{


if(!dragging)return;



let dx =
e.clientX-startX;


let dy =
e.clientY-startY;



if(
Math.sqrt(dx*dx+dy*dy)>8
){

moved=true;

}



if(!moved)return;



orb.style.left =
originX+dx+"px";


orb.style.top =
originY+dy+"px";


orb.style.right="auto";

orb.style.bottom="auto";



});







orb.addEventListener(
"pointerup",
()=>{


dragging=false;



if(!moved){


$("#mg-panel").show();


}



});


}






export function removeCasinoUI(){

$("#mg-root").remove();

}
