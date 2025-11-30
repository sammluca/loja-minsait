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
      sum + item.product.preco * item.quantity,
    0)
  );

  constructor(private cartService: CartService) {}

  updateQty(item: CartItem, event: Event) {
    const qtd = Number((event.target as HTMLInputElement).value);

    if (item.product.id != null) {
      this.cartService.updateQuantity(item.product.id, qtd);
    }
  }

  removeItem(item: CartItem) {
  if (!confirm(`Deseja realmente remover '${item.product.nome}' do carrinho?`)) {
    return;
  }

  if (item.product.id != null) {
    this.cartService.removeFromCart(item.product.id);
  }
}


clear() {
  if (!confirm("Tem certeza que deseja esvaziar o carrinho?")) {
    return;
  }

  this.cartService.clear();
}
}
