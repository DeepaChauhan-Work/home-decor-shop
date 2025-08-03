import { Component, OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductTransferService } from '../../interior-services/products.services';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  styleUrls: ['./product-list.component.css'],
  imports: [CommonModule, RouterModule,FormsModule],
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  selectedFilter = 'Select Filter';

  constructor(private router: Router,private transferService: ProductTransferService) { }

  ngOnInit() {

  this.transferService.getAllProducts().subscribe((data) => {
      this.products = data; 
      console.log(this.products);
    });

  }

GoToProductDetails(product: any){
  this.transferService.setProduct(product);
  this.router.navigate(['/productDetails']);
}

AddToCart(product: any){
  console.log("add to cart"+product);
  this.transferService.setCartData(product); 
}

  filterProducts() {
    switch (this.selectedFilter) {
     
      case 'lowToHigh':
        this.products = [...this.products].sort((a, b) => a.Price - b.Price);
        break;
      case 'highToLow':
        this.products = [...this.products].sort((a, b) => b.Price - a.Price);
        break;
      default:
        this.products = [...this.products];
    }
  }

scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });

}

}
