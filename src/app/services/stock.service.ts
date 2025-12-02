import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private stockKey = 'product_stock_overrides';

  private loadStock(): Record<number, number> {
    const raw = localStorage.getItem(this.stockKey);
    const parsed = raw ? JSON.parse(raw) : {};

    const cleaned: Record<number, number> = {};

    Object.keys(parsed).forEach(k => {
      const id = Number(k);
      const value = Number(parsed[k]);

      if (!Number.isNaN(id) && Number.isFinite(value) && value >= 0) {
        cleaned[id] = value;
      }
    });

    return cleaned;
  }

  private saveStock(stock: Record<number, number>): void {
    localStorage.setItem(this.stockKey, JSON.stringify(stock));
  }

  getStock(productId: number | null): number | null {
    if (productId == null) return null;
    const map = this.loadStock();
    return map.hasOwnProperty(productId) ? map[productId] : null;
  }

  applyToProduct(product: Product): Product {
    if (product.id == null) return { ...product };

    const overridden = this.getStock(product.id);

    return {
      ...product,
      quantidadeEstoque:
        overridden !== null ? overridden : product.quantidadeEstoque
    };
  }

  setStock(productId: number | null, newStock: number): void {
    if (productId == null) return;

    const map = this.loadStock();
    map[productId] = Math.max(0, Number(newStock));
    this.saveStock(map);
  }

  increaseStock(product: Product | number | null, amount: number): void {
    if (amount <= 0) return;

    const id =
      typeof product === 'number'
        ? product
        : product?.id ?? null;

    if (id == null) return;

    const map = this.loadStock();
    const current =
      map[id] ??
      (typeof product === 'object' && product !== null
        ? Number(product.quantidadeEstoque)
        : 0);

    map[id] = Math.max(0, current + Number(amount));
    this.saveStock(map);
  }

  decreaseStock(product: Product | number | null, amount: number): void {
    if (amount <= 0) return;

    const id =
      typeof product === 'number'
        ? product
        : product?.id ?? null;

    if (id == null) return;

    const map = this.loadStock();
    const current =
      map[id] ??
      (typeof product === 'object' && product !== null
        ? Number(product.quantidadeEstoque)
        : 0);

    map[id] = Math.max(0, current - Number(amount));
    this.saveStock(map);
  }
}
