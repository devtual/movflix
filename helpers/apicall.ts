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
                return this.responseMaker({Message: 'url not found on server'}, false);
            }
            const response = await (httpResp).json();

            if (httpResp.status >= 400 && httpResp.status < 600) {
                if (httpResp.status === 401) {
                    // this.user.logout();
                return this.responseMaker(response, false);

                } else if (!response.Status) {
                    return this.responseMaker(response, false);
                }

                return this.responseMaker(response, false);
            }
            else {
                return this.responseMaker(response, true);
            }
        } catch (err:any) {
          let error = {Message: err?.message};
            return this.responseMaker((error) , false);
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
                return this.responseMaker({Message: 'url not found on server'}, false);
            }

            if(httpResp.status === 204){
                return this.responseMaker({Message: ''}, false);
            }

            const response = await (httpResp).json();
            
            if (httpResp.status >= 400 && httpResp.status < 600) {
                if (httpResp.status === 401) {
                    // this.user.logout();
                    return;
                } else if (!response.Status) {
                    return this.responseMaker(response, false);
                }

                return this.responseMaker(response, false);

            }
            if (response.Status === false && response.Message === "IR" && isAuthenticated && retry) {
                await sleep(1000);
                return await this._post(endpoint, body, shoudlEncrypt, isAuthenticated, false);
            } else {
                return this.responseMaker(response, true);
            }
        } catch (err:any) {
            let error = {Message: err?.message};
            return this.responseMaker((error) , false);
        }
    }

    public responseMaker(response:any, success: boolean) : IApiResponse {
        return {
            Status: success,
            Message: success ? 'success' : response.Message,
            Result: success ? response : null,
        }
    }

    public async get(endPoint: string): Promise<IApiResponse> {
        const headers = {
            accept: 'application/json',
            Authorization: `Bearer ${AppSettings.apiKey}`
        }

        try {
            const httpResp = await fetch(AppSettings.apiEndpoint + endPoint,{
                method: 'GET',
                headers: headers
            });

            console.log('Get endpoint call', httpResp.status, endPoint);

            if(httpResp.status === 404){
                return this.responseMaker({Message: 'Url not found on server'}, false);
            }
            
            const response = await httpResp.json();
            return this.responseMaker(response, true);
        } catch (err: any) {
            const error = {Message: ''};
            
            if(err instanceof Error){
                error.Message = err.message
            } else {
                error.Message = JSON.stringify(err)
            }

            console.log(`Error fetching data ${err.Message}`);

            return this.responseMaker(error, false);
        }
    }
}

