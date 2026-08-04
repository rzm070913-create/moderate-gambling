export function openCasinoUI(data, character){


    const html = `


    <div id="mg-casino-window">


        <div class="mg-header">

            <span>
            🎰 适度赌博，赌狗万岁
            </span>


            <button id="mg-close">

            ×

            </button>


        </div>



        <hr>



        <p>
        💰 筹码：
        <span>
        ${data.coins}
        </span>
        </p>



        <p>
        🤖 当前角色：
        ${character.name}
        </p>



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



    //关闭按钮

    $("#mg-close").on(
        "click",
        ()=>{


            $("#mg-casino-window")
            .remove();


        }
    );


}
