import { Component } from '@angular/core';

@Component({
  selector: 'app-service-list',
  imports: [],
  templateUrl: './service-list.component.html',
  styleUrl: './service-list.component.css'
})
export class ServiceListComponent {


    scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
