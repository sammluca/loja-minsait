import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-table.html',
  styleUrls: ['./product-table.scss']
})
export class ProductTableComponent {

  @Input() products: Product[] = [];

  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
  @Output() addToCart = new EventEmitter<Product>();

 onEdit(id: number | null) {
  if (id == null) return;
  this.edit.emit(id);
}

onDelete(id: number | null) {
  if (id == null) return;
  this.delete.emit(id);
}

onAddToCart(product: Product) {
  this.addToCart.emit(product);
}
}
