import { Routes } from '@angular/router';
import { ProductsPage } from './pages/products/products';
import { ProductDetailsPage } from './pages/product-details/product-details';
import { CartPage } from './pages/cart/cart';
import { ProductFormPage } from './pages/product-form/product-form';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductsPage },
   { path: 'products/:id', component: ProductDetailsPage },
   
  { path: 'products/create', component: ProductFormPage },
  { path: 'products/edit/:id', component: ProductFormPage },
   { path: 'cart', component: CartPage },
];
