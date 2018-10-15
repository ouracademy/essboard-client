


import {  StateMetadata,CheckpointMetadata } from '../kernel';

export const state55: StateMetadata = new StateMetadata('Suspendido', 55, null, []);
export const state54: StateMetadata = new StateMetadata('Ejecutando', 54, state55, []);
export const state53: StateMetadata = new StateMetadata('Colaborando', 53, state54, []);
export const state52: StateMetadata = new StateMetadata('Formado', 52, state53, []);
export const state51: StateMetadata = new StateMetadata('Sembrado', 51, state52, []);

export const checkpointsForState51: CheckpointMetadata[] = [
  {
     identifier: '5-1-1',
    name: 'La mision del equipo es clara',
    description: 'Los interesados confirman que el nuevo sistema cumple con las expectativas.',
    type: 'abbrev',
    state: state51
  }, {
     identifier: '5-1-2',
    name: 'El equipo sabe como crecer para lograr su mision',
    description: 'Los interesados confirman que el nuevo sistema cumple con las expectativas.',
    type: 'abbrev',
    state: state51
  },
  {
     identifier: '5-1-3',
    name: 'Se identificaron las competencias requeridas',
    description: 'Las prioridades son claras.',
    type: 'abbrev',
    state: state51
  },
  {
     identifier: '5-1-4',
    name: 'Se identifico el tamaño del equipo',
    description: 'La solucion que satisface los interesados trata la oportunidad.',
    type: 'abbrev',
    state: state51
  }
];
export const checkpointsForState52: CheckpointMetadata[] = [
  {
     identifier: '5-2-1',
    name: 'El equipo tiene suficientes recursos para iniciar la mision',
    description: 'Los interesados confirman que el nuevo sistema cumple con las expectativas.',
    type: 'abbrev',
    state: state52
  }, {
     identifier: '5-2-2',
    name: 'Se comprendieron la organizacion del equipo y las responsabilidades individuales',
    description: 'Los interesados confirman que el nuevo sistema cumple con las expectativas.',
    type: 'abbrev',
    state: state52
  },
  {
     identifier: '5-2-3',
    name: 'Los miembros saben como ejecutar el trabajo',
    description: 'Las prioridades son claras.',
    type: 'abbrev',
    state: state52
  }
];
state51.checkList = checkpointsForState51;
state52.checkList = checkpointsForState52;
