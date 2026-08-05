export function createCasinoUI(){


const root=document.createElement("div");

root.id="casino-overlay";


root.innerHTML=`

<div class="casino-bg">


    <div class="casino-top">


        <button class="casino-item" data-game="slot">
            <img src="https://i.postimg.cc/fRLzbqYc/IMG-7098.png">
        </button>


        <button class="casino-item" data-game="poker">
            <img src="https://i.postimg.cc/g2Jz0t3q/IMG-7099.png">
        </button>



        <div class="casino-player">


            <div class="player-name">
                PLAYER
            </div>


            <div class="player-avatar-frame">


                <img 
                class="player-avatar"
                src=""
                >


            </div>


            <div class="player-money">
                🟡1000
            </div>


        </div>



        <button class="casino-item" data-game="wheel">
            <img src="https://i.postimg.cc/3xR8wf2B/IMG-7100.png">
        </button>



        <button class="casino-item" data-game="dice">
            <img src="https://i.postimg.cc/x1CfdpLP/IMG-7101.png">
        </button>


    </div>




    <div class="casino-stage">


        <div class="casino-message">

            欢迎来到 SILLY CASINO

        </div>


    </div>





    <div class="casino-bottom">



        <button class="casino-item" data-game="stock">
            <img src="https://i.postimg.cc/RZDMJ1Rc/IMG-7102.png">
        </button>


        <button class="casino-item" data-game="crypto">
            <img src="https://i.postimg.cc/ZqvJ8976/IMG-7103.png">
        </button>



        <button class="casino-item" data-game="work">
            <img src="https://i.postimg.cc/Dz47rWjY/IMG-7104.png">
        </button>



        <button class="casino-item" data-game="setting">
            <img src="https://i.postimg.cc/DZVnB2Hp/IMG-7105.png">
        </button>



    </div>


</div>


`;



document.body.appendChild(root);



loadUserAvatar(root);



root.querySelectorAll(".casino-item")
.forEach(btn=>{


btn.addEventListener(
"click",
()=>{


const game=
btn.dataset.game;


root.querySelector(
".casino-message"
).textContent=
game+" 模块开发中";


});


});



return root;


}





async function loadUserAvatar(root){


try{


const context=
SillyTavern.getContext();



const avatar=
context.user.avatar;



const img=
root.querySelector(
".player-avatar"
);



if(img){

img.src=avatar;

}


}catch(e){

console.log(
"SILLY CASINO avatar load failed",
e
);

}


}
