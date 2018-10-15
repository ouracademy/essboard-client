import { Injectable } from '@angular/core';
import { AreaMetadata, AlphaMetadata, ActivitySpaceMetadata } from '../../model/metadata/kernel';
import { StateMockService } from '../mock-states/index.service';
@Injectable()
export class PrimaryKernelMockService {
    areasSummary: AreaMetadata[] = [];
    _alphasSummary: AlphaMetadata[] = [];
    activitySpaces: ActivitySpaceMetadata[] = [];
    private customer = new AreaMetadata(
        'Cliente',
        'Persona,grupo, o organizacion que son afectados por el sistema de software',
        'customer', 2);
    private solution = new AreaMetadata(
        'Solucion',
        'Persona,grupo, o organizacion que son afectados por el sistema de software',
        'solution', 2);
    private endeavor = new AreaMetadata(
        'Esfuerzo',
        'Persona,grupo, o organizacion que son afectados por el sistema de software',
        'endeavor', 3);
    constructor(public stateMockService: StateMockService) {
        this.registerAreas();
        this.registerAlphas();
        this.registerSpacesActivity();
    }
    getAreasSummary() {
        return this.areasSummary;
    }
    registerAreas() {
        this.areasSummary.push(this.customer);
        this.areasSummary.push(this.solution);
        this.areasSummary.push(this.endeavor);
    }
    getCustomer() { return this.customer; }
    getSolution() { return this.solution; }
    getEndeavor() { return this.endeavor; }
    getAreaComplete(name: string) {
        let area = this.areasSummary.find(ar => ar.name === name);
        for (let alpha of area.dimensions) {
            for(let state of this.getStatesForAlpha(alpha) ){
                alpha.addState(state);
            }
        }
        area.activitypaces = this.activitySpaces.filter(ac => ac.area === area);
        return area;
    }
    getAlphasForArea(area) {
        return this._alphasSummary.filter(a => a.area === area);
    }
    getAlphaComplete(alpha) {
        alpha.states = this.stateMockService.getStateForAlpha(alpha.identifier);
        return alpha;
    }
    get alphasSummary(){
        return this._alphasSummary;
    }
    getStatesForAlpha(alpha){
        return this.stateMockService.getStateForAlpha(alpha.identifier);
    }
    registerAlphas() {
        const a1 = new AlphaMetadata(1, this.customer, '', 'Interesado', [], null, null);
        const a2 = new AlphaMetadata(2, this.customer, '', 'Oportunidad', [], null, null);
        const a3 = new AlphaMetadata(3, this.solution, '', 'Requerimientos', [], null, null);
        const a4 = new AlphaMetadata(4, this.solution, '', 'Sistema de Software', [], null, null);
        const a5 = new AlphaMetadata(5, this.endeavor, '', 'Equipo', [], null, null);
        const a6 = new AlphaMetadata(6, this.endeavor, '', 'Trabajo', [], null, null);
        const a7 = new AlphaMetadata(7, this.endeavor, '', 'Forma de trabajo', [], null, null);
        this.addToAlphas([a1, a2, a3, a4, a5, a6, a7]);
    }
    addToAlphas(alphas) {
        this._alphasSummary = alphas;
    }
    registerSpacesActivity() {
        //customer
        this.registerSpaceActivity("1-1", this.customer, 'Explore posibilities', ['Enable the right stakeholders to be involved', 'Understand the stakeholders’ needs',
            'Identify opportunities for the use of the software system',
            'Understand why the software system is needed',
            'Establish the value offered by the software system'], [], [11, 23]);
        this.registerSpaceActivity("1-2", this.customer, 'Understand Stakeholder Needs',
            ['Ensure the right solution is created', 'Collect feedback and generate input',
                'Ensure that the solution produced provides benefit to the stakeholders',
                'Align expectations'], [11, 23], [14, 24]);
        this.registerSpaceActivity("1-3", this.customer, 'Ensure Stakeholder Satisfaction', [],
            [14, 24], [15, 25]);
        this.registerSpaceActivity("1-4", this.customer, 'Use the system', [],
            [15, 25], [16, 26]);
        //solution
        this.registerSpaceActivity("2-1", this.solution, 'Understand the requeriments', [], [], [33]);
        this.registerSpaceActivity("2-2", this.solution, 'Shape the system', [], [33], [34, 41]);
        this.registerSpaceActivity("2-3", this.solution, 'Implement the system', [], [41], [44]);
        this.registerSpaceActivity("2-4", this.solution, 'Test the system', [], [34, 41], [36, 44]);
        this.registerSpaceActivity("2-5", this.solution, 'Deploy the system', [], [44], [45]);
        this.registerSpaceActivity("2-6", this.solution, 'Operate the system', [], [45], [46]);
        //endeavor
        this.registerSpaceActivity("3-1", this.endeavor, 'Prepare do to work', [], [], [51, 62, 72]);
        this.registerSpaceActivity("3-2", this.endeavor, 'Coordinate activity', [], [51, 62], [52, 64]);
        this.registerSpaceActivity("3-3", this.endeavor, 'Support the team', [], [52, 63], [53, 74]);
        this.registerSpaceActivity("3-4", this.endeavor, 'Track progress', [], [53, 63, 74], [54, 65, 75]);
        this.registerSpaceActivity("3-5", this.endeavor, 'Stop the work', [], [54, 65, 75], [55, 66, 76]);



    }
    registerSpaceActivity(code, area, name, objectives: string[], statesEntry: any[], statesCompletion: any[]) {
        let activitySpace = new ActivitySpaceMetadata(code, area, name, '');
        activitySpace.setObjectives(objectives);
        for (let ïdentifier of statesCompletion) {
            activitySpace.addCompletionCriteria(this.stateMockService.getState(ïdentifier));
        }
        for (let identifier of statesEntry) {
            activitySpace.addEntryCriteria(this.stateMockService.getState(identifier));

        }
        this.activitySpaces.push(activitySpace);
    }

}