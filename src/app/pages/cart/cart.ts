import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItem, CartService } from '../../services/cart';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.scss']
})
export class CartPage {

  
  items = computed(() => this.cartService.items());
  total = computed(() =>
    this.items().reduce((sum: number, item: CartItem) =>
      sum + item.product.price * item.quantity,
    0)
  );

  constructor(private cartService: CartService) {}

  updateQty(item: CartItem, event: Event) {
    const qtd = Number((event.target as HTMLInputElement).value);
    this.cartService.updateQuantity(item.product.id, qtd);
  }

  removeItem(item: CartItem) {
    this.cartService.removeFromCart(item.product.id);
  }

  clear() {
    this.cartService.clear();
  }
}
