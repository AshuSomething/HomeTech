import { Component, OnInit } from '@angular/core';
import { UserDto } from 'src/app/Models/userDto';
import { AuthService } from 'src/app/Services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateUsertDto } from 'src/app/Models/updateUserDto';
import { updateRequestDto } from 'src/app/Models/updateRequestDto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  ngOnInit(): void {
    this.obj = this._auth.getJwtData();
    this.user.Email = this.obj.email;
    this.user.Name = this.obj.name;
    this.user.Role = this.obj.role;
    this.user.Id = this.obj.sub;
    this.user.PhoneNumber = this.obj.certserialnumber;
    console.log(this.user);

    this.updateDetails.email = this.obj.email;
    this.updateDetails.userName = this.obj.name;
    this.updateDetails.phoneNumber = this.obj.certserialnumber;
  }

  constructor(private _auth: AuthService, private _router: Router, private _route: ActivatedRoute) { }

  user = new UserDto();
  obj: any;
  updateDetails = new UpdateUsertDto();

  navigateToUpdateUserComponent(request: any) {
    this._router.navigate(['/updateUser'], {
      queryParams: { request: JSON.stringify(request) }
    });
  }
}
