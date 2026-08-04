import { createCasinoUI, removeCasinoUI } from "./src/ui/casinoUI.js";


console.log("🎰 适度赌博，赌狗万岁加载");



const SETTINGS_KEY =
"MG_SETTINGS";



let settings = {

    showOrb:true

};




function loadSettings(){

    const data =
    localStorage.getItem(
        SETTINGS_KEY
    );


    if(data){

        settings =
        Object.assign(
            settings,
            JSON.parse(data)
        );

    }

}



function saveSettings(){

    localStorage.setItem(
        SETTINGS_KEY,
        JSON.stringify(settings)
    );

}




function initExtensionPanel(){


    const container =
    document.querySelector(
        "#extensions_settings2"
    )
    ||
    document.querySelector(
        "#extensions_settings"
    );



    if(!container){

        setTimeout(
            initExtensionPanel,
            1000
        );

        return;

    }



    if(
        document.querySelector(
            "#mg-extension-setting"
        )
    ){

        return;

    }




    const div =
    document.createElement(
        "div"
    );



    div.id =
    "mg-extension-setting";



    div.innerHTML = `

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
id="mg-orb-switch">

显示赌场悬浮窗

</label>


</div>


</div>

`;



    container.appendChild(div);




    const checkbox =
    document.querySelector(
        "#mg-orb-switch"
    );



    checkbox.checked =
    settings.showOrb;



    checkbox.addEventListener(
        "change",
        ()=>{


            settings.showOrb =
            checkbox.checked;



            saveSettings();



            if(settings.showOrb){

                createCasinoUI();

            }
            else{

                removeCasinoUI();

            }


        }
    );


}






jQuery(()=>{


    loadSettings();


    initExtensionPanel();



    if(settings.showOrb){

        createCasinoUI();

    }


});
