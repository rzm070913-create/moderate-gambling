const ICON =
"https://i.postimg.cc/dVLjqnXs/IMG-7085.png";


export function createCasinoUI(){

if(document.querySelector("#mg-root")) return;


$("body").append(`

<div id="mg-root">


<div id="mg-orb">

<img src="${ICON}">

</div>



<div id="mg-panel">


<div class="casino-top">


<div class="casino-title">

🎰 SILLY CASINO

</div>



<div class="casino-user">


<div class="avatar">

👤

</div>


<div>

<div class="username">

PLAYER

</div>


<div class="chips">

🟡 1000

</div>


</div>



</div>


</div>





<div class="casino-tabs">


<button>
🎡轮盘
</button>


<button>
🃏扑克
</button>


<button>
🎰老虎机
</button>


<button>
🎲骰子
</button>


</div>





<div class="casino-content">


<h2>

欢迎来到赌场

</h2>


<p>

请选择游戏

</p>



</div>





<div class="casino-bottom">


<button>
📈股票
</button>


<button>
💎加密货币
</button>


<button>
🛠打工赚钱
</button>


</div>



</div>


</div>

`);



$("#mg-panel").hide();



bindCasinoOrb();



$("#mg-close").on(
"click",
()=>{

$("#mg-panel").hide();

}

);


}





function bindCasinoOrb(){


const orb=document.querySelector(
"#mg-orb"
);


let down=false;

let moved=false;

let sx,sy;

let ox,oy;



orb.onpointerdown=(e)=>{


down=true;

moved=false;


sx=e.clientX;

sy=e.clientY;


const r=
orb.getBoundingClientRect();


ox=r.left;

oy=r.top;


orb.setPointerCapture(
e.pointerId
);


};



orb.onpointermove=(e)=>{


if(!down)return;


let dx=
e.clientX-sx;


let dy=
e.clientY-sy;



if(Math.sqrt(dx*dx+dy*dy)>8){

moved=true;

}



if(moved){


orb.style.left=
ox+dx+"px";


orb.style.top=
oy+dy+"px";


orb.style.right="auto";

orb.style.bottom="auto";


}



};



orb.onpointerup=()=>{


down=false;


if(!moved){

$("#mg-panel").show();

}


};


}



export function removeCasinoUI(){

$("#mg-root").remove();

}
