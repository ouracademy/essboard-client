
import { AreaMetadata } from './kernel';
export const customer = new AreaMetadata(
  'Cliente',
  'Persona,grupo, o organizacion que son afectados por el sistema de software',
  'customer',2);
export const solution = new AreaMetadata(
  'Solucion',
  'Persona,grupo, o organizacion que son afectados por el sistema de software',
  'solution',2);
export const endeavor = new AreaMetadata(
  'Esfuerzo',
  'Persona,grupo, o organizacion que son afectados por el sistema de software',
  'endeavor',3);

 export const  AREAS = [ customer,solution,endeavor];