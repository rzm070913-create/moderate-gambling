
const ICON =
"https://i.postimg.cc/dVLjqnXs/IMG-7085.png";



export function initCasinoUI(){


    if(
        document.querySelector("#mg-root")
    ){

        return;

    }



    $("body").append(`

<div id="mg-root">


<div id="mg-orb">

<img src="${ICON}">

</div>



<div id="mg-window">


<div class="mg-header">

🎰 Lucky Palace

<button id="mg-close">
×
</button>


</div>



<div class="mg-user">

👤 玩家

</div>



<div class="mg-chip">

🟡 1000

</div>



<div class="mg-menu">


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



    $("#mg-window")
    .hide();



    bindOrb();


    $("#mg-close")
    .click(()=>{

        $("#mg-window")
        .hide();

    });



}





function bindOrb(){


const orb =
document.querySelector(
"#mg-orb"
);



let down=false;

let move=false;


let sx=0;

let sy=0;


let ox=0;

let oy=0;



orb.addEventListener(
"pointerdown",
e=>{


down=true;

move=false;


sx=e.clientX;

sy=e.clientY;


const r =
orb.getBoundingClientRect();


ox=r.left;

oy=r.top;


orb.setPointerCapture(
e.pointerId
);


});




orb.addEventListener(
"pointermove",
e=>{


if(!down)
return;



let dx =
e.clientX-sx;


let dy =
e.clientY-sy;



if(
Math.abs(dx)>5 ||
Math.abs(dy)>5
){

move=true;

}



if(move){


orb.style.left =
ox+dx+"px";


orb.style.top =
oy+dy+"px";


orb.style.right="auto";

orb.style.bottom="auto";


}


});




orb.addEventListener(
"pointerup",
()=>{


down=false;



if(!move){

$("#mg-window")
.show();


}



});



}
