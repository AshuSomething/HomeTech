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

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'myRequests', component: MyRequestsComponent, canActivate: [AuthGuard] },
  { path: 'createRequest', component: CreateRequestComponent, canActivate: [CoustmerGuard] },
  { path: 'updateRequest', component: UpdateRequestComponent, canActivate: [CoustmerGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
