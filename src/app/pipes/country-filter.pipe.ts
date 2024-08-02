import { Pipe, PipeTransform } from '@angular/core';
import { Countries } from '../models/Country.model';

@Pipe({
  name: 'countryFilter'
})
export class CountryFilterPipe implements PipeTransform {
  transform(countries: Countries[], searchTerm: string): Countries[] {
    if (!countries || !searchTerm) {
      return countries;
    }
    return countries.filter(country =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a, b) => a.name.localeCompare(b.name));
  }
}
