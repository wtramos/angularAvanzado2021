import { Injectable } from "@angular/core";
import crypto from 'crypto-js';
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'any'
})
export class CryptoFunctions{
    public encryptAES<T>(data: T): string {
        try {
            const dataToString = JSON.stringify(data);
            const textEncryted = crypto.AES.encrypt(dataToString, environment.salt).toString();
            const dataToBtoa = btoa(textEncryted);
            return dataToBtoa;
        } catch (error) {
           return ""; 
        }
    }

    public descryptAES<T>(hash: string): T | null {
        try {
            const decryptedToAtob: string = atob(hash);
            const textDecrypted = crypto.AES.decrypt(decryptedToAtob, environment.salt).toString(crypto.enc.Utf8);
            return JSON.parse(textDecrypted);
        } catch (error) {
            return null;
        }
    }

    public encrypt(data: any): string {
        const textEncrypt = crypto.SHA256(data).toString();
        return textEncrypt;
    }
}