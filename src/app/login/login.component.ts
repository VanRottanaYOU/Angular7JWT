import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username: string;
  public password: string;
  public error: string;
  loginForm: FormGroup;
  invalidLogin: boolean = false;
  authStatus: boolean;

  constructor(
    private auth: AuthService, 
    private router: Router,
    private formBuilder: FormBuilder, 
    ) { }

  // public submit() {
  //   this.auth.login(this.username, this.password)
  //     .pipe(first())
  //     .subscribe(
  //       result => this.router.navigate(['todos']),
  //       err => this.error = 'Could not authenticate'
  //     );
  // }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    const loginPayload = {
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value
    }
    this.auth.login(loginPayload).subscribe(data => {
      if(data.status === 200) {
        //window.localStorage.setItem('token', data.result.token);
        this.router.navigate(['todos']);
      }else {
        this.invalidLogin = true;
        alert(data.message);
      }
    });
    
  }

  ngOnInit() {
    window.localStorage.removeItem('token');
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });
  }

}
