import { createFloatingButton } from "./src/ui/floatingButton.js";
import { openCasinoWindow } from "./src/ui/casinoWindow.js";


console.log(
    "适度赌博，赌狗万岁加载"
);



function installExtensionPanel(){


    const host =
    document.querySelector(
        "#extensions_settings2, #extensions_settings"
    );


    if(!host){

        setTimeout(
            installExtensionPanel,
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



    const div =
    document.createElement("div");



    div.id="mg-settings";



    div.innerHTML=`

<div class="inline-drawer">


<div class="inline-drawer-toggle inline-drawer-header">

<b>
适度赌博，赌狗万岁
</b>

</div>



<div class="inline-drawer-content">


<label>

<input 
type="checkbox"
id="mg-enable-float">

来一把吧，user！

</label>


</div>


</div>

`;



    host.appendChild(div);



    const checkbox =
    document.querySelector(
        "#mg-enable-float"
    );



    const enabled =
    localStorage.getItem(
        "MG_FLOAT_ENABLE"
    )
    ==="true";



    checkbox.checked=enabled;



    if(enabled){

        createFloatingButton();

    }



    checkbox.addEventListener(
        "change",
        ()=>{


            if(
                checkbox.checked
            ){

                localStorage.setItem(
                    "MG_FLOAT_ENABLE",
                    "true"
                );


                createFloatingButton();


            }
            else{


                localStorage.setItem(
                    "MG_FLOAT_ENABLE",
                    "false"
                );


                $("#mg-floating-button")
                .remove();


            }


        }
    );



}



jQuery(()=>{


    installExtensionPanel();



});
