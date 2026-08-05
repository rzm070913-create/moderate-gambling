export function createCasinoUI(){

    const root=document.createElement("div");

    root.id="silly-casino-root";

    document.body.appendChild(root);


    return {
        root
    };

}
