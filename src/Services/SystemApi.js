import axios from "axios";
import Configs from "./Configs";

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
        }
    }

    getApiURL() {
        return Configs.getInstance().getServerURL();
    }

    async createRootSystem()
    {

        let response;
        await axios.post(this.getApiURL() + '/new-system', this.standardRootSystemData, {
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

}