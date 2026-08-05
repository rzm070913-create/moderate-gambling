import {
randomSymbol
} from "./slot-symbols.js";


export function openSlot(root){


const stage=root.querySelector(
".casino-stage"
);


stage.innerHTML=`

<div class="slot-machine">


<div class="slot-grid">

${Array.from(
{length:15},
()=>`
<div class="slot-cell">
<div class="slot-symbol"></div>
</div>
`
).join("")}


</div>



<div class="slot-info">

下注:
<input 
class="slot-bet"
value="100"
type="number"
>


<button class="slot-spin">
开始旋转
</button>


<div class="slot-result">
</div>


</div>


</div>

`;


const cells=
stage.querySelectorAll(
".slot-cell"
);


stage.querySelector(
".slot-spin"
)
.onclick=()=>{


let result=[];


cells.forEach(cell=>{

let s=randomSymbol();

cell.innerHTML=
`
<div class="
slot-symbol 
${s.css}">
</div>
`;

result.push(s);


});


checkReward(result,stage);


};


}



function checkReward(result,stage){


let names=result.map(
x=>x.name
);


let count={};


names.forEach(n=>{
count[n]=(count[n]||0)+1;
});


let max=
Math.max(
...Object.values(count)
);



let text="未中奖";


if(max>=5)
text="★★★★★ 大奖";


else if(max>=4)
text="四连奖励";


else if(max>=3)
text="三连奖励";


stage.querySelector(
".slot-result"
)
.textContent=text;


}
