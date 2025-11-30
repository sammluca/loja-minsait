import { Routes } from '@angular/router';
import { ProductsPage } from './pages/products/products';
import { ProductDetailsPage } from './pages/product-details/product-details';
import { CartPage } from './pages/cart/cart';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductsPage },
   { path: 'products/:id', component: ProductDetailsPage },
   { path: 'cart', component: CartPage },
];
