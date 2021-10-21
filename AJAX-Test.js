//new standard for fetching data is FETCH API instead of AJAX or XHR
document.querySelector('button').addEventListener('click', loadData);

function loadData() {
    //create a XHR Object - extenciate 
    const xhr = new XMLHttpRequest();

    //Open - typ of request and URL/Filename
    //type of request, filename, asychrones
    xhr.open('GET', 'AJAX-Test_Testtext.txt', true);

    //check the ready state of the request and the server response - just for demonstration
    console.log('Readystate', xhr.readyState);

    //when the request is processed - readyState: 3 - here just for demonstration
    xhr.onprogress = function() {
        //e.g. for a loader icon/ progress bar etc.
        console.log('Readystate', xhr.readyState);
    } 

    //load the data
    xhr.onload = function() {
        //check the ready state
        console.log('Readystate', xhr.readyState);
        //check the status property of the object 200: ok; 403: forbidden; 404: not found
        if (this.status === 200) {
            console.log(this.responseText);
            //display the text in output
            document.querySelector('.output').innerHTML = this.responseText;
        }

    }

    //if an error occurs - optional
    xhr.onerror = function() {
        console.log('request error');
    }

    //send the data
    xhr.send();

}

