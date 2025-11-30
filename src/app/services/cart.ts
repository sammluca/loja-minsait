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
  private stockKey = 'product_stock_overrides';

  private itemsSignal = signal<CartItem[]>(this.loadFromStorage());
  items = computed(() => this.itemsSignal());

  constructor() {}


  // ==================================================
  //  🔥 ESTOQUE - Overrides persistentes
  // ==================================================
  private loadStockOverrides(): Record<string, number> {
    const data = localStorage.getItem(this.stockKey);
    return data ? JSON.parse(data) : {};
  }

  private saveStockOverrides(data: Record<string, number>) {
    localStorage.setItem(this.stockKey, JSON.stringify(data));
  }

  private updateLocalStock(product: Product) {
    if (product.id == null) return;
    const stock = this.loadStockOverrides();
    stock[product.id] = product.quantidadeEstoque;
    this.saveStockOverrides(stock);
  }

  // 🔥 Deve ser chamado quando o produto for carregado no ProductService
  applyStockFromLocalStorage(product: Product): Product {
    if (product.id == null) return product;

    const stockOverrides = this.loadStockOverrides();
    if (stockOverrides[product.id] != null) {
      product.quantidadeEstoque = stockOverrides[product.id];
    }

    return product;
  }


  // ==================================================
  //  🛒 LÓGICA DO CARRINHO
  // ==================================================
  addToCart(product: Product): void {
    if (product.id == null) return;

    // Proteção de estoque
    if (product.quantidadeEstoque <= 0) {
      alert("Produto sem estoque disponível!");
      return;
    }

    const current = this.itemsSignal();
    const existing = current.find(i => i.product.id === product.id);

    if (existing) {
      if (existing.quantity >= product.quantidadeEstoque) {
        alert("Quantidade máxima disponível alcançada.");
        return;
      }
      existing.quantity++;
    } else {
      current.push({ product, quantity: 1 });
    }

    product.quantidadeEstoque--;
    this.updateLocalStock(product);

    this.itemsSignal.set([...current]);
    this.saveToStorage();
  }


  removeFromCart(productId: number | null): void {
    if (productId == null) return;

    const current = this.itemsSignal();
    const item = current.find(i => i.product.id === productId);

    if (item) {
      item.product.quantidadeEstoque += item.quantity;
      this.updateLocalStock(item.product);
    }

    const updated = current.filter(i => i.product.id !== productId);
    this.itemsSignal.set(updated);
    this.saveToStorage();
  }


  updateQuantity(productId: number | null, quantity: number): void {
    if (productId == null) return;

    const current = this.itemsSignal();
    const item = current.find(i => i.product.id === productId);
    if (!item) return;

    if (quantity < 1) return;

    const maxAllowed = item.product.quantidadeEstoque + item.quantity;

    if (quantity > maxAllowed) {
      alert(`Estoque máximo disponível: ${maxAllowed}`);
      return;
    }

    const newStock = maxAllowed - quantity;
    item.product.quantidadeEstoque = newStock;

    item.quantity = quantity;
    this.updateLocalStock(item.product);

    this.itemsSignal.set([...current]);
    this.saveToStorage();
  }


  clear(): void {
    this.itemsSignal().forEach(item => {
      item.product.quantidadeEstoque += item.quantity;
      this.updateLocalStock(item.product);
    });

    this.itemsSignal.set([]);
    this.saveToStorage();
  }


  // Persistência do carrinho
  private saveToStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.itemsSignal()));
  }

  private loadFromStorage(): CartItem[] {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }
}
