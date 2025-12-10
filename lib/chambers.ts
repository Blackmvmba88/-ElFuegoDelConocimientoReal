import { Chamber } from '@/types';

export const chambers: Chamber[] = [
  // Grados 1-10: Cámara del Silencio
  {
    id: 'grade-1',
    grade: 1,
    name: 'Aprendiz',
    element: 'Silencio',
    description: 'El inicio del camino, donde el silencio revela las primeras verdades.',
    unlocked: true,
  },
  {
    id: 'grade-3',
    grade: 3,
    name: 'Maestro',
    element: 'Silencio',
    description: 'Dominio de los fundamentos, preparación para el conocimiento superior.',
    unlocked: true,
  },
  // Grados 11-20: Cámara de la Luz
  {
    id: 'grade-11',
    grade: 11,
    name: 'Sublime Caballero Elegido',
    element: 'Luz',
    description: 'La luz comienza a iluminar los misterios ocultos.',
    unlocked: false,
    requiredVibration: 50,
  },
  {
    id: 'grade-18',
    grade: 18,
    name: 'Caballero Rosa Cruz',
    element: 'Luz',
    description: 'La rosa y la cruz se unen en el conocimiento hermético.',
    unlocked: false,
    requiredVibration: 70,
  },
  // Grados 21-27: Cámara del Fuego
  {
    id: 'grade-21',
    grade: 21,
    name: 'Patriarca Noaquita',
    element: 'Fuego',
    description: 'El fuego transmuta la materia en espíritu.',
    unlocked: false,
    requiredVibration: 80,
  },
  // Grados 28-30: Cámara del Aire
  {
    id: 'grade-30',
    grade: 30,
    name: 'Caballero Kadosh',
    element: 'Aire',
    description: 'El aire eleva el espíritu a las alturas del conocimiento.',
    unlocked: false,
    requiredVibration: 90,
  },
  // Grados 31-33: Cámara del Éter
  {
    id: 'grade-33',
    grade: 33,
    name: 'Soberano Gran Inspector General',
    element: 'Éter',
    description: 'El éter conecta todas las dimensiones del conocimiento universal.',
    unlocked: false,
    requiredVibration: 100,
  },
];

export function getChamberByGrade(grade: number): Chamber | undefined {
  return chambers.find(c => c.grade === grade);
}

export function getUnlockedChambers(): Chamber[] {
  return chambers.filter(c => c.unlocked);
}

export function getChambersByElement(element: Chamber['element']): Chamber[] {
  return chambers.filter(c => c.element === element);
}
