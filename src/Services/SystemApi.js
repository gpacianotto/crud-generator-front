import axios from "axios";
import Configs from "./Configs";
import UserDataService from "./UserDataService";

export default class SystemApi {
    static instance;
    static getInstance(){
        if(SystemApi.instance)
        {
            return SystemApi.instance;
        }
        else {SystemApi.instance = new SystemApi();}
        return SystemApi.instance;
    }

    constructor() {
        this.standardRootSystemData = {
            "name": "root",
            "urlFront": "http://localhost:3001",
            "framework": "React.js",
            "lang": "javascript"
        };
        this.config = Configs.getInstance();
        this.userDataService = UserDataService.getInstance();
    }

    getApiURL() {
        return Configs.getInstance().getServerURL();
    }

    async createRootSystem()
    {

        let response;
        await axios.post(this.getApiURL() + '/systems/new', this.standardRootSystemData, {
            headers: {
                "Content-Type" : "application/json"
            }
        }).then((res) => {
            response = res.data;
        }).catch((err) => {
            response = err;
        })

        return response;

    }

    async createSystem(data) {
        let response;

        await axios.post(this.getApiURL() + '/systems/new', data, {
            headers: {
                "Content-Type" : "application/json",
                "systemToken": this.config.getRootSystemToken(),
                "token": this.userDataService.getUserToken()
            }
        }).then((res) => {
            response = res;
        }).catch((err) => {
            response = err;
        })
        return response;
    }

}