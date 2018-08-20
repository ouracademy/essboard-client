import { Component, Input, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { DialogService } from '../../services/dialog.service';
import { Subscription } from 'rxjs/Subscription';
import { Comment } from '../../model/comment';
@Component({
    selector: 'comments',
    templateUrl: 'index.component.html',
    styleUrls: ['index.component.css'],
})
export class DialogComponent implements OnInit {
    @ViewChild('scrollMe') private myScrollContainer: ElementRef;

    @Input() sessionId;
    show = false;
    comments: Comment[] = [];
    message: string = '';
    private subscription: Subscription;
    constructor(private dialogService: DialogService) {
    }

    ngAfterViewChecked() {
        this.scrollToBottom();
    }

    scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch (err) { }
    }
    ngOnInit() {
        this.subscription = this.dialogService.items.subscribe((comments) => {
            this.comments = comments;
        });
        this.dialogService.getComments(this.sessionId);
        this.scrollToBottom();
    }

    showWindow() {
        this.show = !this.show;
    }
    save() {
        this.dialogService.add(this.message, this.sessionId);
        this.message = '';
    }



}
