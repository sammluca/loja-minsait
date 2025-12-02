import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';
import { CartItem } from '../models/cart-item.model';
import { StorageService } from './storage.service';
import { NotificationService } from './notification.service';
import { StockService } from './stock.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private storageKey = 'cart_items';

  items = signal<CartItem[]>([]);

  constructor(
    private storage: StorageService,
    private notify: NotificationService,
    private stock: StockService
  ) {
    const saved = this.storage.get<CartItem[]>(this.storageKey);
    this.items.set(saved ?? []);
  }

  addToCart(product: Product): void {
    if (!product || product.id == null) return;

    const p = this.stock.applyToProduct(product);

    if (p.quantidadeEstoque <= 0) {
      this.notify.error('Produto sem estoque disponível!');
      return;
    }

    const current = this.items();
    const existing = current.find(i => i.product.id === product.id);

    if (existing) {
      if (p.quantidadeEstoque <= 0) {
        this.notify.error('Quantidade máxima disponível alcançada.');
        return;
      }
      this.items.set(current.map(i =>
        i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
      ));
    } else {
      this.items.set([...current, { product: p, quantity: 1 }]);
    }

    this.stock.decreaseStock(p, 1);

    this.persist();
  }

  removeFromCart(productId: number | null): void {
    if (!productId) return;

    const current = this.items();
    const item = current.find(i => i.product.id === productId);

    if (item) {
      this.stock.increaseStock(item.product, item.quantity);
    }

    this.items.set(current.filter(i => i.product.id !== productId));
    this.persist();
  }

  updateQuantity(productId: number | null, quantity: number): void {
    if (!productId || quantity < 1) return;

    const current = this.items();
    const item = current.find(i => i.product.id === productId);
    if (!item) return;

    const stockNow = this.stock.getStock(productId);
    const baseStock = stockNow ?? item.product.quantidadeEstoque;
    const maxAllowed = baseStock + item.quantity;

    if (quantity > maxAllowed) {
      this.notify.error(`Estoque máximo disponível: ${maxAllowed}`);
      return;
    }

    const diff = quantity - item.quantity;

    if (diff > 0) {
      this.stock.decreaseStock(item.product, diff);
    } else if (diff < 0) {
      this.stock.increaseStock(item.product, -diff);
    }

    const updatedProduct = this.stock.applyToProduct(item.product);

    this.items.set(
      current.map(i =>
        i.product.id === productId ? { ...i, quantity, product: updatedProduct } : i
      )
    );

    this.persist();
  }

  clear(): void {
    const current = this.items();
    current.forEach(i => this.stock.increaseStock(i.product, i.quantity));
    this.items.set([]);
    this.persist();
  }

  private persist() {
    this.storage.set(this.storageKey, this.items());
  }
}
