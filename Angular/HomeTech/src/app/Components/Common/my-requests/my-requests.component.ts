import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { CustomerService } from 'src/app/Services/customer.service';
import { CustomerRequestDto } from 'src/app/Models/customeRequestDto';

import { ActivatedRoute, Router } from '@angular/router';
import { TechnicianService } from 'src/app/Services/technician.service';
import { CreateRequestDto } from 'src/app/Models/createRequestDto';
import { ComplaintDto } from 'src/app/Models/ComplaintDto';

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
  transform(value: string): string {
    if (!value) return '';

    const date = new Date(value);
    // Add 5 and a half hours (5 * 60 + 30 minutes) to the time
    date.setMinutes(date.getMinutes() + 330);

    // Format the date as "dd/mm/yyyy"
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    // Format the time as "hh:mm a"
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const amPm = hours === 10 || hours === 11 ? 'AM' : 'PM';

    // Convert hours to 12-hour format
    const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');

    const formattedTime = `${formattedHours}:${minutes} ${amPm}`;

    const formattedDateAndTime = `${day}/${month}/${year} ${formattedTime}`;

    return formattedDateAndTime;
  }

  revokeRequest(request: any) {
    this.addRequestinC_API(request);
    this.deleteRequestfromAR_API(request);
  }

  deleteRequest(request: any) {
    this._customeService.deleteRequest(request.complaintID).subscribe(
      (response) => {
        console.log('DELETE request successful:', response);
        // Handle the response data here
        window.location.reload();
      },
      (error) => {
        console.error('DELETE request failed:', error);
        // Handle errors here
      }
    );
    console.log("request sent");
  }

  addRequestinC_API(request: any) {
    var obj = new ComplaintDto(
      request.service,
      request.category,
      request.date,
      request.customerId,
    )
    console.log(request)
    console.log(obj)
    this._techService.addrequestInComplaintAPI(obj).subscribe(
      (response) => {
        console.log('POST request successful:', response);
        // Handle the response data here
      },
      (error) => {
        console.error('POST request failed:', error);
        // Handle errors here
      }
    );
    console.log("request sent");

  }

  deleteRequestfromAR_API(request: any) {
    console.log(request.complaintID);
    this._techService.deleteRequestsfromAcceptRequestAPI(request.complaintID).subscribe(
      (response) => {
        console.log('DELETE request successful:', response);
        // Handle the response data here
        window.location.reload();
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
    console.log("welcome to my requests")
    if (this._auth.getJwtData().role === 'Customer') {
      this._customeService.getRequests(this._auth.getJwtData().sub).subscribe((data: any) =>
        this.requests = data.result)
    }
    if (this._auth.getJwtData().role === 'Technician') {
      console.log("techinin")
      this._techService.getRequestsfromAcceptRequestAPI(this._auth.getJwtData().sub).subscribe((data: any) => {
        this.requests = data.result
        console.log(data)
      })

    }



  }
  constructor(
    private _auth: AuthService,
    private _customeService: CustomerService,
    private _router: Router,
    private _techService: TechnicianService,
    public auth: AuthService
  ) { }

}