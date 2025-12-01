import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
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


  form: any;

  constructor(
    private fb: NonNullableFormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {

    
    this.form = this.fb.group({
      id: this.fb.control<number | null>(null),
      codigoBarras: this.fb.control<string | null>(null),
      nome: this.fb.control<string>('', Validators.required),
      preco: this.fb.control<number>(0, [
      Validators.required,
      Validators.min(0)
      ]),

      quantidadeEstoque: this.fb.control<number>(0, [
       Validators.required,
       Validators.min(0)
       ]),
      categoria: this.fb.group({
        id: this.fb.control<number | null>(null)
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
          codigoBarras: prod.codigoBarras ?? null,
          nome: prod.nome ?? '',
          preco: Number(prod.preco) ?? 0,
          quantidadeEstoque: prod.quantidadeEstoque ?? 0,
          categoria: {
            id: prod.categoria?.id ?? null
          }
        });

        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        alert('Erro ao carregar produto');
      }
    });
  }

  save() {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  const data = this.form.getRawValue() as Product;

  
  if (!this.editing()) {
    data.id = null;
  }

  if (data.categoria?.id == null) {
    data.categoria = null;
  }

  this.loading.set(true);
  
  if (this.editing()) {
    this.productService.update(data).subscribe({
      next: () => this.finish("Produto atualizado!"),
      error: () => this.fail("Erro ao atualizar produto")
    });

  } else {
    this.productService.create(data).subscribe({
      next: () => this.finish("Produto criado!"),
      error: () => this.fail("Erro ao criar produto")
    });
  }
}

  private finish(msg: string) {
    this.loading.set(false);
    alert(msg);
    this.router.navigate(['/products']);
  }

  private fail(msg: string) {
    this.loading.set(false);
    alert(msg);
  }
}
