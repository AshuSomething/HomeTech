import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AcceptRequestDto } from 'src/app/Models/AcceptRequestDto';
import { CustomerRequestDto } from 'src/app/Models/customeRequestDto';
import { AuthService } from 'src/app/Services/auth.service';
import { TechnicianService } from 'src/app/Services/technician.service';

@Component({
  selector: 'app-select-request',
  templateUrl: './select-request.component.html',
  styleUrls: ['./select-request.component.css']
})
export class SelectRequestComponent {
  constructor(private _auth: AuthService, private _techService: TechnicianService, private _router: Router, private _route: ActivatedRoute) { }
  requests: CustomerRequestDto[] = [];
  services: string[] = [];
  selectedService: string = '';
  filteredRequests: CustomerRequestDto[] = [];
  ngOnInit(): void {
    // Initialization logic goes here
    // this._techService.getRequests().subscribe((data: any) =>
    //   this.requests = data.result
    //console.log(data.result)

    this._techService.getRequests().subscribe((data: any) => {
      this.requests = data.result;
      this.filteredRequests = this.requests; // Initialize filteredRequests
      this.extractUniqueServices(); // Extract unique services
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

  modifyRequest(request: any) {
    this.addRequest(request);
    console.log("comaplint ADDED IN accpetrequests");
    this.deleteRequest(request);
  }

  addRequest(request: any) {
    var obj = new AcceptRequestDto(
      request.complaintID,
      request.service,
      request.category,
      request.date,
      request.customerId,
      this._auth.getJwtData().sub
    )
    console.log(request)
    console.log(obj)
    this._techService.postRequest(obj).subscribe(
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
    console.log("comaplint ADDED IN accpetrequests");

  }

  deleteRequest(request: any) {
    this._techService.deleteRequest(request.complaintID).subscribe(
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
    console.log("comaplint deleted");
  }

  // Extract unique services from the requests
  extractUniqueServices() {
    this.services = Array.from(new Set(this.requests.map(request => request.service)));
  }

  // Filter requests based on the selected service
  filterRequests() {
    if (this.selectedService === '') {
      this.filteredRequests = this.requests; // Show all requests when no service is selected
    } else {
      this.filteredRequests = this.requests.filter(request => request.service === this.selectedService);
    }
  }

}
