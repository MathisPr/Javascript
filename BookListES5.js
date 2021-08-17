// Book constructor
function Book(title, author, ISBN) {
    this.title = title;
    this.author = author;
    this.ISBN = ISBN;
}


//UI constructor
function UI() {
    //empty - see prototype
}

//prototype add book to booklist in table
UI.prototype.addBookToList = function(book) {

    //add to table book list
    const list = document.getElementById('book-list');

    //create a table row
    const row = document.createElement('tr');

    //insert colons into table with values of the bool variable
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.ISBN}</td>
        <td><a href="#" class ="delete">X</a></td>
    `;

    list.appendChild(row);
}

//show alert message - error or success
UI.prototype.showAlert = function(message, className) {

    //create div
    const div = document.createElement('div');
    //Add class to div
    div.className = `alert ${className}`;
    //Add text from message variable
    div.appendChild(document.createTextNode(message));
    
    //insert it into the DOM
    //get parent
    const container = document.querySelector('.container');
    //get the form to put the message bevor the form
    const form = document.querySelector('#book-form');
    //insert the container in the div before the form
    container.insertBefore(div, form);

    //timeout after the seconds
    setTimeout(function(){
        document.querySelector('.alert').remove();
        },  
        3000)
}

//delete book prototype
UI.prototype.deleteBook = function(target) {
    //check if target delete a-tag is clicked
    if(target.className === 'delete') {
        //get the parent of the parent (the row) and delete it
        target.parentElement.parentElement.remove();
    }
}


//clear the fields after submitting
UI.prototype.clearFields = function() {
    //rest the whole form
    document.getElementById('book-form').reset();
}


//Event listeners for book adding
document.getElementById('book-form').addEventListener('submit', function(e) {
    
    //get the form field values
    const title     = document.getElementById('UItitle').value;
    const author    = document.getElementById('UIauthor').value;
    const ISBN      = document.getElementById('UIISBN').value;

    //Instantiate new Book based on field values
    const book = new Book(title, author, ISBN);

    //Instantiate new UI Object
    const ui = new UI();

    //validate the fields are not emptry
    if(title === '' || author === '' || ISBN === '') {
        
        //error Message with error class
        ui.showAlert('Please fill in all fields', 'error')

    } else {

            //Add book to book-list via prototype
            ui.addBookToList(book);
        
            //show success message
            ui.showAlert('Book added', 'success')

            //clear the fields after submitting
            ui.clearFields();

    }        
    
    e.preventDefault();

});


//Event listener for delete
//get the parent -> book-list
document.getElementById('book-list').addEventListener('click', function(e) {

    //Instantiate the UI
    const ui = new UI();

    //call deleteBook Function with target
    ui.deleteBook(e.target); 

    //Show delete message
    ui.showAlert('Book deleted', 'success');

    e.preventDefault();

})

