import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductListComponent } from './pages/products/product-list/product-list.component';
import { GalerryComponent } from './pages/galerry/galerry.component';
import { ServiceListComponent } from './pages/services/service-list/service-list.component';
import { AboutusComponent } from './pages/about/aboutus/aboutus.component';
import { ContactusComponent } from './pages/contact/contactus/contactus.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegistrationComponent } from './pages/auth/registration/registration.component';
import { AddProductComponent } from './pages/admin/add-product/add-product.component';
import { ProductDetailsComponent } from './pages/products/product-details/product-details.component';
import { CartComponent } from './pages/cart/cart.component';

export const routes: Routes = [  
  { path: '', component: HomeComponent },
  { path: 'Products', component: ProductListComponent },
  { path: 'Gallery', component: GalerryComponent },
  { path: 'Services', component: ServiceListComponent },
  { path: 'About', component: AboutusComponent },
  { path: 'Contact', component: ContactusComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'addProducts', component: AddProductComponent },
  { path: 'productDetails', component: ProductDetailsComponent },
  { path: 'Cart', component: CartComponent },
];
