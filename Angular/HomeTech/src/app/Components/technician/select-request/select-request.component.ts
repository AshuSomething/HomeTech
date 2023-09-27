import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  ngOnInit(): void {
    // Initialization logic goes here
    this._techService.getRequests().subscribe((data: any) =>
      this.requests = data.result
      //console.log(data.result)
    )
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

}
