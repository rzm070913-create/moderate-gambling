export function getCharacters(){

    const context = SillyTavern.getContext();

    return context.characters || [];

}


export function getCharacterList(){

    const chars=getCharacters();


    return chars.map((char,index)=>({

        id:index,

        name:char.name,

        avatar:char.avatar,

        description:
        char.description || ""


    }));

}

