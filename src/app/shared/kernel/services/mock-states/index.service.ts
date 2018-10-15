import { Injectable } from '@angular/core';
import { StateMetadata } from '../../model/metadata/kernel';

@Injectable()
export class StateMockService {
    states: StateMetadata[] = [];
    constructor() {
        this.alpha1();
        this.alpha2();
        this.alpha3();
        this.alpha4();
        this.alpha5();
        this.alpha6();
        this.alpha7();
    }

    getState(identifier) {
        return this.states.find(state => state.identifier === identifier);
    }
    getIden(identifier) {
        let u = identifier % 10;
        let d = (identifier-u) / 10;
        return d;
    }
    getStateForAlpha(alphaIdentifier) {
        return this.states.filter(st => 
            this.getIden(st.identifier) === alphaIdentifier);
    }
    private addStatesToStates(states) {
        for (let state of states) {
            this.states.unshift(state);
        }
    }
    private alpha1() {
        let state16: StateMetadata = new StateMetadata('Satisfecho por el uso', 16, null, []);
        let state15: StateMetadata = new StateMetadata('Staisfecho por el despliegue', 15, state16, []);
        let state14: StateMetadata = new StateMetadata('De acuerdo', 14, state15, []);
        let state13: StateMetadata = new StateMetadata('Involucrado', 13, state14, []);
        let state12: StateMetadata = new StateMetadata('Representado', 12, state13, []);
        let state11: StateMetadata = new StateMetadata('Reconocido', 11, state12, []);
        this.addStatesToStates([state16, state15, state14, state13, state12, state11]);
    }
    private alpha2() {
        let state26: StateMetadata = new StateMetadata('Con beneficio acumulado', 26, null, []);
        let state25: StateMetadata = new StateMetadata('Tratado', 25, state26, []);
        let state24: StateMetadata = new StateMetadata('Viable', 24, state25, []);
        let state23: StateMetadata = new StateMetadata('Con valor establecido', 23, state24, []);
        let state22: StateMetadata = new StateMetadata('Con solucion requerida', 22, state23, []);
        let state21: StateMetadata = new StateMetadata('Identificada', 21, state22, []);
        this.addStatesToStates([state26, state25, state24, state23, state22, state21]);
    }
    private alpha3() {
        let state36: StateMetadata = new StateMetadata('Cumplido', 36, null, []);
        let state35: StateMetadata = new StateMetadata('Tratado', 35, state36, []);
        let state34: StateMetadata = new StateMetadata('Aceptable', 34, state35, []);
        let state33: StateMetadata = new StateMetadata('Coherente', 33, state34, []);
        let state32: StateMetadata = new StateMetadata('Acotado', 32, state33, []);
        let state31: StateMetadata = new StateMetadata('Concebido', 31, state32, []);
        this.addStatesToStates([state36, state35, state34, state33, state32, state31]);
    }
    private alpha4() {
        let state46: StateMetadata = new StateMetadata('Retirado', 46, null, []);
        let state45: StateMetadata = new StateMetadata('Operacional', 45, state46, []);
        let state44: StateMetadata = new StateMetadata('Listo', 44, state45, []);
        let state43: StateMetadata = new StateMetadata('Usable', 43, state44, []);
        let state42: StateMetadata = new StateMetadata('Demostrable', 42, state43, []);
        let state41: StateMetadata = new StateMetadata('Con arquitectura seleccionada', 41, state42, []);
        this.addStatesToStates([state46, state45, state44, state43, state42, state41]);
    }
    private alpha5() {
        let state55: StateMetadata = new StateMetadata('Suspendido', 55, null, []);
        let state54: StateMetadata = new StateMetadata('Ejecutando', 54, state55, []);
        let state53: StateMetadata = new StateMetadata('Colaborando', 53, state54, []);
        let state52: StateMetadata = new StateMetadata('Formado', 52, state53, []);
        let state51: StateMetadata = new StateMetadata('Sembrado', 51, state52, []);
        this.addStatesToStates([state55, state54, state53, state52, state51]);

    }
    private alpha6() {
        let state66: StateMetadata = new StateMetadata('Cerrado', 66, null, []);
        let state65: StateMetadata = new StateMetadata('Concluido', 65, state66, []);
        let state64: StateMetadata = new StateMetadata('Bajo control', 64, state65, []);
        let state63: StateMetadata = new StateMetadata('Comenzado', 63, state64, []);
        let state62: StateMetadata = new StateMetadata('Preparado', 62, state63, []);
        let state61: StateMetadata = new StateMetadata('Iniciado', 61, state62, []);
        this.addStatesToStates([state66, state65, state64, state63, state62, state61]);
    }
    private alpha7() {
        let state76: StateMetadata = new StateMetadata('Retirado', 76, null, []);
        let state75: StateMetadata = new StateMetadata('Trabajando bien', 75, state76, []);
        let state74: StateMetadata = new StateMetadata('En su lugar', 74, state75, []);
        let state73: StateMetadata = new StateMetadata('En uso', 73, state74, []);
        let state72: StateMetadata = new StateMetadata('Con bases establecidas', 72, state73, []);
        let state71: StateMetadata = new StateMetadata('Con principios establecidos', 71, state72, []);
        this.addStatesToStates([state76, state75, state74, state73, state72, state71]);
    }

}