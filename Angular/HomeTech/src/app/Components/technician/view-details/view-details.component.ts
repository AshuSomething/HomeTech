import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private _techService: TechnicianService
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

}
