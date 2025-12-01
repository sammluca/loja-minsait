import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { StockService } from './stock.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private api = 'http://localhost:8080/v1/produtos';

  constructor(
    private http: HttpClient,
    private stockService: StockService
  ) {}

  list() {
    return this.http.get<Product[]>(this.api).pipe(
      map(products => products.map(p => this.stockService.applyToProduct(p)))
    );
  }

  getById(id: number) {
    return this.http.get<Product>(`${this.api}/${id}`).pipe(
      map(product => this.stockService.applyToProduct(product))
    );
  }

  /** CORRIGIDO — Backend exige /produto no final */
  create(data: Product) {
    return this.http.post<Product>(`${this.api}/produto`, data);
  }

  /** CORRIGIDO — Backend usa PUT /atualiza */
  update(data: Product) {
    return this.http.put<Product>(`${this.api}/atualiza`, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}
