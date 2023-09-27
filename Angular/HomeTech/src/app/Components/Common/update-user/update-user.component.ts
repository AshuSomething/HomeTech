import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UpdateUsertDto } from 'src/app/Models/updateUserDto';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private _auth: AuthService) { }
  ngOnInit(): void {
    // Initialization logic goes here
    // this.requestQueryParam = this._route.snapshot.queryParamMap.get('request');
    // this.Model.Service = this.requestQueryParam['service'];

    this._route.queryParams.subscribe(params => {
      if (params['request']) {
        var obj = JSON.parse(params['request']);

        this.updateDetails.email = obj.email;
        this.updateDetails.phoneNumber = obj.phoneNumber;
        this.updateDetails.userName = obj.userName;
        console.log(obj);
        console.log(JSON.parse(params['request']));
      }
    });
  }

  updateDetails = new UpdateUsertDto();

  updateRequest() {
    console.log(this.updateDetails);
    this._auth.updateUser(this.updateDetails).subscribe(
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
