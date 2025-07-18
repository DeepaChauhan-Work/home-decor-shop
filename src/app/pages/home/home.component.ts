import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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
  featuredProducts = [
    { id: 1, name: 'Decorative Vase', price: 49.99, imageUrl: 'assets/products/vase.jpg' },
    { id: 2, name: 'Wooden Chair', price: 129.99, imageUrl: 'assets/products/chair.jpg' },
    { id: 3, name: 'Modern Curtains', price: 89.99, imageUrl: 'assets/products/curtains.jpg' }
  ];

  testimonials: Testimonial[] = [
    { customer: 'Sarah', text: 'Amazing service and quality products!' },
    { customer: 'John', text: 'Loved the interior design process.' },
    { customer: 'Aisha', text: 'Highly recommend for home decor!' }
  ];

  constructor() {}

  ngOnInit(): void { }
}
