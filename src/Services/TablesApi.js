import axios from "axios";
import Configs from "./Configs";
import UserDataService from "./UserDataService";

export default class TablesApi {
    static instance;
    static getInstance(){
        if(TablesApi.instance)
        {
            return TablesApi.instance;
        }
        else {TablesApi.instance = new TablesApi();}
        return TablesApi.instance;
    }


    constructor() {
        this.config = Configs.getInstance();
        this.userDataService = UserDataService.getInstance();
    }

    getApiURL() {
        return Configs.getInstance().getServerURL();
    }

    async createTable(data) {
        let response;

        await axios.post(this.getApiURL() + '/table/new', data, {
            headers: {
                "Content-Type" : "application/json",
                "systemtoken": this.config.getRootSystemToken(),
                "token": this.userDataService.getUserToken()
            }
        }).then(res => {
            response = res;
        }).catch(err => {
            response = err;
        })

        return response;
    }

    async listTables(page) {
        let response;

        await axios.get(this.getApiURL() + '/table/list?page=' + page, {
            headers: {
                "Content-Type" : "application/json",
                "systemToken": this.config.getRootSystemToken(),
                "token": this.userDataService.getUserToken()
            }
        }).then((res) => {
            console.log("raw: ", res);
            response = res?.data;
        }).catch((err) => {
            response = err
        });

        return response;
    }

    async deleteTables(id)
    {
        let response;

        await axios.delete(this.getApiURL() + '/table/delete/' + id, {
            headers: {
                "systemToken": this.config.getRootSystemToken(),
                "token": this.userDataService.getUserToken()
            }
        }).then((res) => {
            console.log("raw: ", res);
            response = res?.data;
        }).catch((err) => {
            response = err
        });

        return response;
    }


}