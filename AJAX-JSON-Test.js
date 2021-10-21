document.querySelector('.button1').addEventListener('click', loadCustomer);

document.querySelector('.button2').addEventListener('click', loadCustomers);

//load data from the JSON file Customer
function loadCustomer(e) {

    //extenciate the object
    const xhr = new XMLHttpRequest();

    //open the file
    xhr.open('GET', 'AJAX-JSON-Test_Testfile_Customer.json', true);

    //load the file and store it into a variable; check if file is found
    xhr.onload = function() {
        if(this.status === 200) {

             //create a JS object out of the JSON data via parse; without it, the JSON Data will just be a string
             //responseText is a property
             const customer = JSON.parse(this.responseText);

            //store the data from the customer variable in a newvariable in HTML format
            const output = `
                <ul>
                    <li>    ID:        ${customer.id}         </li>
                    <li>    Name:      ${customer.name}       </li>
                    <li>    Company:   ${customer.company}    </li>
                    <li>    Phone:     ${customer.phone}       </li>
                </ul>
            `

            document.querySelector('.customer').innerHTML = output;

        }
    }

    //send the data
    xhr.send();

}



//load data from the JSON file Cutomers
function loadCustomers(e) {

    //extenciate the object
    const xhr = new XMLHttpRequest();

    //open the file
    xhr.open('GET', 'AJAX-JSON-Test_Testfile_Customers.json', true);

    //load the file and store it into a variable; check if file is found
    xhr.onload = function() {
        if(this.status === 200) {
            
            //create a JS object out of the JSON data via parse; without it, the JSON Data will just be a string
            const customers = JSON.parse(this.responseText);

            //create an empty temp variable for the loop
            let output = '';

            //loop through the JSON array data; the name in the () of the function can named freely
            customers.forEach(function(customerdata) {
                
                //store the data from the customer variable in a newvariable in HTML format
                //append the data in each loop to the already stored data in the variable
                output += `
                    <ul>
                        <li>    ID:        ${customerdata.id}         </li>
                        <li>    Name:      ${customerdata.name}       </li>
                        <li>    Company:   ${customerdata.company}    </li>
                        <li>    Phone:     ${customerdata.phone}       </li>
                    </ul>
                `

            });
            
        //output the variable output in the DOM
        document.querySelector('.customers').innerHTML = output;

        }
    }

    //send the data
    xhr.send();

}