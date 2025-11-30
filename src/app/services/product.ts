import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private api = "http://localhost:8080/v1/produtos";

  constructor(private http: HttpClient) {}

  list(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.api}`);
  }

  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.api}/${id}`);
  }

  create(p: Product): Observable<Product> {
    return this.http.post<Product>(`${this.api}/produto`, p);   // <<<<< CORRIGIDO
  }

  update(p: Product): Observable<Product> {
    return this.http.put<Product>(`${this.api}/atualiza`, p);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
