


import {  StateMetadata,CheckpointMetadata } from '../kernel';



export const state36: StateMetadata = new StateMetadata('Cumplido', 36, null, []);
export const state35: StateMetadata = new StateMetadata('Tratado', 35, state36, []);
export const state34: StateMetadata = new StateMetadata('Aceptable', 34, state35, []);
export const state33: StateMetadata = new StateMetadata('Coherente', 33, state34, []);
export const state32: StateMetadata = new StateMetadata('Acotado', 32, state33, []);
export const state31: StateMetadata = new StateMetadata('Concebido', 31, state32, []);

export const checkpointsForState31: CheckpointMetadata[] = [
  {
     identifier: '3-1-1',
    name: 'La necesidad de un nuevo sistema es clara',
    description: 'Los interesados confirman que el nuevo sistema cumple con las expectativas.',
    type: 'abbrev',
    state: state31
  }, {
     identifier: '3-1-2',
    name: 'Se identificaron los usuarios',
    description: 'Los interesados confirman que el nuevo sistema cumple con las expectativas.',
    type: 'abbrev',
    state: state31
  },
  {
     identifier: '3-1-3',
    name: 'Se identificaron los promotores iniciales',
    description: 'Los interesados acuerdan el despliegue de valor.',
    type: 'abbrev',
    state: state31
  }
];
export const checkpointsForState32: CheckpointMetadata[] = [
  {
     identifier: '3-2-1',
    name: 'Se acordaron el proposito y la extension del sistema',
    description: 'Los interesados confirman que el nuevo sistema cumple con las expectativas.',
    type: 'abbrev',
    state: state32
  }, {
     identifier: '3-2-2',
    name: 'Los criterios de exito son claros',
    description: 'Los interesados confirman que el nuevo sistema cumple con las expectativas.',
    type: 'abbrev',
    state: state32
  },
  {
     identifier: '3-2-3',
    name: '',
    description: 'Se acordaron los mecanismos para manejar los requisitos.',
    type: 'abbrev',
    state: state32
  },
  {
     identifier: '3-2-4',
    name: 'Se identiificaron las restricciones y suposiciones',
    description: 'La solucion que satisface los interesados trata la oportunidad.',
    type: 'abbrev',
    state: state32
  }
];
export const checkpointsForState33: CheckpointMetadata[] = [
  {
     identifier: '3-3-1',
    name: 'La vision general es clara y la comparten todos los involucrados',
    description: 'Los interesados confirman que el nuevo sistema cumple con las expectativas.',
    type: 'abbrev',
    state: state33
  }, {
     identifier: '3-3-2',
    name: 'Se explicaron importantes escenarios de uso',
    description: 'Los interesados confirman que el nuevo sistema cumple con las expectativas.',
    type: 'abbrev',
    state: state33
  },
  {
     identifier: '3-3-3',
    name: '',
    description: 'Las prioridades son claras.',
    type: 'abbrev',
    state: state33
  },
  {
     identifier: '3-3-4',
    name: 'Se trataron los conflictos',
    description: 'La solucion que satisface los interesados trata la oportunidad.',
    type: 'abbrev',
    state: state33
  },
  {
     identifier: '3-3-5',
    name: 'Se comprende el impacto',
    description: 'La solucion que satisface los interesados trata la oportunidad.',
    type: 'abbrev',
    state: state33
  }
];
state31.checkList = checkpointsForState31;
state32.checkList = checkpointsForState32;
state33.checkList = checkpointsForState33;







