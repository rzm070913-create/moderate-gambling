export function createCasinoWindow(){


const root=document.createElement("div");

root.className="casino-inner";
    
root.innerHTML=`

<div class="casino-bg">


    <div class="casino-top">


       <button class="casino-item" data-game="slot">
    <div class="test-box">SLOT</div>
</button>


      <button class="casino-item" data-game="poker">
    <div class="test-box">POKER</div>
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
    <div class="test-box">WHEEL</div>
</button>


<button class="casino-item" data-game="dice">
    <div class="test-box">DICE</div>
</button>


    </div>




    <div class="casino-stage">


        <div class="casino-message">

            欢迎来到 SILLY CASINO

        </div>


    </div>





    <div class="casino-bottom">



  <button class="casino-item" data-game="stock">
    <div class="test-box">STOCK</div>
</button>


<button class="casino-item" data-game="crypto">
    <div class="test-box">CRYPTO</div>
</button>


<button class="casino-item" data-game="work">
    <div class="test-box">WORK</div>
</button>


<button class="casino-item" data-game="setting">
    <div class="test-box">SETTING</div>
</button>



    </div>


</div>


`;


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



const avatar =
context.characters
? context.characters[0]?.avatar
: null;

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
