import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductListComponent } from './pages/products/product-list/product-list.component';
// import { ProductDetailComponent } from './pages/products/product-detail/product-detail.component';
// import { InteriorServicesComponent } from './pages/interior-services/interior-services.component';
// import { AboutComponent } from './pages/about/about.component';
// import { ContactComponent } from './pages/contact/contact.component';
// import { LoginComponent } from './pages/auth/login.component';
// import { RegisterComponent } from './pages/auth/register.component';
 import { AddProductComponent } from './pages/admin/add-product/add-product.component';
// import { UpdateProductComponent } from './pages/admin/update-product.component';
// import { DeleteProductComponent } from './pages/admin/delete-product.component';

export const routes: Routes = [  { path: '', component: HomeComponent },
  { path: 'products', component: ProductListComponent },
  // { path: 'products/:id', component: ProductDetailComponent },
  // { path: 'services', component: InteriorServicesComponent },
  // { path: 'about', component: AboutComponent },
  // { path: 'contact', component: ContactComponent },
  // { path: 'login', component: LoginComponent },
  // { path: 'register', component: RegisterComponent },
   { path: 'addProducts', component: AddProductComponent },
  // { path: 'admin/update-product/:id', component: UpdateProductComponent },
  // { path: 'admin/delete-product/:id', component: DeleteProductComponent },
];
