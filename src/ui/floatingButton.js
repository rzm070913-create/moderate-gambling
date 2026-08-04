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
    $("#mg-floating-button");



    //读取位置

    const saved =
    JSON.parse(
        localStorage.getItem(
            "MG_FLOAT_POS"
        )
    );



    if(saved){

        button.css({

            left:saved.x,
            top:saved.y,
            right:"auto",
            bottom:"auto"

        });

    }



    let pressTimer=null;

    let dragging=false;

    let moved=false;


    let startX=0;

    let startY=0;


    let offsetX=0;

    let offsetY=0;



    button.on(
        "pointerdown",
        function(e){


            startX=e.clientX;

            startY=e.clientY;



            offsetX=
            e.clientX-this.offsetLeft;


            offsetY=
            e.clientY-this.offsetTop;



            moved=false;



            pressTimer=setTimeout(()=>{


                dragging=true;


                button.addClass(
                    "dragging"
                );


            },500);



        }
    );




    button.on(
        "pointermove",
        function(e){



            let dx=
            Math.abs(
                e.clientX-startX
            );


            let dy=
            Math.abs(
                e.clientY-startY
            );



            if(dx>10 || dy>10){

                moved=true;

            }



            if(!dragging)
            return;



            button.css({

                left:
                e.clientX-offsetX,


                top:
                e.clientY-offsetY,


                right:"auto",

                bottom:"auto"

            });



        }
    );





    button.on(
        "pointerup",
        function(){



            clearTimeout(
                pressTimer
            );



            if(dragging){


                dragging=false;



                button.removeClass(
                    "dragging"
                );



                localStorage.setItem(

                    "MG_FLOAT_POS",

                    JSON.stringify({

                        x:
                        button.position().left,

                        y:
                        button.position().top

                    })

                );


                return;

            }



            //没有拖动才打开

            if(!moved){

                openCasinoWindow();

            }



        }
    );



}
