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


<button id="mg-close">

×

</button>





<div class="casino-top">



<div class="top-item">

<img src="https://i.postimg.cc/fRLzbqYc/IMG-7098.png">

</div>




<div class="top-item">

<img src="https://i.postimg.cc/g2Jz0t3q/IMG-7099.png">

</div>





<div class="casino-player">


<div class="casino-username">

PLAYER

</div>



<div class="casino-avatar">

<img id="mg-user-avatar">

</div>



<div class="casino-chip">

🟡1000

</div>



</div>





<div class="top-item">

<img src="https://i.postimg.cc/3xR8wf2B/IMG-7100.png">

</div>





<div class="top-item">

<img src="https://i.postimg.cc/x1CfdpLP/IMG-7101.png">

</div>



</div>






<div class="casino-main" id="game-display">


游戏展示区域


</div>







<div class="casino-extra">



<button data-game="roulette">

<img src="https://i.postimg.cc/RZDMJ1Rc/IMG-7102.png">

</button>




<button data-game="poker">

<img src="https://i.postimg.cc/ZqvJ8976/IMG-7103.png">

</button>





<button data-game="slot">

<img src="https://i.postimg.cc/Dz47rWjY/IMG-7104.png">

</button>





<button data-game="dice">

<img src="https://i.postimg.cc/DZVnB2Hp/IMG-7105.png">

</button>



</div>






</div>


</div>


`);



let userAvatar = $("#user_avatar").attr("src");


if(userAvatar){

    $("#mg-user-avatar").attr(
        "src",
        userAvatar
    );

}




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


$(".casino-extra button")
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
