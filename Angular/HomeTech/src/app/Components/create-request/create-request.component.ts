import { Component } from '@angular/core';
import { CreateRequestDto } from 'src/app/Models/createRequestDto';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.css']
})
export class CreateRequestComponent {

  constructor() {
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


  Model = new CreateRequestDto();
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

  createRequest() {
    this.Model.Time = this.Model.Time + new Date().toTimeString();
    console.log(this.Model);
  }
}
