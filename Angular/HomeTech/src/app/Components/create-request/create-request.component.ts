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
    const tomorrow = new Date(currentDate);
    tomorrow.setDate(currentDate.getDate() + 1);

    const oneMonthLater = new Date(currentDate);
    oneMonthLater.setMonth(currentDate.getMonth() + 1);

    this.minDate = tomorrow;
    this.maxDate = oneMonthLater;


  }

  minDate: Date;
  maxDate: Date;




  Model = new CreateRequestDto(this._auth.getJwtData().sub);
  serviceOptions: string[] = [
    'Carpenter',
    'Plumber',
    'Electrician',
    // Add more options as needed
  ];


  serviceCategories: Record<string, string[]> = {
    'Carpenter': ['Category 1', 'Category 2'],
    'Plumber': ['Category 3', 'Category 4'],
    'Electrician': ['Category 5', 'Category 6'],
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
    console.log(this.selectedDate);
    console.log(this.selectedTime);
    if (this.selectedDate && this.selectedTime) {
      const selectedDateTime = new Date(this.selectedDate);

      const timeParts = this.selectedTime.split(':');
      selectedDateTime.setHours(Number(timeParts[0]));
      this.Model.Time = selectedDateTime.toISOString();
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
