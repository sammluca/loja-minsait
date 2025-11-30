import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { CartService } from './cart';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private api = 'http://localhost:8080/v1/produtos';

  constructor(
    private http: HttpClient,
    private cartService: CartService
  ) {}

  
  list() {
    return this.http.get<Product[]>(`${this.api}`).pipe(
      map(products =>
        products.map(p => this.cartService.applyStockFromLocalStorage(p))
      )
    );
  }

  getById(id: number) {
    return this.http.get<Product>(`${this.api}/${id}`).pipe(
      map(product => this.cartService.applyStockFromLocalStorage(product))
    );
  }

  create(data: Product) {
    return this.http.post<Product>(`${this.api}/produto`, data);
  }

  update(data: Product) {
    return this.http.put<Product>(`${this.api}/atualiza`, data);
  }

  
  delete(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}
