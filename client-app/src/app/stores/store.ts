import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import HospitalStore from "./hospitalStore";
import ModalStore from "./modalStore";
import UserStore from "./userStore";

interface Store{
    hospitalStore : HospitalStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
}

export const store: Store = {
    hospitalStore: new HospitalStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}