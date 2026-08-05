
import { createCasinoUI } from "./ui.js";

import {
loadPlayer
}
from "./core/player.js";

const MODULE_ID = "silly-casino";

const DEFAULT_SETTINGS = {

    showOrb:true,

    useSTName:true,

    useSTAvatar:true,


    customName:"",

    customAvatar:"",


    apiUrl:"",

    apiKey:""

};

function getSettings(){

    const context = SillyTavern.getContext();

    return context.extensionSettings[MODULE_ID];

}

function installSettingsEntry(){


if(document.getElementById(
"silly-casino-settings-entry"
)) return;



const host =
document.querySelector("#extensions_settings2")
||
document.querySelector("#extensions_settings");


if(!host){

setTimeout(
installSettingsEntry,
1000
);

return;

}

if(!host) return;



const entry=document.createElement("div");


entry.id="silly-casino-settings-entry";


entry.className="silly-casino-settings-entry";



entry.innerHTML=`

<div class="inline-drawer">


<div class="inline-drawer-toggle inline-drawer-header">

<b>SILLY CASINO</b>

<div class="inline-drawer-icon fa-solid fa-circle-chevron-down down"></div>

</div>



<div class="inline-drawer-content">


<label class="checkbox_label">

<input 
id="silly-casino-show-orb"
type="checkbox"
>

<span>
显示悬浮窗
</span>

</label>



<label class="checkbox_label">

<input 
id="casino-use-name"
type="checkbox"
>

<span>
使用酒馆用户名
</span>

</label>



<label class="checkbox_label">

<input 
id="casino-use-avatar"
type="checkbox"
>

<span>
使用酒馆头像
</span>

</label>



</div>


</div>

`;


host.appendChild(entry);



const checkbox=
entry.querySelector(
"#silly-casino-show-orb"
);



checkbox.checked=
getSettings().showOrb;



checkbox.addEventListener(
"change",
event=>{


getSettings().showOrb=
event.target.checked;


SillyTavern
.getContext()
.saveSettingsDebounced();



const orb=
document.querySelector(
".casino-orb"
);



if(orb){

orb.style.display=
event.target.checked
?"block"
:"none";

}



});



}





const runtime = globalThis.__sillyCasinoRuntime || {
    initialized:false,
    ui:null
};


globalThis.__sillyCasinoRuntime = runtime;



jQuery(async()=>{


    if(runtime.initialized){
        console.log(
            "SILLY CASINO already initialized"
        );
        return;
    }


    runtime.initialized=true;



    loadPlayer();



    const context = SillyTavern.getContext();



    if(!context.extensionSettings[MODULE_ID]){

        context.extensionSettings[MODULE_ID] =
        structuredClone(DEFAULT_SETTINGS);


        context.saveSettingsDebounced();

    }



    runtime.ui=createCasinoUI(
        context.extensionSettings[MODULE_ID]
    );



    installSettingsEntry();



});
