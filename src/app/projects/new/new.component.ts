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
      name: ['', Validators.required],
      description: '',
      visibility: ['', Validators.required], // o isPublic?
    })
  }
  
  create() {
    console.log('Creado :P', this.form.value)
    // ir al la ruta del proyect creado
    this.router.navigate('proyect','nameProyect')
  }
}
