import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
export  class Connectivity{

    static getConfig(): AxiosRequestConfig {
        return{ 
            headers: {
                Accept: 'application/json'
            }
        }
    }
    
    static async getRequest(url: string, config: AxiosRequestConfig): Promise<AxiosResponse<any>>{
        return await axios.get(url, config);
    }
}