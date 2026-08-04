import { loadData } from "./src/core/storage.js";
import { getCurrentCharacter } from "./src/character/loader.js";
import { openCasinoUI } from "./src/ui.js";



console.log(
    "🎰 适度赌博，赌狗万岁 加载中..."
);



function installCasinoEntry(){


    const host =
    document.querySelector(
        "#extensions_settings2, #extensions_settings"
    );


    if(!host){

        console.log(
            "未找到扩展设置区域，等待重试"
        );

        setTimeout(
            installCasinoEntry,
            1000
        );

        return;

    }



    // 防止重复添加

    if(
        document.querySelector(
            "#mg-casino-entry"
        )
    ){

        return;

    }



    const entry =
    document.createElement(
        "div"
    );



    entry.id =
    "mg-casino-entry";



    entry.innerHTML = `

    <div class="inline-drawer">


        <div class="inline-drawer-toggle inline-drawer-header">

            <b>
            🎰 适度赌博，赌狗万岁
            </b>


        </div>



        <div class="inline-drawer-content">


            <button
            id="mg-open-casino"
            class="menu_button">

                打开赌场大厅

            </button>


        </div>


    </div>

    `;



    host.appendChild(entry);



    document
    .querySelector(
        "#mg-open-casino"
    )
    .addEventListener(
        "click",
        ()=>{


            const data =
            loadData();



            let character;



            try{


                character =
                getCurrentCharacter();


            }
            catch(e){


                character = {

                    name:
                    "AI庄家"

                };


            }



            openCasinoUI(
                data,
                character
            );


        }
    );



    console.log(
        "🎰 赌场入口安装完成"
    );


}



jQuery(()=>{


    installCasinoEntry();


});
