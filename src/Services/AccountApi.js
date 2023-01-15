import axios from "axios";
import Configs from "./Configs";
import UserDataService from "./UserDataService";

export default class AccountApi {


    static instance;
    static getInstance(){
        if(AccountApi.instance)
        {
            return AccountApi.instance;
        }
        else {AccountApi.instance = new AccountApi();}
        return AccountApi.instance;
    }

    constructor() {
        this.config = Configs.getInstance();
        this.userDataService = UserDataService.getInstance();
    }

    getApiURL() {
        return this.config.getServerURL();
    }

    async listAccounts(page) {
        let response;

        await axios.get(this.getApiURL() + '/accounts/list?page=' + page, {
            headers: {
                "Content-Type" : "application/json",
                "systemToken": this.config.getRootSystemToken(),
                "token": this.userDataService.getUserToken()
            }
        }).then((res) => {
            response = res?.data?.response?.rows;
        }).catch((err) => {
            response = err;
        })

        console.log(response);
        return response;
    }
}