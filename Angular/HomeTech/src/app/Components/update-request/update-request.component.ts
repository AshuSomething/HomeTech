import { Component, OnInit } from '@angular/core';
import { CustomerRequestDto } from 'src/app/Models/customeRequestDto';
import { updateRequestDto } from 'src/app/Models/updateRequestDto'; // Import the DTO for updating requests
import { AuthService } from 'src/app/Services/auth.service';
import { CustomerService } from 'src/app/Services/customer.service';


@Component({
  selector: 'app-update-request', // Update the selector if needed
  templateUrl: './update-request.component.html', // Update the template URL
  styleUrls: ['./update-request.component.css'] // Update the styles if needed
})
export class UpdateRequestComponent {
  request: any;


}

