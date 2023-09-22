import { Component } from '@angular/core';
import { LoginRequestDto } from 'src/app/Models/loginRequestDto';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userModel = new LoginRequestDto();

  constructor(private _auth: AuthService, private _router: Router) {

  }

  loginUser() {
    this._auth.loginUser(this.userModel).subscribe(
      (response) => {
        console.log('POST request successful:', response);
        // Handle the response data here
        localStorage.setItem('token', response.result.token);
        this._router.navigate(['/']);
      },
      (error) => {
        console.error('POST request failed:', error);
        // Handle errors here
      }
    );
  }

  resetUserForm(userForm: NgForm) {
    userForm.resetForm();;
  }
}
