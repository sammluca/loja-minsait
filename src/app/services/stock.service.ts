import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private stockKey = 'product_stock_overrides';

  private loadStock(): Record<number, number> {
    const raw = localStorage.getItem(this.stockKey);
    return raw ? JSON.parse(raw) : {};
  }

  private saveStock(stock: Record<number, number>): void {
    localStorage.setItem(this.stockKey, JSON.stringify(stock));
  }

  getStock(productId: number | null): number | null {
    if (productId == null) return null;
    const map = this.loadStock();
    return map[productId] ?? null;
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
    const map = this.loadStock();
    map[productId] = newStock;
    this.saveStock(map);
  }

  increaseStock(product: Product | number | null, amount: number): void {
    if (amount <= 0) return;

    const id =
      typeof product === 'number'
        ? product
        : product && typeof product !== 'number'
        ? product.id
        : null;
    if (id == null) return;

    const map = this.loadStock();
    const base =
      map[id] ??
      (typeof product === 'object' && product !== null ? product.quantidadeEstoque : 0);

    map[id] = base + amount;
    this.saveStock(map);
  }

  decreaseStock(product: Product | number | null, amount: number): void {
    if (amount <= 0) return;

    const id =
      typeof product === 'number'
        ? product
        : product && typeof product !== 'number'
        ? product.id
        : null;
    if (id == null) return;

    const map = this.loadStock();
    const base =
      map[id] ??
      (typeof product === 'object' && product !== null ? product.quantidadeEstoque : 0);

    map[id] = Math.max(0, base - amount);
    this.saveStock(map);
  }
}
