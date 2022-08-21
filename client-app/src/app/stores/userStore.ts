import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { User, UserFormValues } from "../models/user";
import { store } from "./store";
import { withRouter, RouteComponentProps } from "react-router-dom";


export default class UserStore {
    user: User | null = null;

    constructor(){
        makeAutoObservable(this);
    }

    get isLoggedIn(){
        return !!this.user;
    }

    login = async (creds: UserFormValues) => {
        try{
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => { this.user = user; });
            console.log(this.user?.displayName)
            window.location.href = '/hospitals';
            store.modalStore.closeModal();
        } catch (error){
            throw error;
        }
    }

    logout = () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.user = null;
        window.location.href = '/';
    }

    getUser = async () => {
        try{
            const user = await agent.Account.current();
            runInAction(() => {this.user = user});
        }catch(error){
            console.log(error);
        }
    }

    // register = async (creds: UserFormValues) => {
    //     try{
    //         const user = await agent.Account.register(creds);
    //         store.commonStore.setToken(user.token);
    //         runInAction(() => { this.user = user; });
    //         console.log(this.user?.displayName)
    //         window.location.href = '/hospitals';
    //         store.modalStore.closeModal();
    //     } catch (error){
    //         throw error;
    //     }
    // }
}

// import { makeAutoObservable, runInAction } from "mobx";
// import agent from "../api/agent";
// import { User, UserFormValues } from "../models/user";
// import { store } from "./store";


// export default class UserStore{
//     user: User | null = null;

//     constructor(){
//         makeAutoObservable(this);
//     }

//     get isLoggedIn(){
//         return !!this.user;
//     }

//     login = async (creds: UserFormValues) => {
//         try{
//             const user = await agent.Account.login(creds);
//             store.commonStore.setToken(user.token);
//             runInAction(() => { this.user = user; });
//             history.push('/hospitals');
//         } catch (error){
//             throw error;
//         }
//     }

//     logout = () => {
//         store.commonStore.setToken(null);
//         window.localStorage.removeItem('jwt');
//         this.user = null;
//         history.push('/');
//     }
// }