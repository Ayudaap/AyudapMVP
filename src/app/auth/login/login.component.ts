import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private frm:FormBuilder, private authServices:AuthService) { }


  ngOnInit(): void {
    this.loginForm = this.frm.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required, Validators.min(8)]]
    });
  }

  login() {
    if (this.loginForm.invalid) { return true; }
    console.log(this.loginForm.value);

    const { email, password } = this.loginForm.value;
    this.authServices.loginUsuario(email, password).subscribe(console.log);
  }
}
