import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductTransferService } from '../interior-services/products.services';

@Component({
  selector: 'app-cart',
   standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  orderData:any=[];
  originalPrice:number=0;
  totalPrice:number=0;
  discount:number=0;
  tax:number=0;

  constructor(private route: ActivatedRoute,private transferService: ProductTransferService) {}

  ngOnInit(): void { 

    if (typeof window !== 'undefined' && window.localStorage) {
      this.orderData = this.transferService.getCartData();
      this.updateTotals();

    }

  }

  RemoveItem(index:number){

   this.transferService.removeFromCart(index);
  this.orderData = this.transferService.getCartData();
  this.updateTotals();
  }

  updateTotals() {
  this.originalPrice = this.transferService.calculateTotal();
  //this.tax = this.originalPrice * 12 / 100;
  this.totalPrice = this.originalPrice;
}

PlaceOrder(){

  const message = this.generateWhatsAppMessage();
  const phoneNumber = '9870944489'; // Your WhatsApp business number with country code
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  window.open(whatsappUrl, '_blank');
  this.transferService.clear();
  window.location.reload();
  }

generateWhatsAppMessage() {
  let message = '🧾 *Avara Interior Invoice*%0A============================';

  this.orderData.forEach((item: any, index: number) => {
    message += `%0A🪑 ${index + 1}. *${item.ProductName}* - ₹${item.Price}`;
  });

  const total = this.orderData.reduce((sum: number, item: any) => sum + (item.Price || 0), 0);
  // const tax = total * 0.12;
  // const totalWithTax = total + tax;

  message += `%0A============================`;
  // message += `%0A💰 *Subtotal:* ₹${total.toFixed(2)}`;
  // message += `%0A🧾 *Tax (12%):* ₹${tax.toFixed(2)}`;
  message += `%0A💵 *Total:* ₹${total.toFixed(2)}*`;
  message += `%0A============================`;
  message += `%0A🙏 _Thank you for your order!_`;
  message += `%0A📞 We'll contact you shortly for confirmation.`;

  return message;
}

 
}
