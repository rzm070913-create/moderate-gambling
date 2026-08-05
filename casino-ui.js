const casinoPlayer = {

    name: "{{user}}",

    chips: Number(
        localStorage.getItem("casino_chips")
    ) || 10000,

};

export function createCasinoWindow(){


const root=document.createElement("div");

root.className="casino-inner";
    
root.innerHTML=`

<div class="casino-bg">
<button class="casino-close">
♠
</button>


    <div class="casino-top">


<button class="casino-item" data-game="slot">
<img src="https://i.postimg.cc/fRLzbqYc/IMG-7098.png">
</button>

<button class="casino-item" data-game="poker">
<img src="https://i.postimg.cc/g2Jz0t3q/IMG-7099.png">
</button>


        <div class="casino-player">

<div class="player-name">
${getCasinoName()}
</div>

function getCasinoName(){


const settings =
SillyTavern
.getContext()
.extensionSettings["silly-casino"];


if(settings.useSTName){

return "{{user}}";

}


return settings.customName || "PLAYER";


}

<div class="player-avatar user_avatar"></div>

<img 
class="avatar-frame-img"
src="https://i.postimg.cc/prRxMs2j/IMG-7106.png"
>

<img 
class="player-avatar"
src=""
>

</div>


           <div class="player-money">
    🟡${casinoPlayer.chips}
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


loadUserAvatar(root);

const closeBtn=root.querySelector(".casino-close");

closeBtn.onclick=()=>{

root.closest(".casino-panel").classList.remove("show");

};

root.querySelectorAll(".casino-item")
.forEach(btn=>{


btn.addEventListener(
"click",
()=>{


const game=
btn.dataset.game;


if(game==="setting"){

openCasinoSettings(root);

return;

}


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



const settings =
SillyTavern
.getContext()
.extensionSettings["silly-casino"];



if(settings.useSTAvatar){


img.src =
context.power_user.avatar;


}else{


img.src =
settings.customAvatar || "";


}



if(img){

img.src=avatar;

}


}catch(e){

console.log(
"SILLY CASINO avatar load failed",
e
);

}

function openCasinoSettings(root){


const context =
SillyTavern.getContext();


const settings =
context.extensionSettings["silly-casino"];



const box=document.createElement("div");


box.className="casino-settings-panel";


box.innerHTML=`

<h2>
CASINO SETTINGS
</h2>



<label>

昵称

<input 
id="casino-name"
value="${settings.customName||""}"
>

</label>



<label>

头像URL

<input 
id="casino-avatar"
value="${settings.customAvatar||""}"
>

</label>



<label>

API地址

<input 
id="casino-api"
value="${settings.apiUrl||""}"
placeholder="https://api.xxx.com/v1/chat/completions"
>

</label>



<label>

API Key

<input 
id="casino-key"
type="password"
value="${settings.apiKey||""}"
>

</label>



<button id="casino-save">

保存

</button>


`;


root.querySelector(
".casino-stage"
)
.appendChild(box);



box.querySelector("#casino-save")
.onclick=()=>{


settings.customName =
box.querySelector("#casino-name").value;


settings.customAvatar =
box.querySelector("#casino-avatar").value;


settings.apiUrl =
box.querySelector("#casino-api").value;


settings.apiKey =
box.querySelector("#casino-key").value;



context.saveSettingsDebounced();


box.remove();


};


}
}
