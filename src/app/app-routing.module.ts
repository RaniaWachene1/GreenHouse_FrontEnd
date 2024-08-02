import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './FrontOffice/home/home.component';
import { RegisterComponent } from './FrontOffice/register/register.component';
import { LoginComponent } from './FrontOffice/login/login.component';
import { LoadingComponent } from './FrontOffice/loading/loading.component';
import { AdminDashComponent } from './FrontOffice/admin-dash/admin-dash.component';
import { NotFoundComponent } from './FrontOffice/not-found/not-found.component';
import { DashboardComponent } from './FrontOffice/dashboard/dashboard.component';
import { ForgetPasswordComponent } from './FrontOffice/forget-password/forget-password.component';
import { VerifyEmailComponent } from './FrontOffice/verify-email/verify-email.component';
import { LocationsComponent } from './FrontOffice/Scope1/locations/locations.component';
import { NaturalGasComponent } from './FrontOffice/Scope1/natural-gas/natural-gas.component';
import { FootprintAnalyticsComponent } from './FrontOffice/Analytics/footprint-analytics/footprint-analytics.component';
import { ElectricityUsageComponent } from './FrontOffice/Scope2/electricity-usage/electricity-usage.component';
import { VehiclesComponent } from './FrontOffice/Scope1/vehicles/vehicles.component';
import { VehicleUsageComponent } from './FrontOffice/Scope1/vehicle-usage/vehicle-usage.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component:  RegisterComponent},
  { path: 'admin', component:  AdminDashComponent},
  { path: 'dashboard', component:  DashboardComponent},
  { path: 'verify-email', component:  VerifyEmailComponent},
  { path: 'locations', component:  LocationsComponent},
  { path: 'scope-one/natural-gas-consumption', component: NaturalGasComponent },
  { path: 'footprint-analytics', component: FootprintAnalyticsComponent },
  { path: 'scope-two/electricity-usage', component: ElectricityUsageComponent },
  { path: 'vehicles', component:  VehiclesComponent},
  { path: 'scope-one/vehicle-usage', component: VehicleUsageComponent },

  { path: '**', component:NotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
