import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../models/product.model';


export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private storageKey = 'cart_items';

  private itemsSignal = signal<CartItem[]>(this.loadFromStorage());

  items = computed(() => this.itemsSignal());

 
  cartCount = computed(() =>
    this.itemsSignal().reduce((acc, item) => acc + item.quantity, 0)
  );

  constructor() {}


  addToCart(product: Product): void {
    const current = this.itemsSignal();
    const exists = current.find(i => i.product.id === product.id);

    if (exists) {
      exists.quantity++;
    } else {
      current.push({ product, quantity: 1 });
    }

    this.itemsSignal.set([...current]);
    this.saveToStorage();
  }

  removeFromCart(productId: number): void {
    const updated = this.itemsSignal().filter(i => i.product.id !== productId);
    this.itemsSignal.set(updated);
    this.saveToStorage();
  }

  updateQuantity(productId: number, quantity: number): void {
    const updated = this.itemsSignal().map(item =>
      item.product.id === productId ? { ...item, quantity } : item
    );

    this.itemsSignal.set(updated);
    this.saveToStorage();
  }

  clear(): void {
    this.itemsSignal.set([]);
    this.saveToStorage();
  }


  private saveToStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.itemsSignal()));
  }

  private loadFromStorage(): CartItem[] {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }
}
