import { loadData } from "./src/core/storage.js";
import { getCurrentCharacter } from "./src/character/loader.js";
import { openCasinoUI } from "./src/ui.js";


jQuery(async () => {


    console.log(
        "🎰 适度赌博，赌狗万岁 已加载"
    );


    // 防止重复添加按钮
    if($("#mg-casino-entry").length){
        return;
    }



    // 添加入口按钮

    const button = `

    <div id="mg-casino-entry"
         class="list-group-item flex-container flexGap5">

        🎰 适度赌博，赌狗万岁

    </div>

    `;



    $("#extensionsMenu").append(button);



    // 点击打开赌场

    $("#mg-casino-entry").on(
        "click",
        async()=>{


            const data =
            loadData();



            let character;


            try{

                character =
                getCurrentCharacter();


            }catch(e){


                character={
                    name:"AI庄家"
                };


            }



            openCasinoUI(
                data,
                character
            );


        }
    );


});
