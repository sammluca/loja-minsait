import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private api = 'http://localhost:8080/v1/produtos';

  constructor(private http: HttpClient) {}

  list(): Observable<Product[]> {
    return of([]);
  }

  getById(id: number): Observable<Product> {
    return of({
      id,
      codigoBarras: '',
      nome: '',
      preco: 0,
      quantidadeEstoque: 0,
      categoria: { id: 0 }
    });
  }

  create(data: Product) { return of(data); }
  update(data: Product) { return of(data); }
  delete(id: number) { return of(null); }
}
