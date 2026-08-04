export function createFloatingButton(){



    if(
        $("#mg-floating-button").length
    ){

        return;

    }



    const button = `


<div id="mg-floating-button">


<img 
src="https://i.postimg.cc/dVLjqnXs/IMG-7085.png">


</div>


`;



    $("body").append(button);



    const saved =
    JSON.parse(
        localStorage.getItem(
            "MG_FLOAT_POS"
        )
    );



    if(saved){


        $("#mg-floating-button")
        .css({

            left:saved.x+"px",

            top:saved.y+"px",

            right:"auto",

            bottom:"auto"

        });


    }



    $("#mg-floating-button")
    .on(
        "click",
        ()=>{


            import(
            "./casinoWindow.js"
            )
            .then(
                module=>{


                    module.openCasinoWindow();


                }
            );


        }
    );



    let dragging=false;

    let offsetX=0;

    let offsetY=0;



    $("#mg-floating-button")
    .on(
        "mousedown",
        function(e){


            dragging=true;


            offsetX =
            e.clientX -
            this.offsetLeft;


            offsetY =
            e.clientY -
            this.offsetTop;


        }
    );



    $(document)
    .on(
        "mousemove",
        function(e){


            if(!dragging)
            return;



            $("#mg-floating-button")
            .css({

                left:
                e.clientX-offsetX,

                top:
                e.clientY-offsetY,

                right:"auto",

                bottom:"auto"


            });



        }
    );



    $(document)
    .on(
        "mouseup",
        function(){


            if(!dragging)
            return;



            dragging=false;



            localStorage.setItem(

                "MG_FLOAT_POS",

                JSON.stringify({

                    x:
                    $("#mg-floating-button")
                    .position()
                    .left,


                    y:
                    $("#mg-floating-button")
                    .position()
                    .top


                })

            );


        }
    );



}
