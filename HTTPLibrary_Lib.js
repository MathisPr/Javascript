//create the constructor
function easyHTTP(){
    this.http = new XMLHttpRequest();
}

//library with methods

//Make a http GET request with a callback
easyHTTP.prototype.get = function(url, callback) {
    //open the resource, async
    this.http.open('GET', url, true);

    //create a variable for the this; this inside a function is only working in the function 
    let self = this;

    //load the data
    this.http.onload = function() {
        if(self.http.status === 200) {
            //frist parameter (null) for an error, second for the data 
            callback(null, self.http.responseText);    
        }
        else {
            //error message if the status is not 200, with the status 
            callback('Error: ' + self.http.status)
        }
    }

    //Sends the request to the server
    this.http.send();
} 

//Make a http POST request
//first parameter url, second the post data, third the callback
easyHTTP.prototype.post = function(url, data, callback) {
    //open the resource, async
    this.http.open('POST', url, true);

    //set the content-type to application/json
    this.http.setRequestHeader('Content-type', 'application/json');

    //create a variable for the this; this inside a function is only working in the function 
    let self = this;

    //load the data
    this.http.onload = function() {
        //post the data; no status check nessecary, the data is posted after all
        callback(null, self.http.responseText);    
    }

    //Sends the request to the server, include the data to be send, needs to be a string 
    this.http.send(JSON.stringify(data));

}


//Make a http PUT request
//nearly identical with POST
//first parameter url, second the post data, third the callback
easyHTTP.prototype.put = function(url, data, callback) {
    //open the resource, async
    this.http.open('PUT', url, true);

    //set the content-type to application/json
    this.http.setRequestHeader('Content-type', 'application/json');

    //create a variable for the this; this inside a function is only working in the function 
    let self = this;

    //load the data
    this.http.onload = function() {
        //post the data; no status check nessecary, the data is posted after all
        callback(null, self.http.responseText);    
    }

    //Sends the request to the server, include the data to be send, needs to be a string 
    this.http.send(JSON.stringify(data));

}


//Make a http DELETE request
easyHTTP.prototype.delete = function(url, callback) {
    //open the resource, async
    this.http.open('DELETE', url, true);

    //create a variable for the this; this inside a function is only working in the function 
    let self = this;

    //load the data
    this.http.onload = function() {
        if(self.http.status === 200) {
            //frist parameter (null) for an error, second for the data, which is NULL in this case, returns a message 
            callback(null, "Post deleted");    
        }
        else {
            //error message if the status is not 200, with the status 
            callback('Error: ' + self.http.status)
        }
    }

    //Sends the request to the server
    this.http.send();
} 

