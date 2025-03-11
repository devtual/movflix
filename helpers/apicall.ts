import { AppSettings } from "../config/config";
import { sleep } from "./common";
import { IApiResponse } from "./types";

export class ApiCall {
    private static instance: ApiCall;

    private constructor() {
        if (ApiCall.instance) {
            throw new Error("Error: Instantiation failed: Use ApiCall.getInstance() instead of new.");
        } 
    }

    public static getInstance() {
        if (!ApiCall.instance) {
            ApiCall.instance = new ApiCall();
        }
        return ApiCall.instance;
    }

    public async post(endpoint: string, body: object, shoudlEncrypt: boolean = false) {
        return await this._post(endpoint, body, shoudlEncrypt, false);
    }
    
    public async postAuth(endpoint: string, body: object, shoudlEncrypt: boolean = false) {
        return await this._post(endpoint, body, shoudlEncrypt, true);
    }

    public async getAuthData(endpoint: string, body: object, shoudlEncrypt: boolean = false) {
        return await this._getAuthData(endpoint, body, shoudlEncrypt, true);
    }
   
    private async _post(endpoint: string, body: any, shoudlEncrypt: boolean, isAuthenticated: boolean, retry: boolean = true, isHalfLogin = false,isMultipart:boolean=false): Promise<any> {
        try {
            
            var headers: any = {
                'Content-Type': 'application/x-www-form-urlencoded'
            };
          
            const httpResp = await fetch(AppSettings.apiEndpoint + endpoint, {
                body,
                method: 'POST',
                headers: headers
            });

            if(httpResp.status === 404){
                return this.responeMaker({Error: 'url not found on server'}, false);
            }
            const response = await (httpResp).json();

            if (httpResp.status >= 400 && httpResp.status < 600) {
                if (httpResp.status === 401) {
                    // this.user.logout();
                return this.responeMaker(response, false);

                } else if (!response.Status) {
                    return this.responeMaker(response, false);
                }

                return this.responeMaker(response, false);
            }
            else {
                return this.responeMaker(response, true);
            }
        } catch (err:any) {
          let error = {Error: err?.message};
            return this.responeMaker((error) , false);
        }
    }
    
    private async _getAuthData(endpoint: string, body: object, shoudlEncrypt: boolean, isAuthenticated: boolean, retry: boolean = true, isHalfLogin = false): Promise<any> {
        try {
            const url = AppSettings.apiEndpoint + endpoint;
            
            var headers: any = {
                'Content-Type': 'application/x-www-form-urlencoded'
            };
            
            const httpResp = await fetch(url, {
                method: 'GET',
                headers: headers
            })
            
            if(httpResp.status === 404){
                return this.responeMaker({Error: 'url not found on server'}, false);
            }

            if(httpResp.status === 204){
                return this.responeMaker({Error: ''}, false);
            }

            const response = await (httpResp).json();
            
            if (httpResp.status >= 400 && httpResp.status < 600) {
                if (httpResp.status === 401) {
                    // this.user.logout();
                    return;
                } else if (!response.Status) {
                    return this.responeMaker(response, false);
                }

                return this.responeMaker(response, false);

            }
            if (response.Status === false && response.Message === "IR" && isAuthenticated && retry) {
                await sleep(1000);
                return await this._post(endpoint, body, shoudlEncrypt, isAuthenticated, false);
            } else {
                return this.responeMaker(response, true);
            }
        } catch (err:any) {
            let error = {Error: err?.message};
            return this.responeMaker((error) , false);
        }
    }

    public responeMaker(response:any, isOk: any) {
        let res: IApiResponse = {};
        if(isOk){
            res = {
                Status: true,
                Message:'success',
                Result: response,
            };
        } else {
            res = {
                Status: false,
                Message:response.Error,
                Result: null,
            };
        }
        return res;
        
    }

    public async get(endPoint: string) {
        const headers = {
                accept: 'application/json',
                Authorization: `Bearer ${AppSettings.apiKey}`
            }
        const httpResp = await fetch(AppSettings.apiEndpoint + endPoint,{
            method: 'GET',
            headers: headers
        });

        if(httpResp.status === 404){
            return this.responeMaker({Error: 'url not found on server'}, false);
        }
        const response = await httpResp.json();
        return response;
    }
}

