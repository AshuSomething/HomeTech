import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComplaintDto } from 'src/app/Models/ComplaintDto';
import { AuthService } from 'src/app/Services/auth.service';
import { TechnicianService } from 'src/app/Services/technician.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  complaintId: number = 0; // Provide a default value
  request: any;

  constructor(private route: ActivatedRoute,
    private _techService: TechnicianService,
    public auth: AuthService,
    private _router: Router
  ) { }

  revokeRequest(request: any) {
    this.addRequestinC_API(request);
    this.deleteRequestfromAR_API(request);
    this._router.navigate(["../myRequests"])
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
    this.route.paramMap.subscribe(params => {
      const complaintIdParam = params.get('complaintId');
      if (complaintIdParam !== null) {
        this.complaintId = +complaintIdParam;
        // Now you have access to the complaintId, which is guaranteed to be a non-null string
      } else {
        // Handle the case where 'complaintId' is not present in the route parameters
      }
      console.log(this.complaintId);
      (this._techService.getComaplintfromAcceptRequestAPI(this.complaintId)).subscribe((data: any) => {
        this.request = data.result;
        console.log(this.request);
      });
    })

  }

}
