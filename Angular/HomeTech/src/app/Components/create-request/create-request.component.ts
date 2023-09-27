import { Component, OnInit } from '@angular/core';
import { CreateRequestDto } from 'src/app/Models/createRequestDto';
import { AuthService } from 'src/app/Services/auth.service';
import { CustomerService } from 'src/app/Services/customer.service';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.css']
})
export class CreateRequestComponent {
  selectedDate: any;
  selectedTime: any;

  constructor(private _auth: AuthService, private _customeService: CustomerService) {
    // Set the minimum to January 1st 20 years in the past and December 31st a year in the future.

    const currentDate = new Date();
    // console.log("currentDate=" + currentDate);
    const tomorrow = new Date(currentDate);
    // console.log("tommorrow1=" + currentDate);

    tomorrow.setDate(currentDate.getDate() + 1);
    // console.log("tommorrow2=" + tomorrow);
    const oneMonthLater = new Date(currentDate);
    oneMonthLater.setMonth(currentDate.getMonth() + 1);
    console.log(oneMonthLater);

    this.minDate = tomorrow;
    this.maxDate = oneMonthLater;


  }

  minDate: Date;
  maxDate: Date;




  Model = new CreateRequestDto(this._auth.getJwtData().sub);
  serviceOptions: string[] = [
    'Plumbing',
    'Gutter Cleaning',
    'Siding Repairs',
    'Roofing Repairs'
    // Add more options as needed
  ];


  serviceCategories: Record<string, string[]> = {
    'Plumbing': ['Residential Plumber', 'Service and reapir Plumber'],
    'Gutter Cleaning': ['Gutter'],
    "Siding Repairs": ['Shingles', 'Drop siding'],
    'Roofing Repairs': ['Emergency repairs', 'Preventative repairs', 'Corrective repairs']
    // Add more mappings as needed
  };

  updateCategoryOptions(): void {
    const selectedService = this.Model.Service as string;
    this.categoryOptions = this.serviceCategories[selectedService] || [];
    this.Model.Category = ''; // Reset the selected Category
  };

  categoryOptions: string[] = [];

  timeOptions: string[] = [
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '1:00 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
    '5:00 PM',
    '6:00 PM'
  ];

  createRequest() {
    if (this.selectedDate && this.selectedTime) {
      const selectedDateTime = new Date(this.selectedDate);
      const timeParts = this.selectedTime.split(':');
      selectedDateTime.setHours(Number(timeParts[0]));
      console.log(selectedDateTime)
      this.Model.Date = selectedDateTime.toISOString();
      this._customeService.createRequest(this.Model).subscribe(
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
  }
}
