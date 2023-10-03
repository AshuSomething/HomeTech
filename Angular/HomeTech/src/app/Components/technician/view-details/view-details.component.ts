import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AcceptRequestDto } from 'src/app/Models/AcceptRequestDto';
import { AuthService } from 'src/app/Services/auth.service';
import { TechnicianService } from 'src/app/Services/technician.service';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.css']
})
export class ViewDetailsComponent {
  complaintId: number = 0; // Provide a default value
  request: any;

  constructor(private route: ActivatedRoute,
    private _techService: TechnicianService,
    private _auth: AuthService,
    private _router: Router
  ) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const complaintIdParam = params.get('complaintId');
      if (complaintIdParam !== null) {
        this.complaintId = +complaintIdParam;
        // Now you have access to the complaintId, which is guaranteed to be a non-null string
      } else {
        // Handle the case where 'complaintId' is not present in the route parameters
      }
      console.log(this.complaintId);
      (this._techService.getComplaintfromComaplintAPI(this.complaintId)).subscribe((data: any) => {
        this.request = data.result;
        console.log(this.request);
      });
    })

  }

  modifyRequest(request: any) {
    this.addRequest(request);
    console.log("comaplint ADDED IN accpetrequests");
    this.deleteRequest(request);
    this._router.navigate(["../myRequests"])
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


}
