


import {  StateMetadata,CheckpointMetadata } from '../kernel';

export const state16: StateMetadata = new StateMetadata('Satisfecho por el uso',16, null, []);
export const state15: StateMetadata = new StateMetadata('Staisfecho por el despliegue', 15, state16, []);
export const state14: StateMetadata = new StateMetadata('De acuerdo', 14, state15, []);
export const state13: StateMetadata = new StateMetadata('Involucrado', 13, state14, []);
export const state12: StateMetadata = new StateMetadata('Representado', 12, state13, []);
export const state11: StateMetadata = new StateMetadata('Reconocido', 11, state12, []);


export const checkpointsForState11: CheckpointMetadata[] = [
  {
    identifier: '1-1-1',
    name: 'Se identificaron los interesados',
    description: 'Se identificaron todos los diferentes grupos de interesados que son, o serán, afectados por el desarrollo y funcionamiento del sistema de software.',
    type: 'abbrev',
    state: state11,
  },
  {
    identifier: '1-1-2',
    name: 'Existe un acuerdo entre los grupos de interesados que se van a representar',
    description: 'Existe un acuerdo sobre los grupos de interés a ser representado. Como mínimo, se han considerado los grupos de interés que el financian, usan, dan soporte y mantenimiento al sistema.',
    type: 'abbrev',
    state: state11,
  },
  {
     identifier: '1-1-3',
    name: 'Se definieron las responsabilidades de los representantes de los interesados',
    description: 'Se han definido las responsabilidades de los representantes de los interesados.',
    type: 'abbrev',
    state: state11,
  }
];
export const checkpointsForState12: CheckpointMetadata[] = [
  {
     identifier: '1-2-1',
    name: 'Responsabilidades acordadas',
    description: 'Los representantes de los interesados han acordado en tomar sus responsabilidades.',
    type: 'abbrev',
    state: state12,
  },
  {
     identifier: '1-2-2',
    name: 'Representantes autorizados',
    description: 'Los representantes de los interesados estan autorizados para llevar a cabo sus responsabilidades.',
    type: 'abbrev',
    state: state12,
  },
  {
     identifier: '1-2-3',
    name: 'Forma de colaboración acordada',
    description: 'Se han acordado la forma de colaboracion entre los representantes de los interesados.',
    type: 'abbrev',
    state: state12,
  },
  {
     identifier: '1-2-4',
    name: 'Forma de trabajo soportada y respetada',
    description: 'Los representantes de los interesados apoyan y respetan la forma de trabajo del equipo.',
    type: 'abbrev',
    state: state12,
  }];
export const checkpointsForState13: CheckpointMetadata[] = [
  {
     identifier: '1-3-1',
    name: 'Representantes de los interesados asisten al equipos',
    description: 'Los representantes de los interesados asisten al equipo conforme a sus responsabilidades.',
    type: 'abbrev',
    state: state13,
  },
  {
     identifier: '1-3-2',
    name: 'Representantes de los interesados agregan retroalimentacion y participan en decisiones temporales.',
    description: 'Los representantes de los interesados proveen retroalimentacion y toman parte en la toma de decisiones de una manera oportuna.',
    type: 'abbrev',
    state: state13,
  },
  {
     identifier: '1-3-3',
    name: 'Representantes de los interesados se comunican con el grupo de interesados.',
    description: 'Los representantes de los interesados comunican cambios que son relevantes para su grupo.',
    type: 'abbrev',
    state: state13,
  }
];
export const checkpointsForState14: CheckpointMetadata[] = [
  {
     identifier: '1-4-1',
    name: 'Representantes de los interesados acordaron las expectativas minimas.',
    description: 'Los representantes de los interesados acordaron sobre sus expectativas minimas sobre el siguiente despliegue del nuevo sistema',
    type: 'abbrev',
    state: state14,
  },

  {
     identifier: '1-4-2',
    name: 'Representantes de los interesados estan feliz con su participacion.',
    description: 'Los representantes de los interesados  estan felices por su partipacion en el trabajo.',
    type: 'complete',
    state: state14,
  },
  {
     identifier: '1-4-3',
    name: 'Entrada de los representantes de los interesados son valoradas.',
    description: 'Los representantes de los interesados acuerdan que su entrada es valorada por los representantes de los interesados y tratada con respeto ',
    type: 'abbrev',
    state: state14,
  },
  {
     identifier: '1-4-4',
    name: 'Entrada del equipo es valorado y respetado.',
    description: 'Los miembros del equipo acuerdan que su entrada es valorada por los representantes de los interesados y tratada con respeto',
    type: 'complete',
    state: state14,
  },
  {
     identifier: '1-4-5',
    name: 'Prioridades claras y perspectivas balanceadas.',
    description: 'Los representantes de los interesados acuerdan como sus diferentes prioridades y perspectivas han sido balanceados para proveer una clara direccion al equipo',
    type: 'abbrev',
    state: state14,
  }];
export const checkpointsForState15: CheckpointMetadata[] = [
  {
     identifier: '1-5-1',
    name: 'Interesadaos proveen retroalimentacion.',
    description: 'Los representantes de los interesados proveen retroalimentacion del sistema desde la perspectivas de su grupo de interesados',
    type: 'abbrev',
    state: state15,
  },
  {
     identifier: '1-5-2',
    name: 'El sistema esta listo para el despiegue.',
    description: 'Los representantes de los interesados confirman que el sistema esta listo para el despliegue.',
    type: 'abbrev',
    state: state15,
  }];
export const checkpointsForState16: CheckpointMetadata[] = [
  {
     identifier: '1-6-1',
    name: 'Retroalimentacion del uso del sistema es disponible',
    description: 'Los interesados estan usando el nuevo sistema y proveen retroalimentacion de sus experiencias',
    type: 'abbrev',
    state: state16,
  },
  {
     identifier: '1-6-2',
    name: 'El sistema cumple con las alternativass',
    description: 'Los interesados confirman que el nuevo sistema cumple con las expectativas.',
    type: 'abbrev',
    state: state16,
  }
];
state11.checkList = checkpointsForState11;
state12.checkList = checkpointsForState12;
state13.checkList = checkpointsForState13;
state14.checkList = checkpointsForState14;
state15.checkList = checkpointsForState15;
state16.checkList = checkpointsForState16;
