import { Injectable } from '@angular/core';
import { Practice, Activity } from '../../model/metadata/kernel';
import { ActivitySpaceMockService } from '../mock-activity-spaces/index.service';

@Injectable()
export class PracticeMockService {
    practices: any[] = [];
    constructor(public activitySpaceMockService: ActivitySpaceMockService) {
        this.registerObjects();
    }
    all(){
        return this.practices;
    }
    registerObjects() {
        //here all object about practices
        this.registerObject("Scrum", "Practica para gestionar un proyecto",
            [
                { "name": "Envisionamiento del producto", "spaceIdentifier": ["1-1", "1-2"] },
                { "name": "Planeamiento de entregas", "spaceIdentifier": ["2-1", "3-1"] },
                { "name": "Planeamiento de sprint", "spaceIdentifier": ["2-1", "3-2"] },
                { "name": "Reunion diaria", "spaceIdentifier": ["3-3", "3-4"] },
                { "name": "Revision del sprint", "spaceIdentifier": ["2-4", "1-1", "3-4"] },
                { "name": "Retrospectiva del sprint", "spaceIdentifier": ["3-4"] },
            ]);
    }
    registerObject(name, description, activities: any[]) {
        let practice = new Practice(name, description);
        for (let activity of activities) {
            let act = new Activity(activity.name);
            for (let spaceIdentifier of activity.spaceIdentifier) {
                let spaceActivity = this.activitySpaceMockService.findByIdentifier(spaceIdentifier);
                act.addStateAchaived(spaceActivity);
            }
            practice.addActivity(act);
        }
        this.practices.push(practice);
    }
}