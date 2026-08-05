import { createCasinoUI } from "./ui.js";

const MODULE_ID = "silly-casino";


let runtime = {
    initialized:false,
    ui:null
};


jQuery(async()=>{

    if(runtime.initialized) return;

    runtime.initialized=true;


    const extensionPath =
        `${import.meta.url.substring(
            0,
            import.meta.url.lastIndexOf("/")
        )}`;


    runtime.ui=createCasinoUI(extensionPath);

});
