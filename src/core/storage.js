const STORAGE_KEY = "MG_CASINO_DATA";


export function loadData(){

    let data =
        localStorage.getItem(STORAGE_KEY);


    if(data){

        return JSON.parse(data);

    }


    return {

        coins:100,

        games:0,

        wins:0,

        achievements:[]

    };

}



export function saveData(data){

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
    );

}
