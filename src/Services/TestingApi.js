import axios from "axios";
import Configs from "./Configs";

export default class TestingApi {
    static instance;
    static getInstance(){
        if(TestingApi.instance)
        {
            return TestingApi.instance;
        }
        else {TestingApi.instance = new TestingApi();}
        return TestingApi.instance;
    }

    getApiURL()
    {
        const URL = Configs.getInstance().getServerURL();

        return URL;
    }


    async isApiOn()
    {
        let response;
        await axios.get(this.getApiURL() + "/test-api").then((res) => {
            const state = res?.data?.state;

            if(!!state && state === 'everything ok')
            {
                response = true;
            }
            else{
                response = false;
            }
        }).catch(() => {
            response = false
        })

        return response;
    }

    async doesRootSystemExists() {
        let response;

        await axios.get(this.getApiURL() + "/root-system-exists").then((res) => {
            const answer = res?.data?.doesRootExists;

            if(answer === true || answer === false)
            {
                response = answer;
            }
            else{
                response = null;
            }
            
        }).catch((err) => {
            response = null;
        })

        return response;
    }


}