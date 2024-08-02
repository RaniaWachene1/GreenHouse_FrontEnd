import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './FrontOffice/home/home.component';
import { RegisterComponent } from './FrontOffice/register/register.component';
import { LoginComponent } from './FrontOffice/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './FrontOffice/loading/loading.component';
import { AdminDashComponent } from './FrontOffice/admin-dash/admin-dash.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio'; // Import MatRadioModule
import { MatCardModule } from '@angular/material/card';


import { EditUserDialogComponent } from './FrontOffice/admin-dash/edit-user-dialog/edit-user-dialog.component';
import { CreateUserDialogComponent } from './FrontOffice/admin-dash/create-user-dialog/create-user-dialog.component';
import { NotFoundComponent } from './FrontOffice/not-found/not-found.component';
import { DashboardComponent } from './FrontOffice/dashboard/dashboard.component';
import { SidebarComponent } from './FrontOffice/sidebar/sidebar.component';
import { UserProfileDialogComponent } from './FrontOffice/user-profile-dialog/user-profile-dialog.component';
import { ForgetPasswordComponent } from './FrontOffice/forget-password/forget-password.component';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { AddCompanyInfoDialogComponent } from './FrontOffice/add-company-info-dialog/add-company-info-dialog.component';
import { CountryFilterPipe } from './pipes/country-filter.pipe';
import { VerifyEmailComponent } from './FrontOffice/verify-email/verify-email.component';
import { LocationsComponent } from './FrontOffice/Scope1/locations/locations.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { AddLocationDialogComponent } from './FrontOffice/Scope1/add-location-dialog/add-location-dialog.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LocationDetailDialogComponent } from './FrontOffice/Scope1/location-detail-dialog/location-detail-dialog.component';
import { TopbarComponent } from './FrontOffice/topbar/topbar.component';
import { DeleteConfirmDialogComponent } from './FrontOffice/delete-confirm-dialog/delete-confirm-dialog.component';
import { NaturalGasComponent } from './FrontOffice/Scope1/natural-gas/natural-gas.component';
import { NaturalGasModalComponent } from './FrontOffice/Scope1/natural-gas-modal/natural-gas-modal.component';
import { FootprintAnalyticsComponent } from './FrontOffice/Analytics/footprint-analytics/footprint-analytics.component';
import { ElectricityUsageComponent } from './FrontOffice/Scope2/electricity-usage/electricity-usage.component';
import { ElectricityUsageAddComponent } from './FrontOffice/Scope2/electricity-usage-add/electricity-usage-add.component';
import { VehiclesComponent } from './FrontOffice/Scope1/vehicles/vehicles.component';
import { VehiclesAddComponent } from './FrontOffice/Scope1/vehicles-add/vehicles-add.component';
import { VehicleUsageComponent } from './FrontOffice/Scope1/vehicle-usage/vehicle-usage.component';
import { EditVehicleComponent } from './FrontOffice/Scope1/edit-vehicle/edit-vehicle.component';
import { VehicleUsageModelComponent } from './FrontOffice/Scope1/vehicle-usage-model/vehicle-usage-model.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    LoadingComponent,
    AdminDashComponent,
    EditUserDialogComponent,
    CreateUserDialogComponent,
    NotFoundComponent,
    DashboardComponent,
    SidebarComponent,
    UserProfileDialogComponent,
    ForgetPasswordComponent,
    AddCompanyInfoDialogComponent,
    CountryFilterPipe,
    VerifyEmailComponent,
    LocationsComponent,
    AddLocationDialogComponent,
    LocationDetailDialogComponent,
    TopbarComponent,
    DeleteConfirmDialogComponent,
    NaturalGasComponent,
    NaturalGasModalComponent,
    FootprintAnalyticsComponent,
    ElectricityUsageComponent,
    ElectricityUsageAddComponent,
    VehiclesComponent,
    VehiclesAddComponent,
    VehicleUsageComponent,
    EditVehicleComponent,
    VehicleUsageModelComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatSelectCountryModule.forRoot('en'),
    HttpClientModule,
    GoogleMapsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatCardModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
