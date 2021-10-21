//extanciate easyHTTP
const http = new easyHTTP;

//GET posts 
    //with url and a callback, without the callback the data is send, before it is loaded from the server; 
    //the name for the callback is irrelevant, first parameter is for an error message
    /* http.get('https://jsonplaceholder.typicode.com/posts', function (err, posts) {
        //if an error occurs
        if(err) {
            console.log(err);
        }
        //if no error occurs, display the data
        else {
            console.log(posts);
        }
    }); */

    //GET single post 
    //with url and a callback, without the callback the data is send, before it is loaded from the server; 
    //the name for the callback is irrelevant, first parameter is for an error message
/*     http.get('https://jsonplaceholder.typicode.com/posts/1', function (err, post) {
        //if an error occurs
        if(err) {
            console.log(err);
        }
        //if no error occurs, display the data
        else {
            console.log(post);
        }
    }); */

//POST request

    //create data object to post
    //userID is automatically added by the server
    const data = {
        title: "lorem ipsum",
        body: "body lorem ipsum"
    };

    //create post, frist parameter is the url, second the data, third the callback with error an post
/*     http.post('https://jsonplaceholder.typicode.com/posts', data, function(err, post) {
        //if an error occurs
        if(err) {
            console.log(err);
        }
        //if no error occurs, display the data
        else {
            console.log(post);
        }

    }) */

    //Update POST with PUT
    //Update post id 1
/*     http.put('https://jsonplaceholder.typicode.com/posts/1', data, function(err, post) {
    if(err) {
        console.log(err);
    }
    else {
        console.log(post);
    }

    }); */

    //DELETE single post 
    //with url and a callback, without the callback the data is send, before it is loaded from the server; 
    //the name for the callback is irrelevant, first parameter is for an error message
    http.delete('https://jsonplaceholder.typicode.com/posts/1', function (err, response) {
        //if an error occurs
        if(err) {
            console.log(err);
        }
        //if no error occurs, display the data
        else {
            console.log(response);
        }
    });

