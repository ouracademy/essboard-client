import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Project } from '../../../../../shared/models/project';
import { ProjectService } from '../../../services/project.service';

@Component({
    selector: 'project-share-form',
    templateUrl: 'shared-form.component.html'
})
export class SharedFormComponent implements OnInit {
    @Output() onCloseForm = new EventEmitter<boolean>();
    @Input() project: Project;
    public invitedsEmail: any;
    public message: String;
    public inviteds: any;
    constructor(private projectService: ProjectService) { }
    ngOnInit() {
        this.inviteds = this.project.members;
        this.invitedsEmail = null;
        this.message = "";
    }
    send() {
        if (this.existsInUsers(this.invitedsEmail)) {
            this.inviteds.push(this.invitedsEmail);

        } else {
            this.message = "Ups . No encontramos este correo";
        }

    }
    existsInUsers(email) {
        return true;
    }
    close() {
        this.onCloseForm.emit(false);
    }
    getSelect(user) {
        if (!this.project.haveThisMember(user)) {
            this.inviteTo(user);
        }
    }
    inviteTo(user) {
        this.projectService.inviteTo(this.project,user);
        this.inviteds.push(user);
    }
    delete(invited) {
        this.projectService.desinviteTo(invited);
    }
}