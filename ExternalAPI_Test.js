document.querySelector('.get-jokes').addEventListener('click', getJokes);

function getJokes(e) {
    //get the number out of the inputfield
    const number = document.querySelector('#number').value;

    //extenciate the object
    const xhr = new XMLHttpRequest();

    //open the API Data via URL and the typed in number
    xhr.open('GET', `http://api.icndb.com/jokes/random/${number}`, true);

    //load the file and store it into a variable; check if file is found
    xhr.onload = function() {
        if(this.status === 200) {
            //store the data into a variable; parse the JSOn into an JS object
            const response = JSON.parse(this.responseText);

            //create an empty temp variable for the output in the DOM
            let output = '';

            //check if the datatype is correct, in this example it is called "success"
            if(response.type === 'success') {

                //loop through the JSON array data; the data from the API is an object, therefore we need to loop trough the value of the object; the name in the () of the function can named freely
                response.value.forEach(function(jokedata) {

                    //store the data from the customer variable in a newvariable in HTML format
                    //append the data in each loop to the already stored data in the variable
                    output += `
                                <li>    Joke:      ${jokedata.joke}       </li>
                    `
                    
                });
            }
            //error message
            else {
                output += '<li>An Error occured</li>'
            }
            ;            


            //output the variable output in the DOM
            document.querySelector('.jokes').innerHTML = output;

        }
        
    }


    xhr.send();

    console.log(number);

    e.preventDefault();

}