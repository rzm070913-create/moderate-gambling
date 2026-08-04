import "./src/ui/casino.css";
import { initCasinoUI } from "./src/ui/casinoUI.js";


console.log(
    "🎰 适度赌博，赌狗万岁加载"
);



function initExtensionSettings(){


    const host =
    document.querySelector(
        "#extensions_settings2, #extensions_settings"
    );



    if(!host){

        setTimeout(
            initExtensionSettings,
            1000
        );

        return;

    }



    if(
        document.querySelector(
            "#mg-settings"
        )
    ){

        return;

    }



    const box =
    document.createElement(
        "div"
    );


    box.id =
    "mg-settings";



    box.innerHTML = `


<div class="inline-drawer">


<div class="inline-drawer-toggle inline-drawer-header">


<b>
🎰 适度赌博，赌狗万岁
</b>


</div>



<div class="inline-drawer-content">


<label>


<input 
type="checkbox"
id="mg-toggle-orb">


显示赌场悬浮窗


</label>


</div>


</div>


`;



    host.appendChild(box);



    const checkbox =
    document.querySelector(
        "#mg-toggle-orb"
    );



    let enabled =
    localStorage.getItem(
        "MG_ENABLED"
    );



    //第一次安装默认开启

    if(enabled===null){

        enabled="true";

        localStorage.setItem(
            "MG_ENABLED",
            "true"
        );

    }



    checkbox.checked =
    enabled==="true";



    if(
        checkbox.checked
    ){

        initCasinoUI();

    }



    checkbox.addEventListener(
        "change",
        ()=>{


            if(
                checkbox.checked
            ){

                localStorage.setItem(
                    "MG_ENABLED",
                    "true"
                );


                initCasinoUI();


            }
            else{


                localStorage.setItem(
                    "MG_ENABLED",
                    "false"
                );


                $("#mg-casino-root")
                .remove();


            }


        }
    );


}





jQuery(()=>{


    initExtensionSettings();


});
