import { api } from '../deps.ts';

api.interceptors.response.use(
    (response: any) => response.data
    ,(error: any) => Promise.reject(error)
);

export class AbstractService {

    apiConfig: any = {
        baseURL: null
    };

    constructor(base_url: string) {
        this.apiConfig.baseURL = base_url;
    }

    public create = (data: any) => {
        return api.post('', data, this.apiConfig);
    }

    public read = (id: string) => {
        return api.get(`${id}`, this.apiConfig);
    }

    public update = (id: string, data: any) => {
        return api.put(`${id}`, data, this.apiConfig);
    }

    public delete = (id: string) => {
        return api.delete(`${id}`, this.apiConfig);
    }

    public list = () => {
        return api.get('', this.apiConfig);
    }

}
