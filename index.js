import { loadData } from "./src/core/storage.js";
import { getCurrentCharacter } from "./src/character/loader.js";
import { createCasinoUI } from "./src/ui.js";
jQuery(async()=>{


    console.log(
        "🎰 适度赌博，赌狗万岁 启动"
    );


    //读取玩家数据
    const data = loadData();


    console.log(
        "当前筹码:",
        data.coins
    );


    //读取当前角色
    try{

        const character =
        getCurrentCharacter();


        console.log(
            "当前角色:",
            character.name
        );
createCasinoUI(
    data,
    character
);

    }catch(e){

        console.log(
            "角色读取失败",
            e
        );

    }


});
