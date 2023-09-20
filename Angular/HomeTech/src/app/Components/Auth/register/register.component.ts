import { Component } from '@angular/core';
import { User } from 'src/app/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  userModel = new User("Bhuvan23", "bhu@gmail.com", "BHUVAN", 6301659199, "Bhuvan@143", "");

}
