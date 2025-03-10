import { Platform } from 'react-native';

export function isIphone(): boolean {
    return Platform.OS == 'ios';
}

export async function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export function isNullOrUndefined(value: any): boolean {
    return value === null || value === undefined;
}

export function isEmptyString(value: any): boolean {
    return (value ?? "") === "";
}

export function shallowCopy(data: any) {
    if (Array.isArray(data)) {
        return [...data];
    } else if (data && typeof data === 'object') {
        return { ...data };
    }
    return data;
}

export function deepCopy(data: any) {
    if (data && typeof data === 'object') {
        return JSON.parse(JSON.stringify(data));
    }
    return data;
}