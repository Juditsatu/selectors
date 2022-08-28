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

  regions: string[] = [];
  countries: CountrySmall[] = [];
  alphaCode: string = '';

  constructor( private fb: FormBuilder,
               private countryService: CountryServicesService ) { }

  ngOnInit(): void {

      this.regions = this.countryService.regions;

      //when the region changes
      this.form.get('region')?.valueChanges
        .pipe(
          tap((_) => { this.form.get('country')?.reset('') }),
          switchMap(region => this.countryService.getCountrByRegion(region))
        )
        .subscribe(countries => {
          this.countries = countries;
        })
       //when the country changes
       this.form.get('country')?.valueChanges
        .subscribe(code => {
          console.log(code)
        })
  }

  save() {
    
  }

}
