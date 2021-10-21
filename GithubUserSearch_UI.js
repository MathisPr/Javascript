class UI {
    constructor() {
        this.profile = document.getElementById('profile');
    }

    //display profile in UI Method
    showProfile(user) {
        this.profile.innerHTML = `
            <div class = "card card-body mb-3">
                <div class ="row">
                    <div class="col-mb-3">
                        <img src="${user.avatar_url}" class="img-fluid mb-2">
                        <a href="${user.html_url}" target="_blank" class="btn btn-primary btn-block mb-4">View Profile</a>
                    </div>
                    <div class="col-mb-9">
                        <span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
                        <span class="badge badge-secondary">Public Gists: ${user.public_gists}</span>
                        <span class="badge badge-success">Followers: ${user.followers}</span>
                        <span class="badge badge-info">Following: ${user.following}</span>
                        <br>
                        <br>
                        <ul class="list-group">
                            <li class="list-group-item">Company: ${user.company}</li>
                            <li class="list-group-item">Website/Blog: ${user.blog}</li>
                            <li class="list-group-item">Location: ${user.location}</li>
                            <li class="list-group-item">Member Since: ${user.created_at}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <h3 class="page-heading mb-3">Latest Repos</h3>
            <div id="repos"></div>
        `
    }

    //display the repos of the user
    showRepos(repos) {
        //the repos data is an array, therefore an output variable is used
        let output = '';

        console.log('Test2');

        //output repos - not working/ Error: 
        /*GithubUserSearch_UI.js:45 Uncaught (in promise) TypeError: repos.forEach is not a function
        at UI.showRepos (GithubUserSearch_UI.js:45)
        at GithubUserSearch.js:35
        showRepos @ GithubUserSearch_UI.js:45
        (anonymous) @ GithubUserSearch.js:35
        Promise.then (async)
        (anonymous) @ GithubUserSearch.js:21*/
        //why? maybe: "you can't iterate over an object with forEach. forEach is an array method."
        /*
        repos.forEach(repo => {
            //append to the output var - put each repo into a card
            output += `
                <div class="card card-body mb-2>
                    <div class="row col-md-6">
                        <a hred="${repo.html_url}" target="_blank">${repo.name}</a>
                </div>
                <div class="row col-md-6">
                    <span class="badge badge-primary">Stars: ${repo.stargazers_count}</span>
                    <span class="badge badge-secondary">Watcher: ${repo.watchers_count}</span>
                    <span class="badge badge-success">Forks: ${repo.forms_count}</span>
                </div>         
            `;
        });
        */

        //output repos
        document.getElementById('repos').innerHTML = output;

        //Error display 
        document.getElementById('repos').innerHTML = "Display of repos is not working";

    }

    //show Alert message - removed, instead of the profile the alert message is displayed - see showAlert()
/*     showAlert(message, className) {
        console.log('Alert!');
        //create div
        const div = document.createElement('div');
        //Add classname from parameters
        div.className = className;
        //add a Textnode with the message text
        div.appendChild(document.createTextNode(message));
        //get the parent searchContainer div
        const container = document.querySelector('.searchContainer');
        //get search Box for the positiong of the alert message
        const search = document.querySelector('.search');
        //Insert alert before the search box
        container.insertBefore(div, search);

    } */

    //show the alert message instead of a profile
    showAlert(message, className) {
        this.profile.innerHTML = `<div class="${className}">${message}</div>`;
        setTimeout(() => {
          this.clearAlert();
        }, 2000);
      } 

    //clear the alert message
    clearAlert() {
        this.profile.innerHTML = "";
      }

    //clear the Profile if no profile found
    clearProfile() {
        this.profile.innerHTML = ``;
    }

}