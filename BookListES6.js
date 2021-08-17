//The book class
class Book {
    constructor(title, author, ISBN) {
        this.title = title;
        this.author = author;
        this.ISBN = ISBN;
    }
}

//The UI Class
class UI {

    //Methods

    //add Book to List
    addBookToList(book) {

        //add to table book list
        const list = document.getElementById('book-list');

        //create a table row
        const row = document.createElement('tr');

        //insert colons into table with values of the book variable
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.ISBN}</td>
            <td><a href="#" class ="delete">X</a></td>
        `;

        list.appendChild(row);
    }

    //delete Book row from list
    deleteBook(target) {

        //check if target delete a-tag is clicked
        if(target.className === 'delete') {
            //get the parent of the parent (the row) and delete it
            target.parentElement.parentElement.remove();
        }
    }

    //show Message - error or success
    showAlert(message, className) {

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

    //clear the whole form
    clearFields() {
        //rest the whole form
        document.getElementById('book-form').reset();
    }
}

//Local storage Class
class localStore {

    //get the books from local storage if possible
    static getBooks() {
        //new var books for the local storage
        let books;
        //check if local storage is empty
        if(localStorage.getItem('books') === null) {
            //set books to empty array
            books = [];
        } else {
            //local storage can only save string - parse to string
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;

    }

    static displayBooks() {
        //get the book data via getBooks Method
        const books = localStore.getBooks();

        //loop through the existing books in local storage and create a list item for each
        books.forEach(function(book) {
            //use class UI with method addBookToList
            //intantiate class UI
            const ui = new UI;

            //Add book to UI
            ui.addBookToList(book);

        })

    }

    //add the book to local storage
    static addBooksToLS(book) {
        //get the book data via getBooks Method
        const books = localStore.getBooks();

        //Add new item to array task
        books.push(book);

        //set it to local storage
        localStorage.setItem('books', JSON.stringify(books));
    }

    //remove book from local storage
    //there is no unique identifier to call the item from the local store - here the ISBN is used 
    static removeBook(ISBN) {
        //get the book data via getBooks Method
        const books = localStore.getBooks();

        //loop through the books and find the right isbn
        books.forEach(function(book, index){
            //if isbn of the looped book is identical to the clicked book isbn, then delete it
            if(book.ISBN === ISBN) {
                //get the index of the book - delete 1 from the index
                books.splice(index, 1);
            }
        });

        //set it to local storage
        localStorage.setItem('books', JSON.stringify(books));

    }

}


//DOM Load Event
//when DOM is loaded, load items from local storage via method in class localStore
document.addEventListener('DOMContentLoaded', localStore.displayBooks());

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

    //validate that the fields are not emptry
    if(title === '' || author === '' || ISBN === '') {
        
        //error Message with error class
        ui.showAlert('Please fill in all fields', 'error')

        e.preventDefault();


    } else {

        //Add book to book-list via method
        ui.addBookToList(book);

        //Add book to local storage via class localStore method addBooksToLS
        localStore.addBooksToLS(book);

        //show success message
        ui.showAlert('Book added', 'success')

        //clear the fields after submitting
        ui.clearFields();

        e.preventDefault();

    }        

});


//Event listener for delete
//get the parent -> book-list
document.getElementById('book-list').addEventListener('click', function(e) {

    //Instantiate the UI
    const ui = new UI();

    //call deleteBook Function with target
    ui.deleteBook(e.target); 

    //remove book from local storage by isbn
    //get the isbn of the click target by previous sibling of the delete icon - the isbn colum text
    localStore.removeBook(e.target.parentElement.previousElementSibling.textContent);

    //Show delete message
    ui.showAlert('Book deleted', 'success');

    e.preventDefault();

})


