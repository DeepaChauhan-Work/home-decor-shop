import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService, User } from '../app/pages/interior-services/auth.service';
import { ProductTransferService } from '../app/pages/interior-services/products.services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isMobileMenuOpen:boolean=false;
  title = 'home-decor-shop';
  loggedInUser: User | null = null;
  navLinks: any[] = [];
  cartCount: number = 0;

  constructor(
    private authService: AuthService,
    private transferService: ProductTransferService,
    private router: Router
  ) {
  }

  ngOnInit() {
    // 👇 Subscribe to user updates
    this.authService.currentUser$.subscribe(user => {
      this.loggedInUser = user;
      this.updateNavLinks(user);
    });

    // 👇 Get initial cart count
    this.transferService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });
  }

  // 👇 Set menu links based on user role or email
  updateNavLinks(user: User | null) {
    const commonLinks = [
      { path: '', label: 'Home' },
      { path: '/Products', label: 'Product' },
      { path: '/Services', label: 'Services' },
      { path: '/Gallery', label: 'Gallery' },
      { path: '/Contact', label: 'Contact US' },
      { path: '/About', label: 'Our Story' }
    ];

    if (user && user.email === 'yaswa@avarainterior.com') {
      this.navLinks = [
        ...commonLinks.slice(0, 2), // Home and Product
        { path: '/addProducts', label: 'Add Products' },
        ...commonLinks.slice(2)    // Services to Our Story
      ];
    } else {
      this.navLinks = commonLinks;
    }
  }

  logout() {
    this.authService.logout();
    this.loggedInUser = null;
    alert("Logout successful! ");
    this.router.navigate(['/']); // 👈 Optional: redirect to home
  }
  ToggleMenuPhone() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMenuPhone() {
    this.isMobileMenuOpen = false;
  }
}
