import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    password: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    payment: [null, [Validators.required, Validators.min(1)]]
  });

  get name(): AbstractControl {
    return this.form.get('name');
  }

  get password(): AbstractControl {
    return this.form.get('password');
  }

  get email(): AbstractControl {
    return this.form.get('email');
  }

  get payment(): AbstractControl {
    return this.form.get('payment');
  }

  constructor(
    private fb: FormBuilder
    
  ) { }

  ngOnInit(): void {
  }

  submit(): void {
    if (!this.form.valid) {
      return;
    }
    console.log(this.form.value);
  }

}
