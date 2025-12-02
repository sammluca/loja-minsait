import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { StockService } from '../../services/stock.service';
import { ProductTableComponent } from '../../components/product-table/product-table';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ProductTableComponent
  ],
  templateUrl: './products.html',
  styleUrls: ['./products.scss']
})
export class ProductsPage implements OnInit {

  loading = signal(true);
  products = signal<Product[]>([]);

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private stockService: StockService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.loading.set(true);

    this.productService.list().subscribe({
      next: (data) => {
        const applied = data.map(p => this.stockService.applyToProduct(p));
        this.products.set(applied);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        alert("Erro ao carregar produtos.");
      }
    });
  }

  editProduct(id: number) {
    this.router.navigate(['/products/edit', id]);
  }

  deleteProduct(id: number) {
    if (!confirm("Deseja realmente excluir este produto?")) return;

    this.productService.delete(id).subscribe({
      next: () => {
        alert("Produto excluído!");
        this.loadProducts();
      },
      error: () => {
        alert("Erro ao excluir produto.");
      }
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    alert("Produto adicionado ao carrinho!");
    this.loadProducts();
  }
}
