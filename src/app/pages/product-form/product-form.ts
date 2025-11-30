import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrls: ['./product-form.scss']
})
export class ProductFormPage implements OnInit {

  loading = signal(false);
  editing = signal(false);
  productId: number | null = null;

  form;

  constructor(
    private fb: NonNullableFormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {

    this.form = this.fb.group({
      id: 0,
      codigoBarras: [''],
      nome: ['', Validators.required],
      preco: [0, Validators.required],
      quantidadeEstoque: [0, Validators.required],
      categoria: this.fb.group({
        id: this.fb.control<number | null>(null)   // <<< CORREÇÃO AQUI
      })
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.editing.set(true);
      this.productId = Number(idParam);
      this.loadProduct(this.productId);
    }
  }

  loadProduct(id: number) {
    this.loading.set(true);

    this.productService.getById(id).subscribe({
      next: (prod) => {
        this.form.patchValue({
          id: prod.id,
          codigoBarras: prod.codigoBarras ?? '',
          nome: prod.nome ?? '',
          preco: Number(prod.preco) ?? 0,
          quantidadeEstoque: prod.quantidadeEstoque ?? 0,
          categoria: {
            id: prod.categoria?.id ?? null   // <<< CORREÇÃO AQUI
          }
        });
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        alert("Erro ao carregar produto");
      }
    });
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data: Product = this.form.getRawValue();

    this.loading.set(true);

    if (this.editing()) {

      this.productService.update(data).subscribe({
        next: () => {
          this.loading.set(false);
          alert("Produto atualizado!");
          this.router.navigate(['/products']);
        },
        error: () => {
          this.loading.set(false);
          alert("Erro ao atualizar produto");
        }
      });

    } else {

      this.productService.create(data).subscribe({
        next: () => {
          this.loading.set(false);
          alert("Produto criado!");
          this.router.navigate(['/products']);
        },
        error: () => {
          this.loading.set(false);
          alert("Erro ao criar produto");
        }
      });

    }
  }
}
