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

  private itemsSignal = signal<CartItem[]>([]);
  items = computed(() => this.itemsSignal());

  constructor() {}

  applyStockFromLocalStorage(product: Product) {
    return product;
  }

  addToCart(product: Product) {}
  removeFromCart(productId: number | null) {}
  updateQuantity(productId: number | null, quantity: number) {}
  clear() {}
}
