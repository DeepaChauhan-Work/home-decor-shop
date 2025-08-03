import { Component } from '@angular/core';

@Component({
  selector: 'app-galerry',
  imports: [],
  templateUrl: './galerry.component.html',
  styleUrl: './galerry.component.css'
})
export class GalerryComponent {

    scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
