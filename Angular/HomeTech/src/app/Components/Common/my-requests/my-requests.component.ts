import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { CustomerService } from 'src/app/Services/customer.service';
import { CustomerRequestDto } from 'src/app/Models/customeRequestDto';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.css']
})
export class MyRequestsComponent implements OnInit {

  requests: CustomerRequestDto[] = [];

  ngOnInit(): void {
    // Initialization logic goes here
    this._customeService.getRequests(this._auth.getJwtData().sub).subscribe((data: any) =>
      this.requests = data.result
      //console.log(data.result)
    )
  }



  constructor(private _auth: AuthService, private _customeService: CustomerService) { }
}
