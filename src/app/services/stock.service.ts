// src/app/services/stock.service.ts
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Product } from '../models/product.model';

const STOCK_KEY = 'product_stock_overrides';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  constructor(private storage: StorageService) {}

  private loadOverrides(): Record<string, number> {
    return this.storage.get<Record<string, number>>(STOCK_KEY) ?? {};
  }

  private saveOverrides(map: Record<string, number>): void {
    this.storage.set(STOCK_KEY, map);
  }

  getOverride(productId: number | null): number | undefined {
    if (productId == null) return undefined;
    const map = this.loadOverrides();
    return map[productId] !== undefined ? map[productId] : undefined;
  }

  setOverride(productId: number | null, newValue: number): void {
    if (productId == null) return;
    const map = this.loadOverrides();
    map[productId] = newValue;
    this.saveOverrides(map);
  }

  applyLocalStock(product: Product): Product {
    if (product.id == null) return product;
    const override = this.getOverride(product.id);
    if (override !== undefined) {
      return { ...product, quantidadeEstoque: override };
    }
    return product;
  }

  saveStock(product: Product): void {
    if (product.id == null) return;
    this.setOverride(product.id, product.quantidadeEstoque);
  }

  increaseStock(productId: number | null, amount: number): void {
    if (productId == null) return;
    const map = this.loadOverrides();
    const curr = map[productId] ?? 0;
    map[productId] = curr + amount;
    this.saveOverrides(map);
  }

  decreaseStock(productId: number | null, amount: number): void {
    if (productId == null) return;
    const map = this.loadOverrides();
    const curr = map[productId] ?? 0;
    map[productId] = Math.max(0, curr - amount);
    this.saveOverrides(map);
  }
}
