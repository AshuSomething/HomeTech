import { Component } from '@angular/core';
import { LoginRequestDto } from 'src/app/Models/loginRequestDto';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupComponent } from '../../Common/popup/popup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userModel = new LoginRequestDto();

  constructor(private _auth: AuthService, private _router: Router, private modalService: NgbModal) {

  }

  loginUser() {
    this._auth.loginUser(this.userModel).subscribe(
      (response) => {
        if (response.isSuccess) {
          console.log('POST request successful:', response);
          // Handle the response data here
          localStorage.setItem('token', response.result.token);
          this._router.navigate(['/']);
        } else {
          this.openPopup(response.isSuccess, response.message);
        }

      }
    );
  }

  resetUserForm(userForm: NgForm) {
    userForm.resetForm();;
  }

  openPopup(successful: boolean, message: string) {
    const modalRef = this.modalService.open(PopupComponent);
    modalRef.componentInstance.title = 'Login Failed';
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.isSuccess = successful;
  }
}
