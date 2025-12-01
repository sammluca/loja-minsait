import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.scss']
})
export class ProductDetailsPage implements OnInit {

  product = signal<Product | null>(null);
  loading = signal(true);

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) return;

    this.productService.getById(id).subscribe({
      next: (data) => {
        this.product.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  addToCart() {
    if (this.product()) {
      this.cartService.addToCart(this.product()!);
      alert("Produto adicionado ao carrinho!");
    }
  }

  deleteProduct() {
  const prod = this.product();
  if (!prod || !prod.id) return;

  if (!confirm("Tem certeza que deseja excluir este produto?")) {
    return;
  }

  this.productService.delete(prod.id).subscribe({
    next: () => {
      alert("Produto excluído com sucesso!");
      window.location.href = '/products'; 
    },
    error: () => {
      alert("Erro ao excluir produto");
    }
  });
}

}
