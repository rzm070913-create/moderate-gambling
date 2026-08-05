const ICON =
"https://i.postimg.cc/dVLjqnXs/IMG-7085.png";


let orbDrag = null;



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


<div id="casino">



<div class="top">


<div class="top-item">

<img src="https://i.postimg.cc/fRLzbqYc/IMG-7098.png">

</div>



<div class="top-item">

<img src="https://i.postimg.cc/g2Jz0t3q/IMG-7099.png">

</div>




<div class="top-item player-box">


<div class="player-name">

PLAYER

</div>


<div class="avatar">

<img id="mg-user-avatar">

</div>


<div class="money">

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





<div class="game-stage" id="game-display">


游戏展示区域


</div>






<div class="bottom">



<div class="bottom-item">

<img src="https://i.postimg.cc/RZDMJ1Rc/IMG-7102.png">

</div>


<div class="bottom-item">

<img src="https://i.postimg.cc/ZqvJ8976/IMG-7103.png">

</div>


<div class="bottom-item">

<img src="https://i.postimg.cc/Dz47rWjY/IMG-7104.png">

</div>


<div class="bottom-item">

<img src="https://i.postimg.cc/DZVnB2Hp/IMG-7105.png">

</div>


</div>



</div>



</div>



</div>

`);





let userAvatar =
$("#user_avatar").attr("src");


if(userAvatar){

$("#mg-user-avatar")
.attr(
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


$(".bottom-item")
.on(
"click",
function(){


let index =
$(this).index();


$("#game-display")
.html(`

<h2>

GAME ${index+1}

</h2>


<p>

游戏模块准备中

</p>

`);


});


}








function bindOrb(){


const root =
document.querySelector("#mg-root");


const orb =
root.querySelector("#mg-orb");


if(!orb)return;





orb.addEventListener(
"pointerdown",
event=>{


const rect =
orb.getBoundingClientRect();


orbDrag={

pointerId:event.pointerId,

startX:event.clientX,

startY:event.clientY,

originX:rect.left,

originY:rect.top,

moved:false

};



orb.setPointerCapture?.(
event.pointerId
);


});







root.addEventListener(
"pointermove",
event=>{


if(
!orbDrag ||
event.pointerId!==orbDrag.pointerId
)return;



const dx =
event.clientX-orbDrag.startX;


const dy =
event.clientY-orbDrag.startY;



if(
Math.hypot(dx,dy)>5
){

orbDrag.moved=true;

}




if(!orbDrag.moved)
return;




orb.style.left =
orbDrag.originX+dx+"px";


orb.style.top =
orbDrag.originY+dy+"px";


orb.style.right="auto";

orb.style.bottom="auto";



event.preventDefault();



});







const finish =
event=>{


if(
!orbDrag ||
event.pointerId!==orbDrag.pointerId
)
return;




const moved =
orbDrag.moved;



orb.releasePointerCapture?.(
event.pointerId
);



orbDrag=null;



if(!moved){

$("#mg-panel").show();

}



};




root.addEventListener(
"pointerup",
finish
);


root.addEventListener(
"pointercancel",
finish
);



}







export function removeCasinoUI(){

$("#mg-root").remove();

}
