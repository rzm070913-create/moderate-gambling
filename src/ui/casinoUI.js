const ICON =
"https://i.postimg.cc/dVLjqnXs/IMG-7085.png";



export function createCasinoUI(){


    if(document.querySelector("#mg-root")){
        return;
    }



    $("body").append(`


<div id="mg-root">



    <!-- 悬浮按钮 -->

    <div id="mg-orb">

        <img src="${ICON}">

    </div>





    <!-- 赌场窗口 -->

    <div id="mg-panel">



        <div class="casino-top">



            <div class="casino-top-item">

                <img src="https://i.postimg.cc/fRLzbqYc/IMG-7098.png">

            </div>



            <div class="casino-top-item">

                <img src="https://i.postimg.cc/g2Jz0t3q/IMG-7099.png">

            </div>





            <div class="casino-top-item casino-player">



                <div class="casino-username">

                    PLAYER

                </div>



                <div class="casino-avatar">

                    👤

                </div>



                <div class="casino-chip">

                    🟡1000

                </div>



            </div>






            <div class="casino-top-item">

                <img src="https://i.postimg.cc/3xR8wf2B/IMG-7100.png">

            </div>




            <div class="casino-top-item">

                <img src="https://i.postimg.cc/x1CfdpLP/IMG-7101.png">

            </div>




        </div>







        <!-- 游戏区域 -->


        <div class="casino-main">


            游戏展示区域


        </div>








        <!-- 底部 -->


        <div class="casino-bottom">



            <div class="casino-bottom-item">


                <img src="https://i.postimg.cc/RZDMJ1Rc/IMG-7102.png">


            </div>




            <div class="casino-bottom-item">


                <img src="https://i.postimg.cc/ZqvJ8976/IMG-7103.png">


            </div>




            <div class="casino-bottom-item">


                <img src="https://i.postimg.cc/Dz47rWjY/IMG-7104.png">


            </div>




            <div class="casino-bottom-item">


                <img src="https://i.postimg.cc/DZVnB2Hp/IMG-7105.png">


            </div>




        </div>






    </div>




</div>



`);




    $("#mg-panel").hide();



    bindCasinoOrb();



}








function bindCasinoOrb(){



    const orb =
    document.querySelector("#mg-orb");



    if(!orb){
        return;
    }



    let dragging=false;

    let moved=false;

    let startX=0;

    let startY=0;

    let originX=0;

    let originY=0;





    orb.addEventListener(
        "pointerdown",
        e=>{


            dragging=true;

            moved=false;



            startX=e.clientX;

            startY=e.clientY;



            let rect=
            orb.getBoundingClientRect();



            originX=rect.left;

            originY=rect.top;



            orb.setPointerCapture(
                e.pointerId
            );

        }
    );







    orb.addEventListener(
        "pointermove",
        e=>{


            if(!dragging){
                return;
            }



            let dx=
            e.clientX-startX;



            let dy=
            e.clientY-startY;



            if(
                Math.abs(dx)+Math.abs(dy)>8
            ){

                moved=true;

            }



            if(!moved){
                return;
            }




            orb.style.left=
            originX+dx+"px";



            orb.style.top=
            originY+dy+"px";



            orb.style.right="auto";

            orb.style.bottom="auto";


        }
    );







    orb.addEventListener(
        "pointerup",
        ()=>{


            dragging=false;



            if(!moved){


                $("#mg-panel").show();


            }


        }
    );





}




export function removeCasinoUI(){


    $("#mg-root").remove();


}
