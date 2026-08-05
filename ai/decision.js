export function aiAction(
profile,
gameState
){


const risk=profile.aggression;


if(gameState.handPower>80){

return "raise";

}


if(gameState.handPower<30){

return "fold";

}


return risk>60
?
"raise"
:
"call";


}

