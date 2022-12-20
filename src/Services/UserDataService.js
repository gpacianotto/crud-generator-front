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

    getUserToken()
    {
        return this.loadUser().session.token;
    }

    clearUser()
    {
        localStorage.removeItem('user');
    }

    isSessionExpired() {

        const info = this.loadUser();

        if(!info)
        {
            return true;
        }

        const session = info?.session;
        
        const expiresIn = session?.expiresIn;

        console.log(expiresIn);
      
        const expiresDate = new Date(expiresIn);
        const now = new Date();
      
        if(expiresDate <= now)
        {
          return true;
        }
      
        return false;
      
    }
}