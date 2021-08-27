import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { NetWorkResponse } from "../models/Network.model";
import { NetWorkResponseError } from "../models/Network.model";
import * as firebase from "firebase/app";

@Injectable({
    providedIn: 'root'
})
export class AuthService{
    constructor(
        private authService: AngularFireAuth
    ){

    }

    public async getCurrentUser(): Promise<any> {
        try {
            let data;
            await this.authService.currentUser.then(value => {
                data = value?.toJSON() || null;
            })
            return data;
        } catch (error) {
            Promise.reject(error);
        }
    }

    public async signIn(email: string, password: string): Promise<NetWorkResponse | NetWorkResponseError> {
        try {
            const response = await this.authService.signInWithEmailAndPassword(email, password);
            await this.setPersitenceUser();
            return { success: true, response }
        } catch (error){
            return { success: false, error }
        }
    }

    private async setPersitenceUser(): Promise<void>{
        try {
            await this.authService.setPersistence(firebase.default.auth.Auth.Persistence.LOCAL);
        } catch (error) {
            Promise.reject(error);
        }
    }
}