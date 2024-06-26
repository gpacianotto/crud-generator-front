export default class Configs{
    static instance;
    static getInstance(){
        if(Configs.instance)
        {
            return Configs.instance;
        }
        else {Configs.instance = new Configs();}
        return Configs.instance;
    }


    constructor() {
        this.serverURL = "http://localhost:3000";
    }

    getServerURL()
    {
        return localStorage.getItem('serverURL');
    }

    setServerURL(url)
    {
        localStorage.setItem('serverURL', url);
    }

    getRootSystemToken()
    {
        return localStorage.getItem('rootSystemToken');
    }

    setRootSystemToken(token)
    {
        localStorage.setItem('rootSystemToken', token);
    }

}