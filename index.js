import { createCasinoUI } from "./ui.js";

const MODULE_ID = "silly-casino";

let runtime = {
    initialized:false,
    ui:null
};


jQuery(async()=>{

    if(runtime.initialized) return;

    runtime.initialized=true;

    runtime.ui=createCasinoUI();

});
