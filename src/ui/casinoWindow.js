export function openCasinoWindow(){



$("#mg-casino-window").remove();



const context =
globalThis.SillyTavern
?.getContext
?.();



const username =
context?.name
||
"玩家";



const html=`


<div id="mg-casino-window">


<div class="mg-title">


适度赌博，赌狗万岁


<button id="mg-window-close">

×

</button>


</div>



<div class="mg-user">


 ${username}


<br>


 筹码:
100


</div>



<hr>



<h3>
ALLIN
</h3>


<button>
🎰老虎机
</button>


<button>
🎲骰子
</button>


<button>
🏇赛马
</button>


<button>
🃏扑克
</button>



<h3>
福利中心
</h3>


<button>
每日签到
</button>



</div>


`;



$("body")
.append(html);



$("#mg-window-close")
.on(
"click",
()=>{


$("#mg-casino-window")
.remove();


}
);



}
