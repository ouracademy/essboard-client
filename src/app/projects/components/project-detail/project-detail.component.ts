import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Project, Session } from '../../../../shared/models/project';
import { ProjectService } from '../../services/project.service';
import { NotificationsService } from 'angular2-notifications';


@Component({
  selector: 'my-project-detail',
  templateUrl: 'project-detail.component.html',
  styleUrls: ['detail.component.css'],
})
export class ProjectDetailComponent implements OnInit, OnDestroy {
  project: Project;
  sessionsTiles: any[] = [];
  showShare: boolean = false;
  selectedSession: Session;
  private subscription: Subscription;
  dialogRef: MdDialogRef<ConfirmationDialog>;
  lastCloseResult: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProjectService,
    private notification: NotificationsService,
    public dialog: MdDialog) { }

  ngOnInit() {
    this.subscription = this.service.currentProject.subscribe((item: Project) => {
      this.project = item;
    });
    this.subscription = this.route.params.subscribe(params => {
      let id = this.route.snapshot.params['id'];
      this.service.getProject(id);
    });
 
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addSession() {
    if (this.project.canCreateNewSession()) {
      this.service.addSession();
    } else {
      this.onError('Aun no haz finalizado tu actual sesion de trabajo');
    }
  }
  share() {
    this.showShare = !this.showShare;
  }
  closeSharedForm(hide) {
    this.showShare = hide;
  }
  delete() {
    this.dialogRef = this.dialog.open(ConfirmationDialog, {
      disableClose: false
    });
    this.dialogRef.afterClosed().subscribe(result => {
      this.dialogRef = null;
    });

    //this.service.delete();
  }
  setName(name: string) {
    if (name) {
      this.service.setName(name);
    }
  }
  setDescription(description: string) {
    if (description) {
      this.service.setDescription(description);
    }
  }



  private onError(error: string) {
    this.notification.error('Upps!', error);
  }



}
@Component({
  selector: 'confirmation-dialog',
  template: `
  <p>¿Esta seguro que desea elimnar el proyecto?</p>
  <button type="button" (click)="dialogRef.close('yes')">Yes</button>
  <button type="button" (click)="dialogRef.close('no')">No</button>`
})
export class ConfirmationDialog {
  constructor(public dialogRef: MdDialogRef<ConfirmationDialog>) { }
}