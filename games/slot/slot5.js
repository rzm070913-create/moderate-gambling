import {
randomSymbol
}
from "./slot-symbols.js";



export function open(root){


root.innerHTML=`

<div class="slot-window">


<h2>
🎰 五列老虎机
</h2>


<div class="slot-grid">

${
Array.from(
{length:15},
()=>`

<div class="slot-box">
<div class="slot-icon"></div>
</div>

`
).join("")
}


</div>



<div>

下注:

<input 
class="slot-bet"
value="100"
>


<button class="slot-spin">
旋转
</button>


</div>


<div class="slot-result">

</div>


</div>

`;



const boxes =
root.querySelectorAll(
".slot-box"
);



root.querySelector(
".slot-spin"
)
.onclick=()=>{


let result=[];


boxes.forEach(
box=>{

const s=randomSymbol();

box.innerHTML=
`
<div class="
slot-icon
${s.id}
slot-spin-animation">
</div>
`;


result.push(s);


});


settle(
result,
root
);


};


}



function settle(
result,
root
){

let count={};


result.forEach(
s=>{

count[s.id]
=
(count[s.id]||0)+1;

});



let max=
Math.max(
...Object.values(count)
);



root.querySelector(
".slot-result"
)
.textContent=

max>=5
?
"🎉 五连大奖"
:
max>=3
?
"中奖"
:
"谢谢参与";

}
