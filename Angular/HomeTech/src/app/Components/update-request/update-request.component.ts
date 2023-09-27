import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { updateRequestDto } from 'src/app/Models/updateRequestDto';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/Services/customer.service';


@Component({
  selector: 'app-update-request', // Update the selector if needed
  templateUrl: './update-request.component.html', // Update the template URL
  styleUrls: ['./update-request.component.css'] // Update the styles if needed
})
export class UpdateRequestComponent implements OnInit {
  constructor(private _auth: AuthService, private _route: ActivatedRoute, private _customeService: CustomerService) {
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

    // this._route.queryParams.subscribe((params) => {
    //   console.log(params['request']);
    //   console.log("hii");
    // });
    //console.log(JSON.stringify(this._route.snapshot.queryParamMap.get('request')));


  }

  ngOnInit(): void {
    // Initialization logic goes here
    // this.requestQueryParam = this._route.snapshot.queryParamMap.get('request');
    // this.Model.Service = this.requestQueryParam['service'];

    this._route.queryParams.subscribe(params => {
      if (params['request']) {
        var obj = JSON.parse(params['request']);
        this.Model.Service = obj.service;
        this.updateCategoryOptions();
        this.Model.Category = obj.category;
        this.Model.ComplaintId = obj.complaintID;
        this.Model.CustomerId = obj.customerId;
        this.selectedDate = obj.date;
        this.selectedTime = this.convertToISTAndFormat(obj.date);
        console.log(JSON.parse(params['request']));
      }
    });

  }

  requestQueryParam: any;
  minDate: Date;
  maxDate: Date;
  request: any;
  selectedDate: any;
  selectedTime: any;
  Model = new updateRequestDto(this._auth.getJwtData().sub);

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

  updateCategoryOptions(): void {
    const selectedService = this.Model.Service as string;
    this.categoryOptions = this.serviceCategories[selectedService] || [];
    this.Model.Category = ''; // Reset the selected Category
  };
  categoryOptions: string[] = [];

  updateRequest() {
    if (this.selectedDate && this.selectedTime) {
      const selectedDateTime = new Date(this.selectedDate);
      const timeParts = this.selectedTime.split(':');
      selectedDateTime.setHours(Number(timeParts[0]));
      console.log(selectedDateTime)
      this.Model.Date = selectedDateTime.toISOString();


      this._customeService.updateRequest(this.Model).subscribe(
        (response) => {
          console.log('PUT request successful:', response);
          // Handle the response data here
        },
        (error) => {
          console.error('PUT request failed:', error);
          // Handle errors here
        }
      );
      console.log("request sent");
    }
  }

  convertToISTAndFormat(inputDateString: string): string {
    const inputDate = new Date(inputDateString);
    const istOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds (5 hours and 30 minutes)

    // Convert to IST
    const istDate = new Date(inputDate.getTime() + istOffset);

    // Get the hours and minutes in 12-hour format
    const hours = istDate.getHours();
    const minutes = istDate.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format

    // Format the time as "hh:mm AM/PM"
    const formattedTime = `${formattedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;

    return formattedTime;
  }
}

