// src/app/FrontOffice/add-company-info-dialog/add-company-info-dialog.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { countries } from './country-data-store';

@Component({
  selector: 'app-add-company-info-dialog',
  templateUrl: './add-company-info-dialog.component.html',
  styleUrls: ['./add-company-info-dialog.component.css']
})
export class AddCompanyInfoDialogComponent implements OnInit {
  companyInfoForm: FormGroup;
  public countries = countries;
  filteredCountries = countries;
  searchTerm: string = '';

  sectors = [
    'Educational services',
    'Finance and insurance',
    'Health care and social assistance',
    'Information',
    'Management of companies and enterprises',
    'Manufacturing',
    'Mining, quarrying, and oil and gas extraction',
    'Other services',
    'Professional, scientific, and technical services',
    'Public administration',
    'Real estate and rental and leasing',
    'Retail trade',
    'Transportation and warehousing',
    'Utilities'
  ];
    industries = ['Software', 'Biotech', 'Banking', 'E-Learning', 'E-Commerce'];
  currencies = ['USD - Dollars', 'EUR - Euros', 'TND - Dinars'];

  constructor(
    public dialogRef: MatDialogRef<AddCompanyInfoDialogComponent>,
    private formBuilder: FormBuilder
  ) {
    this.companyInfoForm = this.formBuilder.group({
      revenue: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      currency: ['USD - Dollars', Validators.required],
      headquarters: ['', Validators.required],
      sector: ['', Validators.required],
      industry: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  getErrorMessage(controlName: string): string {
    const control = this.companyInfoForm.get(controlName);
    if (control?.hasError('required')) {
      return 'This field is required';
    }
    if (control?.hasError('pattern')) {
      return 'Only numeric values are allowed';
    }
    return '';
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.companyInfoForm.valid) {
      const companyInfo = this.companyInfoForm.value;
      this.dialogRef.close(companyInfo);
    }
  }

  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value.toLowerCase();
    this.filteredCountries = this.countries.filter(country =>
      country.name.toLowerCase().includes(this.searchTerm)
    );
  }
}