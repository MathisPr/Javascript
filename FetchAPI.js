//standard method for dealing with http requests

document.querySelector(".button1").addEventListener('click', getText);
document.querySelector(".button2").addEventListener('click', getJSON);
document.querySelector(".button3").addEventListener('click', getAPI);

//get the data from a textfile
function getText() {
    //use fetch() with filename
    //use a ES6 PROMISE instead of an older callback 
    fetch("FetchAPI_Sample_txt.txt").then(function(response){
        //get the response text from the promise which is again a promise
        return response.text();
    }) //use no ; -> .then is still part of the fetch()
    //get the data from the promise by using .then
    .then(function (data){
        console.log(data);
        document.querySelector(".output").innerHTML = data;
    })
    //catch errors
    .catch(function (error){
        console.log(error);
    })
};

//get the data from a JSON file
function getJSON() {
    //use fetch()
    fetch("FetchAPI_Sample_JSON.json").then(function(response){
        //get the response (a promise) from the json file which is a promise itself 
        return response.json();
    })
    //get the data from the promise by using .then
    .then(function (data){

        //create var for the loop
        let output = '';
        
        //loop through the array
        data.forEach(function(post) {
            output +=  `
            <ul>
                <li>    Title:     ${post.title}         </li>
                <li>    Body:      ${post.body}       </li>
            </ul>`

        });

        document.querySelector(".output").innerHTML = output;

        console.log(data);
    })
};

//get data from external API
function getAPI(){
    //use fetch()
    fetch("https://api.github.com/users").then(function(response){
        //get the response (a promise) from the json file which is a promise itself 
        return response.json();
    })
    //get the data from the promise by using .then
    .then(function (data){

        //create var for the loop
        let output = '';
        
        //loop through the array
        data.forEach(function(user) {
            output +=  `
            <ul>
                <li>    Login-Name:     ${user.login}         </li>
                <li>    ID:      ${user.id}       </li>
            </ul>`

        });

        document.querySelector(".output").innerHTML = output;

        console.log(data);
    })
};



