import {SweetAlertIcon} from "sweetalert2";

export type Entity<Tidentifier extends number | string> = {
    id?: Tidentifier
}

export enum TypesResponse {
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
    WARNING = 'WARNING',
}

export interface ResponseApi<T> {
    result: T | null;
    type: TypesResponse;
    text: string;
}

export type ToastConfig = {
    icon: SweetAlertIcon;
    title: string;
    text: string;
    onCloseCallback?: () => void;
    timer?: number;
};

export type FunctionToastConfig = Omit<ToastConfig, 'icon'>