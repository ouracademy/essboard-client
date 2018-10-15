


import {  StateMetadata,CheckpointMetadata } from '../kernel';

export const state66: StateMetadata = new StateMetadata('Cerrado', 66, null, []);
export const state65: StateMetadata = new StateMetadata('Concluido', 65, state66, []);
export const state64: StateMetadata = new StateMetadata('Bajo control', 64, state65, []);
export const state63: StateMetadata = new StateMetadata('Comenzado', 63, state64, []);
export const state62: StateMetadata = new StateMetadata('Preparado', 62, state63, []);
export const state61: StateMetadata = new StateMetadata('Iniciado', 61, state62, []);


export const checkpointsForState61: CheckpointMetadata[] = [
  {
     identifier: '6-2-1',
    name: 'Se conoce el iniciador del trabajo',
    description: 'Los interesados confirman que el nuevo sistema cumple con las expectativas.',
    type: 'abbrev',
    state: state61
  }, {
     identifier: '6-1-2',
    name: 'Se aclaran las restricciones del trabajo',
    description: 'Los interesados confirman que el nuevo sistema cumple con las expectativas.',
    type: 'abbrev',
    state: state61
  },
  {
     identifier: '6-1-3',
    name: 'Se aclaran el patrocinio y el modelo de financiacion',
    description: 'Las prioridades son claras.',
    type: 'abbrev',
    state: state61
  },
  {
     identifier: '6-1-4',
    name: 'Se aclara la prioridad del trabajo',
    description: 'La solucion que satisface los interesados trata la oportunidad.',
    type: 'abbrev',
    state: state61
  }

];
export const checkpointsForState62: CheckpointMetadata[] = [
  {
     identifier: '6-2-1',
    name: 'Se estimaron el costo y el esfuerzo',
    description: 'Los interesados confirman que el nuevo sistema cumple con las expectativas.',
    type: 'abbrev',
    state: state62
  }, {
     identifier: '6-2-2',
    name: 'La financiacion y los recursos trabajan en su lugar',
    description: 'Los interesados confirman que el nuevo sistema cumple con las expectativas.',
    type: 'abbrev',
    state: state62
  },
  {
     identifier: '6-2-3',
    name: 'Se comprendieron los criterios de aceptacion',
    description: 'Las prioridades son claras.',
    type: 'abbrev',
    state: state62
  },
  {
     identifier: '6-2-4',
    name: 'Se acordaron los procedimientos del gobierno',
    description: 'La solucion que satisface los interesados trata la oportunidad.',
    type: 'abbrev',
    state: state62
  }
  ,
  {
     identifier: '6-2-5',
    name: 'Se comprendio la exposicion al riesgo',
    description: 'La solucion que satisface los interesados trata la oportunidad.',
    type: 'abbrev',
    state: state62
  }
  ,
  {
     identifier: '6-2-6',
    name: 'Se aclararon las dependencias',
    description: 'La solucion que satisface los interesados trata la oportunidad.',
    type: 'abbrev',
    state: state62
  }

];
export const checkpointsForState63: CheckpointMetadata[] = [
  {
     identifier: '6-3-1',
    name: 'Se comenzo el trabajo de desarrollo',
    description: 'Los interesados confirman que el nuevo sistema cumple con las expectativas.',
    type: 'abbrev',
    state: state63
  }, {
     identifier: '6-3-2',
    name: 'Se monitoreo el proces de desarrollo',
    description: 'Los interesados confirman que el nuevo sistema cumple con las expectativas.',
    type: 'abbrev',
    state: state63
  },
  {
     identifier: '6-3-3',
    name: 'Se hizo la division en items accionables con una clara definicion',
    description: 'Las prioridades son claras.',
    type: 'abbrev',
    state: state63
  },
  {
     identifier: '6-3-4',
    name: 'Los miembros del equipo estan aceptando y progresando en los items de trabajo',
    description: 'La solucion que satisface los interesados trata la oportunidad.',
    type: 'abbrev',
    state: state63
  }

];
state61.checkList = checkpointsForState61;
state62.checkList = checkpointsForState62;
state63.checkList = checkpointsForState63;
