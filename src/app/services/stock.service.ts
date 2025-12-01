import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private stockKey = 'product_stock_overrides';

  constructor() {}

  private loadStock(): Record<string, number> {
    const data = localStorage.getItem(this.stockKey);
    return data ? JSON.parse(data) : {};
  }

  private saveStock(data: Record<string, number>): void {
    localStorage.setItem(this.stockKey, JSON.stringify(data));
  }

  getStock(productId: number | null): number | null {
    if (productId == null) return null;
    const stock = this.loadStock();
    return stock[productId] ?? null;
  }

  applyToProduct(product: Product): Product {
    if (product.id == null) return { ...product };
    const overridden = this.getStock(product.id);
    return {
      ...product,
      quantidadeEstoque: overridden !== null ? overridden : product.quantidadeEstoque
    };
  }

  setStock(productId: number | null, newStock: number): void {
    if (productId == null) return;
    const stock = this.loadStock();
    stock[productId] = newStock;
    this.saveStock(stock);
  }


  increaseStock(product: Product | number | null, amount: number): void {
    const id = typeof product === 'number' ? product : product?.id ?? null;
    if (id == null) return;
    const map = this.loadStock();
    const curr = map[id] ?? (product && typeof product !== 'number' ? product.quantidadeEstoque : 0);
    map[id] = curr + amount;
    this.saveStock(map);
  }

  decreaseStock(product: Product | number | null, amount: number): void {
    const id = typeof product === 'number' ? product : product?.id ?? null;
    if (id == null || amount <= 0) return;
    const map = this.loadStock();
    const curr = map[id] ?? (product && typeof product !== 'number' ? product.quantidadeEstoque : 0);
    map[id] = Math.max(0, curr - amount);
    this.saveStock(map);
  }
}
