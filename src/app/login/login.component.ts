import {Component} from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, NgIf,
    MatIconModule,MatButtonModule,MatTooltipModule],
})
export class LoginComponent {
  email = new FormControl('', [Validators.required, Validators.email, Validators.max(100)]);
  password = new FormControl('', [Validators.required, Validators.min(8), Validators.max(20)]);
  hide = true;

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getErrorPassword(){
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.password.hasError('min')) {
      return 'Enter 8 characters as min value';
    }
    return 'You must enter a value';
  }
}
