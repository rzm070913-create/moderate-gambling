import { loadData } from "./src/core/storage.js";
import { getCurrentCharacter } from "./src/character/loader.js";
import { openCasinoUI } from "./src/ui.js";


jQuery(async () => {


    console.log(
        "🎰 适度赌博，赌狗万岁 加载完成"
    );


    // 防止重复添加按钮
    if($("#mg-casino-entry").length){
        return;
    }



    // 创建入口按钮

    const button = `

    <div id="mg-casino-entry"
         class="list-group-item flex-container flexGap5">

        🎰 适度赌博，赌狗万岁

    </div>

    `;



    // 添加到扩展菜单

    $("#extensionsMenu")
    .append(button);



    // 点击打开赌场

    $("#mg-casino-entry")
    .on(
        "click",
        async function(){


            console.log(
                "打开赌场大厅"
            );


            //读取玩家数据

            const data =
            loadData();



            //读取当前角色

            let character;


            try{

                character =
                getCurrentCharacter();


            }catch(e){


                console.log(
                    "角色读取失败",
                    e
                );


                character={
                    name:"无角色",
                    description:""
                };


            }



            //打开UI

            openCasinoUI(
                data,
                character
            );


        }
    );


});
