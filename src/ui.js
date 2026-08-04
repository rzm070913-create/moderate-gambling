export function openCasinoUI(
    data,
    character
){


    $("#mg-casino-window").remove();



    const html = `

<div id="mg-casino-window">


    <div class="mg-header">


        <div>
        🎰 适度赌博，赌狗万岁
        </div>


        <button id="mg-close">

        ×

        </button>


    </div>



    <hr>



    <div>
    💰 筹码：

    ${data.coins}

    </div>



    <div>
    🤖 当前对手：

    ${character.name}

    </div>



    <hr>



    <h3>
    🎮 游戏大厅
    </h3>


    <button>
    🎰老虎机
    </button>


    <button>
    🎲骰子
    </button>


    <button>
    ✊猜拳
    </button>



    <h3>
    🎁 福利中心
    </h3>


    <button>
    📅每日签到
    </button>


    <button>
    🆘救济金
    </button>



</div>

`;



    $("body").append(html);



    $("#mg-close").on(
        "click",
        ()=>{


            $("#mg-casino-window")
            .remove();


        }
    );


}
