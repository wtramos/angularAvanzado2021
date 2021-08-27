import { Injectable } from '@angular/core';
import {AngularFirestore } from '@angular/fire/firestore';
import { Product } from '../models/Product.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NetWorkResponse } from '../models/Network.model';
import { NetWorkResponseError } from "../models/Network.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private firestoreService: AngularFirestore
  ) { }

  public async getProducts() : Promise<Product[]>{
    try {
      const products: Product[] = await this.firestoreService.collection<Product>("products").get().toPromise().then(
        querySnapshot => {
          return querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
              _id: doc.id,
              ...data
            }
          })
        }
      );
      return products;
    } catch (error) {
     return Promise.reject(error);
    }
  }

  public getProductsRealTime$(): Observable<Product[]> {
    const products = this.firestoreService.collection<Product>('products').valueChanges().pipe(
      map(product => {
        return product;
      })
    );
    return products;
  }

  public async createProduct(product: Product): Promise<NetWorkResponse | NetWorkResponseError>{
    try {
      const data = await this.firestoreService.collection("products").add(product);
      return { success: true, response: data };
    } catch (error) {
      return { success: false, error };
    }
  }

  public async getProductByBrand(brand: string): Promise<Product[]>{
    try {
      const productByBrand = this.firestoreService.collection<Product>('products', query => query.where("brand", "==", brand)).get().toPromise().then( (querySnapshot) => {
        return querySnapshot.docs.map(doc => {
          const data: Product = doc.data();
          return {
            ...data,
            _id: doc.id
          }
        });
      });
      return productByBrand;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async updateProduct(product: Product): Promise<NetWorkResponse | NetWorkResponseError> {
    try {
      const { name, description, price, offert, image, brand } = product;
      await this.firestoreService.collection('products').doc(product._id).update({
        name, description, price, offert, image, brand
      });
      return { success: true, response: product }
    } catch (error) {
      return { success: false, error }
    }
  }

  public async deleteProduct(product: Product): Promise<NetWorkResponse | NetWorkResponseError> {
    try {
      await this.firestoreService.collection('products').doc(product._id).delete();
      return { success: true, response: null }
    } catch (error) {
      return { success: false, error }
    }
  }
}