import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductTransferService } from '../interior-services/products.services';


interface Testimonial {
  customer: string;
  text: string;
}

@Component({
  selector: 'app-Home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    isHidden = false;
    cartCount:number=0;
    products:any=[{ id: 1, ProductName: 'Decorative Vase', Price: 3000, imageUrl: 'assets/products/vase.jpg', Category: "Furniture" ,CUSTOMIZABLE:true},
    { id: 2, ProductName: 'Wooden Chair', Price: 5200, imageUrl: 'assets/products/chair.jpg', Category: "Furniture" ,CUSTOMIZABLE:true},
  { id: 3, ProductName: 'Dining Table', Price: 52000, imageUrl: 'assets/products/chair.jpg', Category: "Furniture" ,CUSTOMIZABLE:true}];



  testimonials: Testimonial[] = [
    { customer: 'Sarah', text: 'Amazing service and quality products!' },
    { customer: 'John', text: 'Loved the interior design process.' },
    { customer: 'Aisha', text: 'Highly recommend for home decor!' }
  ];

  constructor(private router: Router,private transferService: ProductTransferService) {}

  ngOnInit(): void { 

     this.transferService.getAllProducts().subscribe((data) => {
      this.products = data.slice(0, 3);; 
      console.log(this.products);
    });
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  hideBottom() {
    this.isHidden = true;
  }
  acceptCookies() {
    this.isHidden = true;
  }

  sendWhatsAppMessage() {
    var   message: string = 'Hi, I’m interested in your services. Please contact me.';
    var phoneNumber: string = '919870944489'; // No + or spaces
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');

    }
GoToProductDetails(product: any){
  this.transferService.setProduct(product);
  this.router.navigate(['/productDetails']);
}

AddToCart(product: any){
  console.log("add to cart"+product);
  this.transferService.setCartData(product); 
}
}
