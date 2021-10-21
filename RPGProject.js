//Hero Class
/* class Hero {
    constructor(Name, Class, HP) {
        this.Name = name;
        this.Class = class;
        this.HP = hp;
    }
} */


document.querySelector(".receiveDamage").addEventListener("click", receiveDamage);

document.querySelector(".getStatsFromJson").addEventListener("click", getStatsFromJson);

document.querySelector(".getStatsFromAPI").addEventListener("click", getStatsFromAPI);

//Get variables
const f_currentHP         = document.querySelector(".f_currentHP");
const f_receiveDamage     = document.querySelector(".f_receiveDamage");
let f_NewHP             = document.querySelector(".f_NewHP");


function getStatsFromJson(e) {
    console.log("Test");

    const xhr = new XMLHttpRequest();

    xhr.open('GET', 'RPGProject_Stats.json', true);

    xhr.onload = function() {
        if(this.status === 200) {

            console.log(this.responseText);

            const hero = JSON.parse(this.responseText);

            const output = `
                <ul>
                    <li> Name: ${hero.Name} </li>
                    <li> Class: ${hero.Class} </li>
                    <li> HP: ${hero.HP} </li>
                </ul>

            `
            //Output Stats
            document.querySelector(".stats").innerHTML = output;

            //Set current HP
            f_currentHP.value = hero.HP;

        }

    }

    xhr.send();

}

function getStatsFromAPI(e) {
    
    console.log("Get Stats from API");

    const monsterStatsAPI =  fetch("https://www.dnd5eapi.co/api/spells/acid-arrow");
   
    //get the stats json Data from the fetch
    const monsterStats =  monsterStatsAPI.json;

    console.log(monsterStatsAPI);
    
}


function receiveDamage(e) {
    
    //get values and calculate new HPs
    currentHPValue = f_currentHP.value;
    receiveDamageValue = f_receiveDamage.value;
    newHP = currentHPValue - receiveDamageValue;
    
    console.log(newHP);

    f_NewHP.value = newHP;

    //how to write the new value into the json file?
    //hero.push({"New HP": 4});

     //xhr.JSON.stringify({ HP: 5 })

    

}



