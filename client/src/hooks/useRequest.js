import { useContext } from "react";
import UserContext from "../contexts/UserContext";

const baseUrl = 'http://localhost:3030';

export default function useRequest() {
    const {user, isAuthenticated} = useContext(UserContext);

    const request = async (url,method, data , config = {}) => {
        let options = {};
        if(method ) {
            options.method = method;
        }

        if(data){
            options.headers = {
                'content-type': 'application/json',
            };
            options.body = JSON.stringify(data);
        }

        if(config.accessToken || isAuthenticated){
            options.headers = {
                ...options.headers,
                'X-Authorization' : config.accessToken || user.accessToken
            }
        }

        const response = await fetch(baseUrl + url, options);

        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    }
    
    return { request };
}