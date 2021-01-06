import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  message: string = '';

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    password: ['', Validators.required]
  });

  get name(): AbstractControl {
    return this.form.get('name');
  }

  get password(): AbstractControl {
    return this.form.get('password');
  }


  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  async submit(): Promise<void> {
    try {
      this.message = null;
      await this.authService.login(this.name.value, this.password.value);
    } catch (e) {
      this.message = 'Cannot log in!';
    }
  }
}
