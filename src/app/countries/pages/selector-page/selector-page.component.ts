import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
;
import { switchMap, tap } from 'rxjs/operators';

import { CountryServicesService } from '../../services/country-services.service';
import { CountrySmall } from '../../interface/country.interface';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {

  form: FormGroup = this.fb.group({
    region:   ['', Validators.required],
    country:  ['', Validators.required],
    border:   ['', Validators.required]
  })

  //selectors
  regions: string[] = [];
  countries: CountrySmall[] = [];
  borders: string[] = [];

  //UI
  loading: boolean = false;

  constructor( private fb: FormBuilder,
               private countryService: CountryServicesService ) { }

  ngOnInit(): void {

      this.regions = this.countryService.regions;

      //when the region changes
      this.form.get('region')?.valueChanges
        .pipe(
          tap( () => { 
            this.form.get('country')?.reset('');
            this.loading = true;
          }),
          switchMap(region => this.countryService.getCountrByRegion(region))
        )
        .subscribe(countries => {
          this.countries = countries;
          this.loading = false;
        })
       //when the country changes
       this.form.get('country')?.valueChanges
        .pipe(
          tap( () => {
            this.borders = [];
            this.form.get('border')?.reset('');
            this.loading = true;
          }),
          switchMap(code => this.countryService.getCountryAlpha(code))
        )
        .subscribe(country => {
          if (!country) {
            this.loading = false;
            return;
          } else {
            this.borders = country[0].borders;
            console.log(this.borders);
            this.loading = false;
          }
        })
  }

  save() {
    
  }

}
