import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Hospital } from "../models/hospital";
import {v4 as uuid} from 'uuid';

export default class HospitalStore{
    hospitalRegistry = new Map<string, Hospital>();
    selectedHospital: Hospital | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor(){
        makeAutoObservable(this);
    }

    loadHospitals = async () => {
        try{
            const hospitals = await agent.Activities.list();
            hospitals.forEach(hospital => {
                this.hospitalRegistry.set(hospital.id, hospital);
            });
            this.setLoadingInitial(false);
        } catch (error){
            console.log(error);
            this.setLoadingInitial(false);          
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectHospital = (id: string) => {
        this.selectedHospital = this.hospitalRegistry.get(id);
    }

    cancelSelectedHospital = () => {
        this.selectedHospital = undefined;
    }

    openForm = (id?: string) => {
        id ? this.selectHospital(id) : this.cancelSelectedHospital();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    createHospital = async(hospital: Hospital) => {
        this.loading = true;
        hospital.id = uuid();
        try{
            await agent.Activities.create(hospital);
            runInAction(() => {
                this.hospitalRegistry.set(hospital.id, hospital);
                this.selectedHospital = hospital;
                this.editMode = false;
                this.loading = false;
            });
        } catch(error){
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    updateHospital = async(hospital: Hospital) => {
        this.loading = true;
        try{
            await agent.Activities.update(hospital);
            runInAction(() => {
                this.hospitalRegistry.set(hospital.id, hospital);
                this.selectedHospital = hospital;
                this.editMode = false;
                this.loading = false;
            });
        } catch (error){
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    deleteHospital = async (id: string) => {
        this.loading = true;
        try{
            await agent.Activities.delete(id);
            runInAction(() => {
                this.hospitalRegistry.delete(id);
                if(this.selectedHospital?.id === id) this.cancelSelectedHospital();
                this.loading = false;
            });
        } catch (error){
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }
}