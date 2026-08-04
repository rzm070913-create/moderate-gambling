export function createCasinoUI(){

const html = `

<div id="mg-casino-window">


<div id="casino">


<div class="top">


<div class="top-item">
<img src="https://i.postimg.cc/fRLzbqYc/IMG-7098.png">
</div>


<div class="top-item">
<img src="https://i.postimg.cc/g2Jz0t3q/IMG-7099.png">
</div>



<div class="top-item player-box">


<div class="player-name" id="mg-name">
PLAYER
</div>


<div class="avatar">

<img id="mg-avatar">

</div>


<div class="money">
🟡1000
</div>


</div>



<div class="top-item">
<img src="https://i.postimg.cc/3xR8wf2B/IMG-7100.png">
</div>



<div class="top-item">
<img src="https://i.postimg.cc/x1CfdpLP/IMG-7101.png">
</div>



</div>





<div class="game-stage">

游戏展示区域

</div>





<div class="bottom">


<div class="bottom-item">
<img src="https://i.postimg.cc/RZDMJ1Rc/IMG-7102.png">
</div>


<div class="bottom-item">
<img src="https://i.postimg.cc/ZqvJ8976/IMG-7103.png">
</div>


<div class="bottom-item">
<img src="https://i.postimg.cc/Dz47rWjY/IMG-7104.png">
</div>


<div class="bottom-item">
<img src="https://i.postimg.cc/DZVnB2Hp/IMG-7105.png">
</div>


</div>



</div>


</div>
`;



$("body").append(html);



let avatar=$("#user_avatar").attr("src");


if(avatar){

$("#mg-avatar").attr("src",avatar);

}



let username=
$("#user_name").text();


if(username){

$("#mg-name").text(username);

}



}
