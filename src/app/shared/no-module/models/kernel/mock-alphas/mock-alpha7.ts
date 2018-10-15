


import {  StateMetadata,CheckpointMetadata } from '../kernel';

export const state76: StateMetadata = new StateMetadata('Retirado', 76, null, []);
export const state75: StateMetadata = new StateMetadata('Trabajando bien', 75, state76, []);
export const state74: StateMetadata = new StateMetadata('En su lugar', 74, state75, []);
export const state73: StateMetadata = new StateMetadata('En uso', 73, state74, []);
export const state72: StateMetadata = new StateMetadata('Con bases establecidas', 72, state73, []);
export const state71: StateMetadata = new StateMetadata('Con principios establecidos', 71, state72, []);

export const checkpointsForState71: CheckpointMetadata[] = [
  {
     identifier: '7-1-1',
    name: 'Se establecieron los principios y restricciones',
    description: 'Los interesados confirman que el nuevo sistema cumple con las expectativas.',
    type: 'abbrev',
    state: state71
  }, {
     identifier: '7-1-2',
    name: 'Se comprometieron los principios y restricciones',
    description: 'Los interesados confirman que el nuevo sistema cumple con las expectativas.',
    type: 'abbrev',
    state: state71
  },
  {
     identifier: '7-1-3',
    name: 'Se acordaron las practicas y herramientas',
    description: 'Las prioridades son claras.',
    type: 'abbrev',
    state: state71
  },
  {
     identifier: '7-1-4',
    name: 'Se comprendio el contexto en que el equipo debe operar',
    description: 'La solucion que satisface los interesados trata la oportunidad.',
    type: 'abbrev',
    state: state71
  }
];
export const checkpointsForState72: CheckpointMetadata[] = [
  {
     identifier: '7-2-1',
    name: 'Practicas clave y herramientas listas',
    description: 'Los interesados confirman que el nuevo sistema cumple con las expectativas.',
    type: 'abbrev',
    state: state72
  }, {
     identifier: '7-2-2',
    name: 'Se analizaron y comprendieron las brechas entre practicas y herramientas',
    description: 'Los interesados confirman que el nuevo sistema cumple con las expectativas.',
    type: 'abbrev',
    state: state72
  },
  {
     identifier: '7-2-3',
    name: 'Se analizaron y comprendieron las brechas de capacidad',
    description: 'Las prioridades son claras.',
    type: 'abbrev',
    state: state72
  },
  {
     identifier: '7-2-4',
    name: 'Se integraron las practicas seleccionadas y las herramientas',
    description: 'La solucion que satisface los interesados trata la oportunidad.',
    type: 'abbrev',
    state: state72
  }
];
state71.checkList = checkpointsForState71;
state72.checkList = checkpointsForState72;
