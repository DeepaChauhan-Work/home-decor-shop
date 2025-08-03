import { Injectable,inject } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class ProductTransferService {
  private productData: any;
  private cartData: any[] = [];
  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();
  totalPrice: number = 0;
  
  private firestore = inject(Firestore);
  private zone = inject(NgZone);

constructor() {
  if (typeof window !== 'undefined' && window.localStorage) {
  const storedCart = localStorage.getItem('cartData');
  this.cartData = storedCart ? JSON.parse(storedCart) : [];
  this.cartCountSubject.next(this.cartData.length);

  const storedProd = localStorage.getItem('prodData');
  this.productData = storedProd ? JSON.parse(storedProd) : [];
  }

}

calculateTotal() {
 return this.totalPrice = this.cartData.reduce((sum, item) => sum + (item.Price || 0), 0);
}

   getAllProducts(): Observable<any[]> {
    const productsRef = collection(this.firestore, 'products');
    return this.zone.run(() => collectionData(productsRef, { idField: 'id' }));

    }

    addProduct(product: any) {
    const productsRef = collection(this.firestore, 'products');
    return addDoc(productsRef, product);
    }

  updateProduct(id: string, data: any) {
    const productRef = doc(this.firestore, 'products', id);
    return updateDoc(productRef, data);
  }

  deleteProduct(id: string) {
    const productRef = doc(this.firestore, 'products', id);
    return deleteDoc(productRef);
  }

  setProduct(data: any) {
    this.productData = data;
    localStorage.setItem('prodData', JSON.stringify(this.productData));
  }

  getProduct() {
    return this.productData;
  }

  setCartData(data: any) {
    this.cartData.push(data);
    this.cartCountSubject.next(this.cartData.length);
    localStorage.setItem('cartData', JSON.stringify(this.cartData));
    this.calculateTotal();
  }

  getCartData() {
    return this.cartData;
  }

  removeFromCart(index: number) {
    this.cartData.splice(index, 1);
    this.cartCountSubject.next(this.cartData.length);
    localStorage.setItem('cartData', JSON.stringify(this.cartData));
    this.calculateTotal();
  }

  clear() {
    this.productData = null;
    localStorage.removeItem('cartData');
  }
}
