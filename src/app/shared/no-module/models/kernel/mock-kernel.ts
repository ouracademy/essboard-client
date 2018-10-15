import { AreaMetadata, AlphaMetadata, CompetencyMetadata, CompetencyLevel } from './kernel';
import { customer, solution, endeavor } from './mock-areas';
import { state11, state12, state13, state14, state15, state16 } from './mock-alphas/mock-alpha1';
import { state21, state22, state23, state24, state25, state26 } from './mock-alphas/mock-alpha2';
import { state31, state32, state33, state34, state35, state36 } from './mock-alphas/mock-alpha3';
import { state41, state42, state43, state44, state45, state46 } from './mock-alphas/mock-alpha4';
import { state51, state52, state53, state54, state55 } from './mock-alphas/mock-alpha5';
import { state61, state62, state63, state64, state65, state66 } from './mock-alphas/mock-alpha6';
import { state71, state72, state73, state74, state75, state76 } from './mock-alphas/mock-alpha7';


const a1 = new AlphaMetadata(1, customer, '', 'Interesado', [], null, null);
const a2 = new AlphaMetadata(2, customer, '', 'Oportunidad', [], null, null);
const a3 = new AlphaMetadata(3, solution, '', 'Requerimientos', [], null, null);
const a4 = new AlphaMetadata(4, solution, '', 'Sistema de Software', [], null, null);
const a5 = new AlphaMetadata(5, endeavor, '', 'Equipo', [], null, null);
const a6 = new AlphaMetadata(6, endeavor, '', 'Trabajo', [], null, null);
const a7 = new AlphaMetadata(7, endeavor, '', 'Forma de trabajo', [], null, null);

const states1 = [state11, state12, state13, state14, state15, state16];
const states2 = [state21, state22, state23, state24, state25, state26];
const states3 = [state31, state32, state33, state34, state35, state36];
const states4 = [state41, state42, state43, state44, state45, state46];
const states5 = [state51, state52, state53, state54, state55];
const states6 = [state61, state62, state63, state64, state65, state66];
const states7 = [state71, state72, state73, state74, state75, state76];


for (let state of states1) { a1.addState(state); }
for (let state of states2) { a2.addState(state); }
for (let state of states3) { a3.addState(state); }
for (let state of states4) { a4.addState(state); }
for (let state of states5) { a5.addState(state); }
for (let state of states6) { a6.addState(state); }
for (let state of states7) { a7.addState(state); }

export const ALPHAS: AlphaMetadata[] = [
   a1, a2, a3, a4, a5, a6, a7
];
export const AREAS: AreaMetadata[] = [
  customer, solution, endeavor
];



export const level1: CompetencyLevel = new CompetencyLevel(1, 'Asistente', 'Demuestra una basica comprension de los conceptops y puede seguir instrucciones', null);
export const level2: CompetencyLevel = new CompetencyLevel(2, 'Aplicante', 'Capaz de aplicar conceptos en contextos simples mediante la aplicacion rutinaria de la experiencia ganada', level1);
export const level3: CompetencyLevel = new CompetencyLevel(3, 'Maestro', 'Capaz de aplicar los conceptos en muchos contextos y tiene la experiencia de trabajar sin supervision ', level2);
export const level4: CompetencyLevel = new CompetencyLevel(4, 'Adaptador', 'Capaz de aplicar juicios sobre cuando,como aplicar los conceptos en contextos complejos.Puede habilitar a otros a plicar los conceptos', level3);
export const level5: CompetencyLevel = new CompetencyLevel(5, 'Innovador', 'Un experto reconocido capaz de extender los conceptos a nuevos contextos e inspirar a otros', level4);
export const COMPETENCESLEVEL: CompetencyLevel[] = [level1, level2, level3, level4, level5];
export const competence1: CompetencyMetadata = new CompetencyMetadata('Representacion del interesado', 'Encapsula la habilidad de obtener,comunicar y balancear las necesidades de los interesados y representar de forma precsa sus vistas ', AREAS[0], '');
export const competence2: CompetencyMetadata = new CompetencyMetadata('Analisis', 'Encapsula la habilidad de comprender oportunidades y sus relaciones con las necesidades del interesado ,y transformarlos en requerimientos consistentes y convenientes', solution, '');
export const competence3: CompetencyMetadata = new CompetencyMetadata('Desarrollo', 'Encapsula la habilidad de diseñar y programar efectivos sistemas de software siguiendo los estandares y normas acordadas por el equipo ', solution, '');
export const competence4: CompetencyMetadata = new CompetencyMetadata('Pruebas', 'Encapsula la habilidad de probar el sistema, verificando que este sea usable y que cumple con los requerimientos ', solution, '');
export const competence5: CompetencyMetadata = new CompetencyMetadata('Liderazgo', 'Encapsula la habilidad de inspirar y motivar a un grupo de personas a lograr un exitoso conclusion de su trabajo y lograr sus objetivos', endeavor, '');
export const competence6: CompetencyMetadata = new CompetencyMetadata('Gestion', 'Encapsula la capacidad de coordinar,planear y rastrear el trabajo', endeavor, '');