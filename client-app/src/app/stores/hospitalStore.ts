import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Hospital } from "../models/hospital";

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
        this.loadingInitial = true;
        try{
            const hospitals = await agent.Activities.list();
            hospitals.forEach(hospital => {
                this.setHospital(hospital);
            });
            this.setLoadingInitial(false);
        } catch (error){
            console.log(error);
            this.setLoadingInitial(false);          
        }
    }

    loadHospital = async (id: string) => {
        let hospital = this.getHospital(id);
        if(hospital){
            this.selectedHospital = hospital;
            return hospital;
        } else {
            this.loadingInitial = true;
            try{
                hospital = await agent.Activities.details(id);
                this.setHospital(hospital);
                runInAction(() => {
                    this.selectedHospital = hospital;
                });
                this.setLoadingInitial(false);
                return hospital;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setHospital = (hospital: Hospital) => {
        this.hospitalRegistry.set(hospital.id, hospital);
    }

    private getHospital = (id: string) => {
        return this.hospitalRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createHospital = async(hospital: Hospital) => {
        this.loading = true;
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