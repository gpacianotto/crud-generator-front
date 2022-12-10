import axios from "axios";
const { default: Configs } = require("./Configs");

const apiURL = Configs.getInstance().getServerURL();

export default async function newAccount(data) {
    const {email, password, systemToken, type} = data;

    let response;

    if(!!email && !!password && !!systemToken && !!type)
    {
        console.log(apiURL);
        await axios.post((apiURL + "/sign-up"), data, {
            headers: {
                'content-type': 'text/json',
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



