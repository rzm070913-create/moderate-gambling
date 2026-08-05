export const SLOT_SYMBOLS = {

    peach:{
        name:"桃子",
        css:"peach",
        weight:2
    },

    cat:{
        name:"猫",
        css:"cat",
        weight:10
    },

    dog:{
        name:"狗",
        css:"dog",
        weight:12
    },

    fish:{
        name:"鱼",
        css:"fish",
        weight:14
    },

    bird:{
        name:"鸟",
        css:"bird",
        weight:14
    },

    mouse:{
        name:"鼠",
        css:"mouse",
        weight:16
    },

    rabbit:{
        name:"兔",
        css:"rabbit",
        weight:16
    },

    panda:{
        name:"熊猫",
        css:"panda",
        weight:8
    },

    fox:{
        name:"狐狸",
        css:"fox",
        weight:8
    },

    star:{
        name:"星星",
        css:"star",
        weight:4
    }

};


export function randomSymbol(){

    const list=[];

    Object.values(SLOT_SYMBOLS)
    .forEach(item=>{

        for(let i=0;i<item.weight;i++)
            list.push(item);

    });


    return list[
        Math.floor(Math.random()*list.length)
    ];

}
