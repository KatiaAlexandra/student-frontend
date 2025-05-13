import AxiosClient from './axios'
import {AxiosRequestConfig} from 'axios';
import {ResponseApi, TypesResponse} from "@/kernel/types";
import Api from "@/config/http-client.gateway";

export default{
    get(endpoint: string){
        return AxiosClient.get(endpoint);
    },
    post(endpoint: string, payload: any, config?: AxiosRequestConfig){
        return AxiosClient.post(endpoint, payload, config)
    },
    put(endpoint:string, payload: any){
        return AxiosClient.put(endpoint, payload);
    },
    delete(endpoint:string){
        return AxiosClient.delete(endpoint);
    }
}

export async function handleRequest<T, P = undefined>(
    method: "post" | "put" | "get" | "delete",
    url: string,
    payload?: P
): Promise<ResponseApi<T>> {
    try {
        let response;

        if (method === "get" || method === "delete") {
           response = await (Api as any)[method](url, payload ? { params: payload } : undefined);
        } else {
            response = await (Api as any)[method](url, payload);
        }

        const {data} = response;

        return {
            result: data,
            type: TypesResponse.SUCCESS,
            text: "Operación exitosa",
        };
    } catch (error: any) {
        return {
            result: null,
            type: TypesResponse.ERROR,
            text:
                error.response?.data?.text ||
                `Error inesperado en solicitud ${method}`,
        };
    }

}