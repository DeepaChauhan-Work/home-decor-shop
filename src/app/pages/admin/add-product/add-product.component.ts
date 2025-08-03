import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductTransferService } from '../../interior-services/products.services';
@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  productForm: FormGroup;
  imagePreview: string | null = null;

  constructor(private fb: FormBuilder, private transferService: ProductTransferService) {
    this.productForm = this.fb.group({
      ProductName: ['', Validators.required],
      Category: ['', Validators.required],
      Price: [0, [Validators.required, Validators.min(0)]],
      Description: ['', Validators.required],
      Material: ['', Validators.required],
      Height: ['', Validators.required],
      Width: ['', Validators.required],
      CUSTOMIZABLE: ['', Validators.required],
      Image: ['']
    });
  }

  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
        this.productForm.patchValue({ imageUrl: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.productForm.valid) {

      console.log(this.productForm.value);
      this.transferService.addProduct(this.productForm.value);
      alert('Product added successfully!');
      this.productForm.reset();
      //this.imagePreview = null;
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }
}
