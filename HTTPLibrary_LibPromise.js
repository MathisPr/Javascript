class easyHTTP  {


    //http GET request with PROMISE
    //wrap the fetch into a promise
    get(url) {
        return new Promise ( (resolve, reject) => {
            fetch(url)
                .then(response => response.json())
                //get the data
                .then(data => resolve(data))
                //put out an error if it occurs
                .catch(error => reject(error))    
        })
    }

    //http GET request with AWAIT
    async get_await(url) {
        //get the response json
        const response = await fetch(url);
        //put the response into a variable
        const response_data = await response.json();
        //return the variable
        return response_data;
    } 

    //http POST request with PROMISE
    //wrap the fetch into a promise
    post(url, data) {
        return new Promise ( (resolve, reject) => {
            //add the data (here an object) to be posted as JSON
            fetch(url, {
                method: 'POST',
                headers: { 'Content-type' : 'application/json' },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(data => resolve(data))
                .catch(error => reject(error))    
        });
    }

    //http POST request with AWAIT
    async post_await(url, data) {
        const response = await fetch(url, {                
            method: 'POST',
            headers: { 'Content-type' : 'application/json' },
            body: JSON.stringify(data)
        })
        const response_data = await response.json();
        return response_data;
    }

    //http PUT request with PROMISE
    //wrap the fetch into a promise
    put(url, data) {
        return new Promise ( (resolve, reject) => {
            //add the data (here an object) to be posted as JSON
            fetch(url, {
                method: 'PUT',
                headers: { 'Content-type' : 'application/json' },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(data => resolve(data))
                .catch(error => reject(error))    
        })
    }

    //http PUT request with AWAIT
    //wrap the fetch into a promise
    async put_await(url, data) {
        const response = await 
            //add the data (here an object) to be posted as JSON
            fetch(url, {
                method: 'PUT',
                headers: { 'Content-type' : 'application/json' },
                body: JSON.stringify(data)
            })
        const response_data = await response.json();
        return response_data;   
    }
    
    //http DELETE request with PROMISE
    delete(url) {
        return new Promise ( (resolve, reject) => {
            //add the data (here an object) to be posted as JSON
            fetch(url, {
                method: 'DELETE',
                headers: { 'Content-type' : 'application/json' }
            })
                .then(response => response.json())
                //confirm the delete
                .then(data => resolve('Resource deleted'))
                .catch(error => reject(error))    
        })
    }

    //http DELETE request with AWAIT
    async delete_await(url) {
        //add the data (here an object) to be posted as JSON
        const response = await fetch(url, {
            method: 'DELETE',
            headers: { 'Content-type' : 'application/json' }
        })
        const response_data = await 'Resource deleted';
        return response_data;
    }
}


/* 
//old version ES5

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
}  */

