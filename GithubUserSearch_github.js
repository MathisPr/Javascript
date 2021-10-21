class GitHub {
    constructor() {
        this.client_id = 'aab4884196a6cf1d5a2f';
        this.client_secret ='3da73336834f13e1147572f5063d4d2f4cbe34e9';
        //properties for repos
        //display only number of repositories per page
        this.repos_count = 5;
        //sort the repos by creation date
        this.repos_sort =  'created: asc';
    }

    //get the users from Github
    async getUser(user) {
        //get the user profile with client id and client secret from GitHub; 5 per page, sorted by creation date
        const profileResponse = await fetch(`https://api.github.com/users/${user} 
        ?client_id=${this.client_id}
        &client_Secret=${this.client_secret}
        `)

        //get the repos of the search user with client id and client secret from Gitbub
        const repoResponse = await fetch(`https://api.github.com/users/${user}/repos
        ?per_page=${this.repos_count}
        &sort=${this.repos_sort} 
        &client_id=${this.client_id}
        &client_secret=${this.client_secret}
        `)
       
        //get the profile json Data from the fetch
        const profile = await profileResponse.json();

        //get the repos json Data from the fetch
        const repos = await repoResponse.json();

        //return an object
        return {
            profile,
            repos
        }
    }

};