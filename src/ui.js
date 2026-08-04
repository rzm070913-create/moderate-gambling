export function createCasinoUI(data, character){

    const html = `

    <div id="mg-casino-window">


        <div class="mg-title">

        🎰 适度赌博，赌狗万岁

        </div>


        <div class="mg-info">

            <p>
            💰 筹码：
            <span id="mg-coins">
            ${data.coins}
            </span>
            </p>


            <p>
            🤖 当前角色：
            ${character.name}
            </p>


        </div>



        <hr>


        <h3>
        🎮 游戏大厅
        </h3>


        <button>
        🎰 老虎老虎机
        </button>


        <button>
        🎲 幸运骰子
        </button>


        <button>
        ✊ AI猜拳
        </button>



        <h3>
        🎁 福利中心
        </h3>


        <button>
        📅 每日签到
        </button>


        <button>
        🆘 救济金
        </button>



    </div>

    `;


    $("body").append(html);


}
