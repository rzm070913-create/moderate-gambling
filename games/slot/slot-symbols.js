export const symbols=[

{
id:"peach",
name:"桃子",
rate:1000,
weight:2
},

{
id:"cat",
name:"猫",
rate:200,
weight:10
},

{
id:"dog",
name:"狗",
rate:150,
weight:12
},

{
id:"mouse",
name:"鼠",
rate:60,
weight:16
},

{
id:"rabbit",
name:"兔",
rate:55,
weight:16
},

{
id:"panda",
name:"熊猫",
rate:80,
weight:8
},

];



export function randomSymbol(){

let pool=[];


symbols.forEach(
s=>{

for(
let i=0;
i<s.weight;
i++
)
pool.push(s);

});


return pool[
Math.floor(
Math.random()*pool.length
)
];

}
