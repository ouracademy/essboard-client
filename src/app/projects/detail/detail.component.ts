import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  isLoading = true
  project = { name:"",lastUpdate:""}
  sessions = []
  constructor(private currentRoute: ActivatedRoute) { }

  ngOnInit() {
    this.currentRoute.params.subscribe(param => {
      this.findProyectById(param["id"])
    })
  }
  
  findProyectById(id){
    this.isLoading = false
    this.project = { name:"Essboard", lastUpdate: 'Sat Apr 07 2018'}
    this.sessions = [
      { created: new Date(), isCurrent:false},
      { created: new Date(), isCurrent:true}]
  }
  create(){
    
  }
}
