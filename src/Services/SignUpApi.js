import axios from "axios";
import Configs from "./Configs";

export default class SignUpApi{
    
    static instance;

    static getInstance(){
        if(SignUpApi.instance)
        {
            return SignUpApi.instance;
        }
        else {SignUpApi.instance = new SignUpApi();}
        return SignUpApi.instance;
    }

    constructor() {
        this.apiURL = Configs.getInstance().getServerURL();
    }

    async newAccount(data) {
        const {email, password, systemToken, role} = data;
    
        let response;

        if(!!email && !!password && !!systemToken && !!role)
        {
            await axios.post((this.apiURL + "/sign-up"), data, {
                headers: {
                    'Content-Type': 'application/json',
                    'systemToken': systemToken
                }
            }).then((res) => {
                response = res;
            }).catch((err) => {
                response = err;
            });
        }
        else{
            return false;
        }
        
        return response;
    }
        

}

