export default class UserDataService{
    static instance;
    static getInstance(){
        if(UserDataService.instance)
        {
            return UserDataService.instance;
        }
        else {UserDataService.instance = new UserDataService();}
        return UserDataService.instance;
    }

    constructor() {

    }


    saveUser(user)
    {
        const userStringfied = JSON.stringify(user);

        localStorage.setItem('user', userStringfied);

        return;
    }

    loadUser()
    {
        return JSON.parse(localStorage.getItem('user'));
    }
}