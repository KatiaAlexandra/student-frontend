import Vue from "vue";
import {SweetAlertIcon} from "sweetalert2";
import './sweet-alert-styles.css'
import {FunctionToastConfig, ToastConfig} from "@/kernel/types";

export function showAlert(title: string, message:string, type: SweetAlertIcon="success"){
    Vue.swal({
        title:title,
        text:message,
        icon:type
    });
}

export function showConfirmation(title: string, message: string, type: SweetAlertIcon = 'warning', callback: () => void, cancelCallback?: () => void) {
    const appElement = document.getElementById('app');
    Vue.swal({
        title: title,
        text: message,
        icon: type,
        showCancelButton: true,
        showCloseButton: false,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        didOpen: () => {
            if (appElement) {
                appElement.setAttribute('inert', '');
            }
        },
        willClose: () => {
            if (appElement) {
                appElement.removeAttribute('inert');
            }
        },
    }).then((result) => {
        if (result.isConfirmed) {
            callback();
        } else {
            cancelCallback && cancelCallback();
        }
    });
}

const toast = (config : ToastConfig) => {
    const { icon, title, text, onCloseCallback, timer } = config;

    Vue.swal.mixin({
        toast: true,
        position: 'top-end',
        iconColor: 'teacher',
        customClass: {
            popup: 'colored-toast'
        },
        showConfirmButton: false,
        showCancelButton: false,
        timer,
        timerProgressBar: true,
        didClose: () => {
            if(onCloseCallback){
                onCloseCallback();
            }
        }
    }).fire({
        icon,
        title,
        text
    })
}

export const showSuccessToast = ( config : FunctionToastConfig ) => {
    const { title, onCloseCallback, timer, text } = config;
    toast({
        icon: 'success',
        title,
        text: text ? text : '',
        onCloseCallback,
        timer: timer ? timer : 3000
    });
}

export const showErrorToast = ( config : FunctionToastConfig ) => {
    const { title, onCloseCallback, timer, text } = config;
    toast({
        icon: 'error',
        title,
        text: text ? text : '',
        onCloseCallback,
        timer: timer ? timer : 3000
    });
}

export const showWarningToast = ( config : FunctionToastConfig ) => {
    const { title, onCloseCallback, timer, text } = config;
    toast({
        icon: 'warning',
        title,
        text: text ? text : '',
        onCloseCallback,
        timer: timer ? timer : 3000
    });
}

export const showInfoToast = ( config : FunctionToastConfig ) => {
    const { title, onCloseCallback, timer, text } = config;
    toast({
        icon: 'info',
        title,
        text: text ? text : '',
        onCloseCallback,
        timer: timer ? timer : 3000
    });
}

export function showConfirmationAsync(title: string, message: string, type: SweetAlertIcon = 'warning', callback: () => Promise<void>, cancelCallback?: () => Promise<void>) {
    Vue.swal({
        title: title,
        text: message,
        icon: type,
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',

    }).then(async (result) => {
        if (result.isConfirmed) {
            await callback();
        } else {
            cancelCallback && await cancelCallback();
        }
    });
}