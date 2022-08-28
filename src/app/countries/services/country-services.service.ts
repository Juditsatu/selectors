import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Country, CountrySmall } from '../interface/country.interface';

@Injectable({
  providedIn: 'root'
})
export class CountryServicesService {

  private _regions: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  private _baseUrl: string = 'https://restcountries.com/v3.1';

  get regions(): string[] {
    return [...this._regions];
  }

  constructor( private http: HttpClient ) { }

  getCountrByRegion( region: string ): Observable<CountrySmall[]> {
    const url = `${ this._baseUrl }/region/${ region }`;
    return this.http.get<CountrySmall[]>(url);
  }

  getCountryAlpha(code: string): Observable<Country | null> {

    if (!code) {
      return of(null)
    }

    const url = `${ this._baseUrl }/alpha/${ code }`
    return this.http.get<Country>(url);

  }
}
