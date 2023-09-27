import { Component, OnInit } from '@angular/core';
import { UserDto } from 'src/app/Models/UserDto';
import { AuthService } from 'src/app/Services/auth.service';

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
  }

  constructor(private _auth: AuthService) { }

  user = new UserDto();
  obj: any;
}
