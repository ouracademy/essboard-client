


import {  StateMetadata,CheckpointMetadata } from '../kernel';


export const state46: StateMetadata = new StateMetadata('Retirado', 46, null, []);
export const state45: StateMetadata = new StateMetadata('Operacional', 45, state46, []);
export const state44: StateMetadata = new StateMetadata('Listo', 44, state45, []);
export const state43: StateMetadata = new StateMetadata('Usable', 43, state44, []);
export const state42: StateMetadata = new StateMetadata('Demostrable', 42, state43, []);
export const state41: StateMetadata = new StateMetadata('Con arquitectura seleccionada', 41, state42, []);

export const checkpointsForState41: CheckpointMetadata[] = [
  {
     identifier: '4-1-1',
    name: 'Se selecciono la arquitectura que trata los riesgos tecnicos clave',
    description: 'Los interesados confirman que el nuevo sistema cumple con las expectativas.',
    type: 'abbrev',
    state: state41
  }, {
     identifier: '4-1-2',
    name: 'Se acordaron los criterios para seleccionar la arquitectura',
    description: 'Los interesados confirman que el nuevo sistema cumple con las expectativas.',
    type: 'abbrev',
    state: state41
  },
  {
     identifier: '4-1-3',
    name: 'Se seleccionaron las plataformas,tecnologias y lenguajes',
    description: 'Las prioridades son claras.',
    type: 'abbrev',
    state: state41
  },
  {
     identifier: '4-1-4',
    name: 'Se tomaron las decisiones de compra,construccion y reuso',
    description: 'La solucion que satisface los interesados trata la oportunidad.',
    type: 'abbrev',
    state: state41
  }
];
export const checkpointsForState42: CheckpointMetadata[] = [
  {
     identifier: '4-2-1',
    name: 'Se demostraron las caracteristicas clave de la arquitectura',
    description: 'Los interesados confirman que el nuevo sistema cumple con las expectativas.',
    type: 'abbrev',
    state: state42
  }, {
     identifier: '4-2-2',
    name: 'Los interesados relevantes acordaron que la arquitectura es apropiada',
    description: 'Los interesados confirman que el nuevo sistema cumple con las expectativas.',
    type: 'abbrev',
    state: state42
  },
  {
     identifier: '4-2-3',
    name: 'Se ejercieron la interfaz critica y las confiuraciones del sistema',
    description: 'Las prioridades son claras.',
    type: 'abbrev',
    state: state42
  }
];
state41.checkList = checkpointsForState41;
state42.checkList = checkpointsForState42;
