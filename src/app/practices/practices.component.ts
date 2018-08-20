import { Component, OnInit } from '@angular/core';
import { PrimaryKernelMockService } from '../../shared/modules/kernel/services/index';
@Component({
  selector: 'practices',
  templateUrl: './practices.component.html',
  styleUrls: ['./practices.component.css']
})
export class PracticesComponent implements OnInit {

  areas: any = [];
  areaChoosen : any = null;
  constructor( public areaService:PrimaryKernelMockService) { }

  ngOnInit() {
    this.areas = this.areaService.getAreasSummary();
    this.areaChoosen = this.areaService.getAreaComplete("Cliente");
  }
  getAreChoosen(value){
    this.areaChoosen = this.areaService.getAreaComplete(value);
  }


}
