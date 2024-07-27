
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginResponse } from '../../interfaces/login-response';
import { User } from '../../interfaces/user';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule ,CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  passwordType: string = 'password';
  form!: FormGroup;
  errorMessage: string = '';

  constructor(private builder: FormBuilder,
              private authService: AuthService,
              private router: Router) {
    this.form = builder.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    });
  }

  get passwordIconClass(): string {
    return this.passwordType === 'text' ? 'fa-eye' : 'fa-eye-slash';
  }

  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
  }

  login() {
    const email: string = this.form.value.email;
    const pass: string = this.form.value.password;

    this.authService.login(email, pass).subscribe({
      next: (response) => {
        const loginResponse: LoginResponse = response as LoginResponse;
        const user: User = { token: loginResponse.token, id: loginResponse.id, role: loginResponse.role };
        this.authService.saveUser(user);
        this.router.navigateByUrl("/");
      },
      error: () => {
        this.errorMessage = 'Usuario o contraseña incorrectos';
        console.error('Error de login:', this.errorMessage);
      }
    });
  }
}
