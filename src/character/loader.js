export function getCurrentCharacter(){

    const context =
    SillyTavern.getContext();


    return {

        name:
        context.name || "未知角色",


        description:
        context.description || "",

    };

}
