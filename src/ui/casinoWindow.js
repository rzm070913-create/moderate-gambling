export function openCasinoWindow(){


    $("#mg-casino-window").remove();



    let username="玩家";


    try{

        const context =
        SillyTavern.getContext();


        username =
        context.name
        ||
        "玩家";


    }
    catch(e){

        console.log(
            "用户信息读取失败",
            e
        );

    }




    const html = `


<div id="mg-casino-window">


<div class="mg-casino-header">


    <div>
    🎰 Lucky Palace
    </div>


    <button id="mg-window-close">
    ×
    </button>


</div>



<div class="mg-player">


<div class="mg-avatar">

👤

</div>


<div>

<b>
${username}
</b>


<br>


<span class="chip">

🟡 1000

</span>


</div>


</div>



<div class="chip-display">


🟡 1000


<div>
CHIPS
</div>


</div>



<div class="line"></div>



<h3>
🎮 游戏大厅
</h3>



<div class="game-grid">


<button>
🎰
<br>
老虎机
</button>



<button>
🃏
<br>
扑克
</button>



<button>
🏇
<br>
赛马
</button>



<button>
🎲
<br>
骰子
</button>



</div>



<div class="line"></div>



<h3>
🎁 福利中心
</h3>


<button class="reward">

每日签到

</button>


<button class="reward">

幸运转盘

</button>



</div>



`;



$("body").append(html);



$("#mg-window-close")
.on(
"click",
()=>{

$("#mg-casino-window")
.remove();

}
);



}
