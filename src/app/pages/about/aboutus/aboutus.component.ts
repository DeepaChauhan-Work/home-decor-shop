import { Component } from '@angular/core';

@Component({
  selector: 'app-aboutus',
  imports: [],
  templateUrl: './aboutus.component.html',
  styleUrl: './aboutus.component.css'
})
export class AboutusComponent {

      scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
