//listen for submit

document.getElementById('loan-form').addEventListener('submit', calculateResults);


//calcualte Results
function calculateResults(e) {
    
    //UI Vars
    const UIamount          = document.getElementById('amount');
    const UIinterest        = document.getElementById('interest')
    const UIyears           = document.getElementById('years');
    const UImontlypayment   = document.getElementById('monthly-payment');
    const UItotalpayment    = document.getElementById('total-payment');
    const UItotalinterest   = document.getElementById('total-interest');

    //calculate variables
    const principal         = parseFloat(UIamount.value);
    const calinterest       = parseFloat(UIinterest.value)/100/12;
    const calpayments       = parseFloat(UIyears.value)*12;

    //compute monthly payments
    const x = Math.pow(1 + calinterest, calpayments);
    const monthlypayment = (principal*x*calinterest)/(x-1);

    //check if monthlypayment is a finite number
    if(isFinite(monthlypayment)) {
        //show only 2 dicimals via toFixed
        UImontlypayment.value = monthlypayment.toFixed(2);
        UItotalpayment.value  = (monthlypayment * calpayments).toFixed(2);
        UItotalinterest.value = ((monthlypayment * calpayments)-principal).toFixed(2);
    } else {
        showError('Please check your numbers');
    }

    e.preventDefault();

};

//show Error message
function showError(error) {

    //create a div
    const errorDiv = document.createElement('div');
    
    //get Elements for insertion of the Error-Message into the DOM
    const card      = document.querySelector('.card');
    const heading   = document.querySelector('.heading');

    //Add class for Error
    errorDiv.className = 'alert alert-danger';

    //create Textnode with the value in 'error' i.e. showError and append to div
    errorDiv.appendChild(document.createTextNode(error));

    //insert Error-Message above heading
    card.insertBefore(errorDiv, heading);

    //calls function clearErrorMessage after 3 Seconds
    setTimeout(clearErrorMessage, 3000);

}


function clearErrorMessage() {
    //removes the Errormessage via classname
    document.querySelector('.alert').remove();
}





