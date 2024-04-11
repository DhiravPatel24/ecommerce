import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../Products.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();
  private totalCount: number = 0; 
  public cartItems: Product[] = []; 
  constructor() { }

  updateCartCount(count: number): void {
    
    this.totalCount += count;
    this.cartCountSubject.next(this.totalCount);
  }

  addToCart(product: Product): void {
    const cart = localStorage.getItem('cartItems');
    if (cart) {
      this.cartItems = JSON.parse(cart) as Product[]; 
      console.log(this.cartItems)
    }
    const existingItemIndex = this.cartItems.findIndex(item => item.name === product.name);
    if (existingItemIndex !== -1) {
      
      this.cartItems[existingItemIndex].quantity++;
      localStorage.setItem('cartItems',JSON.stringify(this.cartItems))
    } else {
      
      product.quantity = 1;
      this.cartItems.push(product);
      localStorage.setItem('cartItems',JSON.stringify(this.cartItems))
      alert('Item added into Cart')
      
    }
  }

  clearCart(): void {
    this.cartItems = []; 
    this.totalCount = 0; 
    this.cartCountSubject.next(0);
  }

  getCartItems(): Product[] {

   return this.cartItems
   
  }

  removeFromCart(item: Product): void {
    const index = this.cartItems.indexOf(item);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.updateCartCount(-1); 
    }
  }

  incrementQuantity(index: number): void {
    const cart = localStorage.getItem('cartItems');
    if (cart) {
      this.cartItems = JSON.parse(cart) as Product[]; 
      console.log(this.cartItems)
    }
    if (index >= 0 && index < this.cartItems.length) {
      this.cartItems[index].quantity++; 
    }
  }

  decrementQuantity(index: number): void {
    const cart = localStorage.getItem('cartItems');
    if (cart) {
      this.cartItems = JSON.parse(cart) as Product[]; 
      console.log(this.cartItems)
    }
    if (index >= 0 && index < this.cartItems.length) {
      if (this.cartItems[index].quantity > 1) {
        this.cartItems[index].quantity--; 
      }
    }
  }

  

}
