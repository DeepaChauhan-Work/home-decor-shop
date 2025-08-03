import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductTransferService } from '../../interior-services/products.services';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-product-details',
  standalone:true,
  imports: [CommonModule,RouterModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})



export class ProductDetailsComponent {
  email:string="hello@avarainterior.com"
  product: any;
  productId:number=0;
  productName:string="";
  catogary:string=""
  price:number=0;
  height:string="10";
  width:string="5";
  description:string="";
  material:string="";
  customizable:string="";

  constructor(private route: ActivatedRoute,private transferService: ProductTransferService) {}


  ngOnInit() {
    if (typeof window !== 'undefined' && window.localStorage) {
       this.product = this.transferService.getProduct();
     
    }
     if (this.product) {
    this.productName=this.product.ProductName;
    this.price=this.product.Price; 
    this.catogary=this.product.Category;
    this.description=this.product.Description;
    this.customizable=this.product.CUSTOMIZABLE
    this.height=this.product.Height;
    this.width=this.product.Width;
    this.material=this.product.Material;
    console.log(this.product);
     }
    else{
       console.warn('No product found in transferService. Possibly direct navigation without setting it.');
    }
    // Now fetch product details using this.productId
  }

  AddToCart(){
  console.log("add to cart"+this.product);
  this.transferService.setCartData(this.product); 
}

}
