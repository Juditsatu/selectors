import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {

  form: FormGroup = this.fb.group({
    region: ['', Validators.required]
  })

  save() {
    
  }
  constructor( private fb: FormBuilder ) { }

  ngOnInit(): void {
  }

}
