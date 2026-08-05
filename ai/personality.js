export function createGamblerProfile(world){


return {


aggression:
world.risk || 30,


bluff:
world.gambler ? 70 : 20,


fold:
world.rich ? 20 : 50



};


}

