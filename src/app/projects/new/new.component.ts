import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  form: FormGroup

  constructor(private fb: FormBuilder, private router:Router) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [null, Validators.required],
      description: '',
      visibility: [null, Validators.required], // o isPublic?
    })
  }
  
  create() {
    const id = 'some-super-id-created-after-go-to-server'
    console.log('Creado :P', this.form.value)
    // , { relativeTo: this.route }
    this.router.navigate(['/projects/see',id ])
  }
}
