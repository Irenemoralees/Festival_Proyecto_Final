

import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule,CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  passwordType: string = "password"

  form!: FormGroup

  constructor(private builder: FormBuilder,
     private authService: AuthService,
     private router: Router){
    this.form = builder.group({
      "name": new FormControl(null, [Validators.required]),
      "email": new FormControl(null, [Validators.required, Validators.email]),
      "pwd": new FormControl(null, [Validators.required]),
    })
  }

  signup() {
    this.authService.signup(this.form.value.name, this.form.value.email, this.form.value.pwd).subscribe({
      next: ()=>{

        this.router.navigateByUrl("/login")
      },
      error:()=>{

      }
    })
  }
}

