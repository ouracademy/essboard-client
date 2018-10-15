import { Practice } from '../kernel';
export const scrum = new Practice("Scrum","Practica para gestionar un proyecto");
scrum.addActivity("Envisionamiento del producto",["1-1","1-2"]);
scrum.addActivity("Planeamiento de entregas",["2-1","3-1"]);
scrum.addActivity("Planeamiento de sprint",["2-1","3-2"]);
scrum.addActivity("Reunion diaria",["3-3","3-4"]);
scrum.addActivity("Revision del sprint",["2-4","1-1","3-4"]);
scrum.addActivity("Retrospectiva del sprint",["3-4"]);
export const PRACTICES: Practice[] = [
   scrum
];