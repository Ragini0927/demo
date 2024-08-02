import { Component } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  checkoutData = {
    name: '',
    email: '',
    address: ''
  };

  onSubmit(form) {
    if (form.valid) {
      console.log('Form Submitted', this.checkoutData);
      // Perform checkout logic, like calling an API
    } else {
      console.log('Form is invalid');
    }
  }
}
