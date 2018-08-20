import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from '../../../../../shared/models/project';

@Component({
  selector: 'tiles-sessions',
  templateUrl: 'index.component.html'
})
export class TilesSessionsComponent implements OnInit, OnChanges {
  @Input() sessions: Session[];
  fixedCols = 4;
  fixedRowHeight = 100;
  sessionsTiles: any[] = [];

  constructor(private router: Router) { }

  ngOnInit() {
    this.convertToTiles(this.sessions);
  }
  ngOnChanges() {
    this.convertToTiles(this.sessions);
  }

  private convertToTiles(sessions: Session[]) {
    this.sessionsTiles = [];
    if (sessions.length !== 0) {
      this.addSessionToView(sessions[0], 'lightblue', 3);
      for (let i = 1; i < sessions.length; i++) {
        this.addSessionToView(sessions[i], 'lightgreen', 1);
      }
    }
  }

  private addSessionToView(data, color, cols) {
    this.sessionsTiles.push({ data: data, cols: cols, rows: 1, color: color });
  }

  goSession(session) {
    this.router.navigate(['/me/sessions', session.data.id]);
  }

}
