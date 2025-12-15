import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import { toast } from "react-toastify";

const baseUrl = 'http://localhost:3030';

export default function useRequest(url,initialState) {
    const {user, isAuthenticated} = useContext(UserContext);
    const [data, setData] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false);

    const request = async (url,method, data , config = {}) => {
        let options = {};
        if(method) {
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

        if (response.status === 204) {
            return {};
        }

        return await response.json();
    }

    useEffect(() => {
        if(!url)
            return;

        setIsLoading(true);
        request(url)
            .then(result => setData(result))
            .catch(err => toast.error(err.message || "Something went wrong!"))
            .finally(() => setIsLoading(false));
    },[url])
    
    return { request, data, isLoading };
}