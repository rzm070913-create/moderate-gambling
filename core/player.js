export const playerData = {


    name:"",

    chips:10000,

    avatar:"",


};


export function loadPlayer(){


const save =
localStorage.getItem(
"silly_casino_player"
);


if(save){

Object.assign(
playerData,
JSON.parse(save)
);

}


}



export function savePlayer(){


localStorage.setItem(

"silly_casino_player",

JSON.stringify(playerData)

);


}



export function addChips(num){


playerData.chips += num;


savePlayer();


}



export function spendChips(num){


if(playerData.chips < num){

return false;

}


playerData.chips -= num;


savePlayer();


return true;


}
