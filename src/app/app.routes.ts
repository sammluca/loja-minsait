import { Routes } from '@angular/router';
import { ProductsPage } from './pages/products/products';
import { ProductDetailsPage } from './pages/product-details/product-details';
import { Cart } from './pages/cart/cart';
import { ProductFormPage } from './pages/product-form/product-form';
import { Home } from './pages/home/home';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'products', component: ProductsPage },
  { path: 'products/create', component: ProductFormPage },
  { path: 'products/edit/:id', component: ProductFormPage },

  
  { path: 'products/:id', component: ProductDetailsPage },

  { path: 'cart', component: Cart },
];
