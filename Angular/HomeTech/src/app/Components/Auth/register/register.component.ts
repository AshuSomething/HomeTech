import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { User } from 'src/app/user';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupComponent } from '../../Common/popup/popup.component';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  userModel = new User();
  constructor(private _auth: AuthService, private modalService: NgbModal) {

  }

  registerUser() {
    this._auth.registerUser(this.userModel).subscribe(
      (response) => {
        // Handle the response data here
        //this.modalService.open(response.message);
        this.openPopup(response.isSuccess, response.message);
      });
  }

  resetUserForm(userForm: NgForm) {
    userForm.resetForm();;
  }

  openPopup(successful: boolean, message: string) {
    const modalRef = this.modalService.open(PopupComponent);

    if (successful) {
      modalRef.componentInstance.title = 'Registration Successful';
    } else {
      modalRef.componentInstance.title = 'Registration Failed';
    }
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.isSuccess = successful;
  }
}
