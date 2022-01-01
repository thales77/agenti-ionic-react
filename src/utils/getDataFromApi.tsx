import { Http, HttpOptions } from '@capacitor-community/http';
import qs from 'qs';

//get data from API
export default async (url: string | undefined, port: string | undefined, parameters: object) => {
    const options = {
        url: `http://${url}:${port}?${qs.stringify(parameters)}`,
        headers: { 'Content-Type': 'application/json' },
        params: {},
    };
    try {
        const { data } = await Http.request({ ...options, method: 'GET' })
        return JSON.parse(data);
    } catch (error: any) {
        return error
    }
};