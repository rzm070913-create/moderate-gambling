const ICON =
"https://i.postimg.cc/dVLjqnXs/IMG-7085.png";


let dragging=false;
let moved=false;

let startX=0;
let startY=0;

let originX=0;
let originY=0;



export function createCasinoUI(){


if(document.querySelector("#mg-root")) return;



$("head").append(`

<style>

#mg-panel{

width:1600px;
height:900px;

position:fixed;

left:50%;
top:50%;

transform:translate(-50%,-50%);

background:url("https://i.postimg.cc/1XwMyGKQ/IMG-7110.png");

background-size:100% 100%;

z-index:999999;

display:flex;
flex-direction:column;

}



.casino-top{

height:260px;

display:grid;

grid-template-columns:repeat(5,1fr);

align-items:center;

padding:40px 80px 0;

}



.casino-top img{

width:240px;
height:240px;

object-fit:contain;

}



.casino-player{

display:flex;

flex-direction:column;

align-items:center;

color:white;

}



.casino-avatar img{

width:220px;

height:220px;

border-radius:50%;

object-fit:cover;

}



.casino-money{

color:#ffd700;

font-size:20px;

}



.casino-stage{

flex:1;

display:flex;

justify-content:center;

align-items:center;

font-size:40px;

color:white;

text-shadow:0 4px 8px black;

}



.casino-bottom{

height:170px;

display:grid;

grid-template-columns:repeat(4,1fr);

align-items:center;

padding:0 100px 30px;

}



.casino-bottom img{

width:220px;

height:140px;

object-fit:contain;

cursor:pointer;

}



#mg-close{

position:absolute;

right:20px;

top:10px;

font-size:35px;

background:none;

border:0;

color:white;

cursor:pointer;

}

</style>

`);





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


<div>
<img src="https://i.postimg.cc/fRLzbqYc/IMG-7098.png">
</div>


<div>
<img src="https://i.postimg.cc/g2Jz0t3q/IMG-7099.png">
</div>



<div class="casino-player">

<div>
PLAYER
</div>


<div class="casino-avatar">

<img id="mg-user-avatar">

</div>


<div class="casino-money">

🟡1000

</div>


</div>



<div>
<img src="https://i.postimg.cc/3xR8wf2B/IMG-7100.png">
</div>


<div>
<img src="https://i.postimg.cc/x1CfdpLP/IMG-7101.png">
</div>



</div>





<div class="casino-stage" id="game-display">

游戏展示区域

</div>





<div class="casino-bottom">


<div>
<img data-game="roulette"
src="https://i.postimg.cc/RZDMJ1Rc/IMG-7102.png">
</div>


<div>
<img data-game="poker"
src="https://i.postimg.cc/ZqvJ8976/IMG-7103.png">
</div>


<div>
<img data-game="slot"
src="https://i.postimg.cc/Dz47rWjY/IMG-7104.png">
</div>


<div>
<img data-game="dice"
src="https://i.postimg.cc/DZVnB2Hp/IMG-7105.png">
</div>



</div>



</div>

</div>

`);





let userAvatar=$("#user_avatar").attr("src");


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


$(".casino-bottom img")
.on(
"click",
function(){


let game=$(this).data("game");


$("#game-display").html(`

<h2>${game}</h2>

<p>
游戏展示区域
</p>

`);


});


}













orb.addEventListener(
"pointermove",
(e)=>{


if(!dragging)return;


let dx=e.clientX-startX;

let dy=e.clientY-startY;



if(Math.sqrt(dx*dx+dy*dy)>8){

moved=true;

}



if(!moved)return;



orb.style.left=originX+dx+"px";

orb.style.top=originY+dy+"px";

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
