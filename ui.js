let orbDrag = null;
let suppressOrbClick = false;


export function createCasinoUI(){

    const root=document.createElement("div");

    root.id="silly-casino-root";

    document.body.appendChild(root);



    renderOrb(root);



    return {
        root
    };

}




function renderOrb(root){


root.innerHTML=`

<button class="casino-orb"
type="button">

<img src="./assets/casino-orb.png">

</button>

`;



const orb=root.querySelector(".casino-orb");



let savedPosition=JSON.parse(
localStorage.getItem("casino-orb-position")
||"null"
);



if(savedPosition){

    orb.style.left=savedPosition.x+"px";
    orb.style.top=savedPosition.y+"px";

}

else{

    orb.style.right="20px";
    orb.style.bottom="120px";

}




root.addEventListener(
"pointerdown",
event=>{


const target=event.target.closest(".casino-orb");

if(!target) return;


const rect=target.getBoundingClientRect();


target.style.left=rect.left+"px";
target.style.top=rect.top+"px";

target.style.right="auto";
target.style.bottom="auto";



orbDrag={

pointerId:event.pointerId,

startX:event.clientX,

startY:event.clientY,

originX:rect.left,

originY:rect.top,

moved:false

};



target.setPointerCapture(
event.pointerId
);



});






root.addEventListener(
"pointermove",
event=>{


if(!orbDrag) return;

if(event.pointerId!==orbDrag.pointerId)
return;



let dx=
event.clientX-orbDrag.startX;

let dy=
event.clientY-orbDrag.startY;



if(Math.hypot(dx,dy)>5)
orbDrag.moved=true;



if(!orbDrag.moved)
return;



const x=
orbDrag.originX+dx;


const y=
orbDrag.originY+dy;



orb.style.left=x+"px";
orb.style.top=y+"px";



});







root.addEventListener(
"pointerup",
event=>{


if(!orbDrag) return;


if(event.pointerId!==orbDrag.pointerId)
return;



if(orbDrag.moved){


let rect=
orb.getBoundingClientRect();



let data={

x:rect.left,
y:rect.top

};



localStorage.setItem(

"casino-orb-position",

JSON.stringify(data)

);



}



orb.releasePointerCapture?.(
event.pointerId
);



orbDrag=null;


});





orb.addEventListener(
"click",
()=>{


if(suppressOrbClick)
return;


console.log(
"SILLY CASINO OPEN"
);


});



}
