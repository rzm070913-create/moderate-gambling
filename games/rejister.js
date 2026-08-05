import {
registerGame
}
from "./game-manager.js";


registerGame(
"slot",
()=>import(
"./slot/slot5.js"
)
);

registerGame(
"texas",
()=>import(
"./poker/texas.js"
)
);
