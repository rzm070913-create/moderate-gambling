import { openCasinoWindow } from "./casinoWindow.js";


export function createFloatingButton(){


    if($("#mg-floating-button").length){
        return;
    }



    $("body").append(`

    <div id="mg-floating-button">

        <img src="https://i.postimg.cc/dVLjqnXs/IMG-7085.png">

    </div>

    `);



    const button =
    document.querySelector(
        "#mg-floating-button"
    );



    let drag = null;



    // 恢复位置

    const saved =
    JSON.parse(
        localStorage.getItem(
            "MG_FLOAT_POS"
        )
    );



    if(saved){

        button.style.left =
        saved.x + "px";


        button.style.top =
        saved.y + "px";


        button.style.right =
        "auto";


        button.style.bottom =
        "auto";

    }



    button.addEventListener(
        "pointerdown",
        event=>{


            if(event.button !== undefined &&
               event.button !== 0)
            return;



            const rect =
            button.getBoundingClientRect();



            button.style.left =
            rect.left + "px";


            button.style.top =
            rect.top + "px";


            button.style.right =
            "auto";


            button.style.bottom =
            "auto";



            drag={


                pointerId:
                event.pointerId,


                startX:
                event.clientX,


                startY:
                event.clientY,


                originX:
                rect.left,


                originY:
                rect.top,


                x:
                rect.left,


                y:
                rect.top,


                moved:false


            };



            button.setPointerCapture?.(
                event.pointerId
            );



        }
    );





    button.addEventListener(
        "pointermove",
        event=>{


            if(
                !drag ||
                event.pointerId !== drag.pointerId
            )
            return;



            const dx =
            event.clientX -
            drag.startX;



            const dy =
            event.clientY -
            drag.startY;



            if(
                Math.hypot(dx,dy)>5
            ){

                drag.moved=true;

            }



            if(!drag.moved)
            return;



            let x =
            drag.originX + dx;


            let y =
            drag.originY + dy;



            const size =
            button.offsetWidth;



            x =
            Math.max(
                0,
                Math.min(
                    window.innerWidth-size,
                    x
                )
            );


            y =
            Math.max(
                0,
                Math.min(
                    window.innerHeight-size,
                    y
                )
            );



            button.style.left =
            x+"px";


            button.style.top =
            y+"px";



            drag.x=x;
            drag.y=y;



            event.preventDefault();


        }
    );





    function finishDrag(event){


        if(
            !drag ||
            event.pointerId !== drag.pointerId
        )
        return;



        button.releasePointerCapture?.(
            event.pointerId
        );



        const finished =
        drag;



        drag=null;



        if(!finished.moved){

            openCasinoWindow();

            return;

        }



        // 吸附左右边


        const size =
        button.offsetWidth;


        let x =
        finished.x;



        if(
            x + size/2 <
            window.innerWidth/2
        ){

            x=12;

        }
        else{

            x=
            window.innerWidth-size-12;

        }



        button.style.left =
        x+"px";



        localStorage.setItem(

            "MG_FLOAT_POS",

            JSON.stringify({

                x:x,

                y:finished.y

            })

        );


    }




    button.addEventListener(
        "pointerup",
        finishDrag
    );


    button.addEventListener(
        "pointercancel",
        finishDrag
    );


}
