const games = {};


export function registerGame(
    id,
    loader
){

    games[id]=loader;

}



export async function launchGame(
    id,
    root
){

    if(!games[id]){
        console.error(
            "Game not found:",
            id
        );
        return;
    }


    const game =
    await games[id]();


    game.open(root);

}
