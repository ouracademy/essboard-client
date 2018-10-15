import {CompetencyMetadata,CompetencyLevel } from '../kernel';
import {customer,solution,endeavor} from "../mock-areas";


export const level1: CompetencyLevel = new CompetencyLevel(1,'Asistente', 'Demuestra una basica comprension de los conceptops y puede seguir instrucciones', null);
export const level2: CompetencyLevel = new CompetencyLevel(2,'Aplicante', 'Capaz de aplicar conceptos en contextos simples mediante la aplicacion rutinaria de la experiencia ganada',level1);
export const level3: CompetencyLevel = new CompetencyLevel(3,'Maestro','Capaz de aplicar los conceptos en muchos contextos y tiene la experiencia de trabajar sin supervision ',level2);
export const level4: CompetencyLevel = new CompetencyLevel(4,'Adaptador','Capaz de aplicar juicios sobre cuando,como aplicar los conceptos en contextos complejos.Puede habilitar a otros a plicar los conceptos',level3);
export const level5: CompetencyLevel = new CompetencyLevel(5,'Innovador','Un experto reconocido capaz de extender los conceptos a nuevos contextos e inspirar a otros',level4);
export const COMPETENCESLEVEL : CompetencyLevel[]=[level1,level2,level3,level4,level5];
export const competence1 : CompetencyMetadata = new CompetencyMetadata('Representacion del interesado','Encapsula la habilidad de obtener,comunicar y balancear las necesidades de los interesados y representar de forma precsa sus vistas ',customer,'');
export const competence2 : CompetencyMetadata = new CompetencyMetadata('Analisis','Encapsula la habilidad de comprender oportunidades y sus relaciones con las necesidades del interesado ,y transformarlos en requerimientos consistentes y convenientes',solution,'');
export const competence3 : CompetencyMetadata = new CompetencyMetadata('Desarrollo','Encapsula la habilidad de diseñar y programar efectivos sistemas de software siguiendo los estandares y normas acordadas por el equipo ',solution,'');
export const competence4 : CompetencyMetadata = new CompetencyMetadata('Pruebas','Encapsula la habilidad de probar el sistema, verificando que este sea usable y que cumple con los requerimientos ',solution,'');
export const competence5 : CompetencyMetadata = new CompetencyMetadata('Liderazgo','Encapsula la habilidad de inspirar y motivar a un grupo de personas a lograr un exitoso conclusion de su trabajo y lograr sus objetivos',endeavor,'');
export const competence6 : CompetencyMetadata = new CompetencyMetadata('Gestion','Encapsula la capacidad de coordinar,planear y rastrear el trabajo',endeavor,'');