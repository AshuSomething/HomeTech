import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './Components/Auth/register/register.component';
import { LoginComponent } from './Components/Auth/login/login.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { AuthGuard } from './Gaurds/auth.guard';
import { CreateRequestComponent } from './Components/create-request/create-request.component';
import { UpdateRequestComponent } from './Components/update-request/update-request.component';
import { CoustmerGuard } from './Gaurds/coustmer.guard';
import { MyRequestsComponent } from './Components/Common/my-requests/my-requests.component';
import { HomeComponent } from './Components/Common/home/home.component';
import { UpdateUserComponent } from './Components/Common/update-user/update-user.component';
import { SelectRequestComponent } from './Components/technician/select-request/select-request.component';
import { TechnicianGaurd } from './Gaurds/technician.guard';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'myRequests', component: MyRequestsComponent, canActivate: [AuthGuard] },
  { path: 'updateUser', component: UpdateUserComponent, canActivate: [AuthGuard] },
  { path: 'createRequest', component: CreateRequestComponent, canActivate: [CoustmerGuard] },
  { path: 'updateRequest', component: UpdateRequestComponent, canActivate: [CoustmerGuard] },
  { path: "selectRequest", component: SelectRequestComponent, canActivate: [TechnicianGaurd] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
