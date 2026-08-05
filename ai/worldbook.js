export function analyzeWorldbook(text){

    if(!text)
    return {};


    return {


        rich:
        text.includes("富") ||
        text.includes("有钱"),


        gambler:
        text.includes("赌博") ||
        text.includes("赌"),


        risk:
        text.includes("疯狂") ||
        text.includes("冲动")
        ?
        80
        :
        30

    };


}

