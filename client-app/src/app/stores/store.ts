import { createContext, useContext } from "react";
import HospitalStore from "./hospitalStore";

interface Store{
    hospitalStore : HospitalStore;
}

export const store: Store = {
    hospitalStore: new HospitalStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}