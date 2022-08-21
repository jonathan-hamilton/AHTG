import axios, { AxiosResponse } from "axios";
import { Hospital } from "../models/hospital";
import { User, UserFormValues } from "../models/user";
import { store } from "../stores/store";

const sleep = (delay: number) => {
    return new Promise((resolve) =>{
        setTimeout(resolve, delay);
    });
}

axios.defaults.baseURL = 'https://localhost:7142/api'

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if(token) config.headers!.Authorization = `Bearer ${token}`
    return config;
    
})

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
});

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}

const Activities = {
    list: () => requests.get<Hospital[]>('/hospitals'),
    details: (id: string) => requests.get<Hospital>(`/hospitals/${id}`),
    create: (hospital: Hospital) => axios.post<void>('/hospitals/', hospital),
    update: (hospital: Hospital) => axios.put<void>(`/hospitals/${hospital.id}`, hospital),
    delete: (id: string) => axios.delete<void>(`/hospitals/${id}`)
}

const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
    register: (user: UserFormValues) => requests.post<User>('/account/register', user)
}

const agent = {
    Activities,
    Account
}

export default agent;