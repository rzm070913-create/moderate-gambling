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



const orb=root.querySelector(".casino-orb");


const panel=root.querySelector(".casino-panel");

let orbDrag = null;
let suppressOrbClick = false;

orb.addEventListener("click",()=>{

panel.classList.toggle("show");

});



return {

root,

orb,

panel

};



}
