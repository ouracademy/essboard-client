import { Injectable } from '@angular/core';
import { NgxAlertsService } from '@ngx-plus/ngx-alerts'
 
@Injectable()
export class SharedService{
  constructor( private alertService: NgxAlertsService){

  }

  showError(title, text){
    this.alertService.alertError({ title, text } )
  }
  showSucces(title, text){
    this.alertService.alertSuccess({ title, text } )
  }

}
