//Fetch API with arrow functions
//standard method for dealing with http requests

document.querySelector(".button1").addEventListener('click', getText);
document.querySelector(".button2").addEventListener('click', getJSON);
document.querySelector(".button3").addEventListener('click', getAPI);

//get the data from a textfile with arrow functions
function getText() {
    //use fetch() with filename
    //use a ES6 PROMISE instead of an older callback and arrow function
    fetch("FetchAPI_Sample_txt.txt")
    
    .then(response => response.text())  //use no ; -> .then is still part of the fetch()
    
    //get the data from the promise by using .then
    .then(data => {
        //put the data into output element
        document.querySelector(".output").innerHTML = data;
    })
    //catch errors
    .catch(error => console.log(error));
};

//get the data from a JSON file  with arrow functions
function getJSON() {
    //use fetch()
    fetch("FetchAPI_Sample_JSON.json").then(response => response.json())
    
    //get the data from the promise by using .then
    .then(data => {

        //create var for the loop
        let output = '';
        
        //loop through the array
        data.forEach(post => {
            output +=  `
            <ul>
                <li>    Title:     ${post.title}         </li>
                <li>    Body:      ${post.body}       </li>
            </ul>`

        })
        
        //put the data into output element
        document.querySelector(".output").innerHTML = output;
    })

    //catch error
    .catch(error => console.log(error));

};

//get data from external API
function getAPI(){
    //use fetch()
    fetch("https://api.github.com/users")
    
    //get the data from the file
    .then(response => response.json())
    
    //get the data from the promise by using .then
    .then(data => {

        //create var for the loop
        let output = '';
        
        //loop through the array
        data.forEach(user => {
            output +=  `
            <ul>
                <li>    Login-Name:     ${user.login}         </li>
                <li>    ID:      ${user.id}       </li>
            </ul>`

        });

        //put the data into output element
        document.querySelector(".output").innerHTML = output;

    })

    //catch error
    .catch(error => console.log(error));

};



