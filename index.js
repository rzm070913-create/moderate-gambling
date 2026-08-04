import { initCasinoUI } from "./ui.js";


console.log("🎰 适度赌博，赌狗万岁加载");


const SETTINGS_KEY = "mg_settings";


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
        JSON.parse(data);

    }

}



function saveSettings(){

    localStorage.setItem(
        SETTINGS_KEY,
        JSON.stringify(settings)
    );

}



function createExtensionSetting(){


    const box =
    document.querySelector(
        "#extensions_settings2"
    );


    if(!box){

        setTimeout(
            createExtensionSetting,
            1000
        );

        return;

    }



    if(
        document.querySelector(
            "#mg-setting-box"
        )
    ){

        return;

    }



    const div =
    document.createElement("div");


    div.id =
    "mg-setting-box";



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
id="mg-orb-toggle">

显示赌场悬浮窗

</label>


</div>


</div>

`;



    box.appendChild(div);



    const toggle =
    document.querySelector(
        "#mg-orb-toggle"
    );



    toggle.checked =
    settings.showOrb;



    toggle.onchange = ()=>{


        settings.showOrb =
        toggle.checked;


        saveSettings();



        if(toggle.checked){

            initCasinoUI();

        }
        else{

            document
            .querySelector(
                "#mg-root"
            )
            ?.remove();

        }


    };


}




jQuery(()=>{


    loadSettings();


    createExtensionSetting();



    if(settings.showOrb){

        initCasinoUI();

    }


});
