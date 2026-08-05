import { createCasinoUI } from "./ui.js";

const MODULE_ID = "silly-casino";

const DEFAULT_SETTINGS = {
    showOrb:true,
};

let runtime = {
    initialized:false,
    ui:null
};


jQuery(async()=>{


if(runtime.initialized) return;


runtime.initialized=true;



const context = SillyTavern.getContext();


if(!context.extensionSettings[MODULE_ID]){

    context.extensionSettings[MODULE_ID]=
    structuredClone(DEFAULT_SETTINGS);

    context.saveSettingsDebounced();

}



runtime.ui=createCasinoUI(
    context.extensionSettings[MODULE_ID]
);


});
