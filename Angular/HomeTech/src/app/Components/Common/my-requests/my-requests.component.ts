import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { CustomerService } from 'src/app/Services/customer.service';
import { CustomerRequestDto } from 'src/app/Models/customeRequestDto';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.css']
})
export class MyRequestsComponent implements OnInit {

  requests: CustomerRequestDto[] = [];

  navigateToUpdateComponent(request: any) {
    this._router.navigate(['/updateRequest'], {
      queryParams: { request: JSON.stringify(request) }
    });
  }

  deleteRequest(request: any) {
    this._customeService.deleteRequest(request.complaintID).subscribe(
      (response) => {
        console.log('DELETE request successful:', response);
        // Handle the response data here
        this._customeService.getRequests(this._auth.getJwtData().sub).subscribe((data: any) =>
          this.requests = data.result
          //console.log(data.result)
        )
      },
      (error) => {
        console.error('DELETE request failed:', error);
        // Handle errors here
      }
    );
    console.log("request sent");
  }


  ngOnInit(): void {
    // Initialization logic goes here
    this._customeService.getRequests(this._auth.getJwtData().sub).subscribe((data: any) =>
      this.requests = data.result
      //console.log(data.result)
    )


  }
  constructor(private _auth: AuthService, private _customeService: CustomerService, private _router: Router, private _route: ActivatedRoute) { }
}