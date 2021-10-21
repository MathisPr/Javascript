//extenciate the class GitHub
const github = new GitHub;

//extenciate the class UI
const ui = new UI;


//search input
const searchUser = document.getElementById('searchUser');

//search input event listener
searchUser.addEventListener('keyup', (e) => {
    //get input text
    const userText = e.target.value;

    //check if text is blank
    if(userText !== '') {
        
        //Make http call from the github class - returns a promise
        github.getUser(userText)
        .then(data => {

            console.log('getUser');
        
            if(data.profile.message === 'Not Found') {
                console.log("User not found!");
                //show alert; message, class
                ui.showAlert('No User found', 'alert alert-danger');
            }
            else {
                console.log("User found!");
                //show profile
                ui.showProfile(data.profile);
                //show repos
                ui.showRepos(data.repos);
            }

        })

    } else {
        //clear the Profile if no profile found
        ui.clearProfile();
    };
});

