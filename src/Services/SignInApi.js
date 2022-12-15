import axios from "axios";
import Configs from "./Configs";

export default class SignInApi{
    
    static instance;

    static getInstance(){
        if(SignInApi.instance)
        {
            return SignInApi.instance;
        }
        else {SignInApi.instance = new SignInApi();}
        return SignInApi.instance;
    }

    constructor() {
        this.configs = Configs.getInstance();
        this.apiURL = this.configs.getServerURL();
    }

    async login(data) {
        const rootSystemToken = this.configs.getRootSystemToken();

        console.log("token: ",rootSystemToken);

        let response;

        await axios.post(this.apiURL + "/sign-in", data, {
            headers: {
                'Content-Type': 'application/json',
                'systemToken': rootSystemToken
            }
        }).then((res) => {
            response = {
                status: "success",
                response: res
            }
            
            
        }).catch((err) => {
            response = {
                status: "error",
                response: err
            }
        })

        return response;

    }

}