import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { User } from 'src/app/user';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


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
        console.log('POST request successful:', response);
        // Handle the response data here
        this.modalService.open(response.message);
      },
      (error) => {
        console.error('POST request failed:', error);
        // Handle errors here
        this.modalService.open(error.message);
      }
    );
  }

  resetUserForm(userForm: NgForm) {
    userForm.resetForm();;
  }
}
