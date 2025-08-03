import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contactus',
  standalone: true, // ✅ Required for standalone components
  imports: [FormsModule], // ✅ Enables ngModel/ngForm
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css'] // ✅ Correct property name
})
export class ContactusComponent {
 email:string="hello@avarainterior.com"

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  sendToWhatsApp(form: any) {
    const name = form.value.name.trim();
    const email = form.value.email.trim();
    const message = form.value.message.trim();

    const phoneNumber = '8072703946';
    const text = `Hello, I'm *${name}* %0AEmail: ${email} %0A%0A${encodeURIComponent(message)}`;
    const url = `https://wa.me/${phoneNumber}?text=${text}`;
    window.open(url, '_blank');
  }
}
