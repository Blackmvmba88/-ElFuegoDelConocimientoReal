/**
 * Level System for El Fuego del Conocimiento Real
 * Defines user progression through the 33 masonic grades
 */

import { Grade } from '@/types';

export interface Level {
  grade: Grade;
  name: string;
  element: 'Silencio' | 'Luz' | 'Fuego' | 'Aire' | 'Éter';
  description: string;
  requiredVibration: number; // 0-100 scale
  isPublic: boolean; // True for Level 1 (guest access)
  features: LevelFeature[];
  content: LevelContent;
}

export interface LevelFeature {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

export interface LevelContent {
  texts: string[]; // IDs or titles of available texts
  lessons: string[];
  exercises: string[];
  visualizations: string[];
}

export interface UserProgress {
  currentGrade: Grade;
  vibrationLevel: number;
  completedLessons: string[];
  unlockedFeatures: string[];
  readTexts: string[];
}

/**
 * Level 1 - Public access for guest users
 */
export const LEVEL_1_PUBLIC: Level = {
  grade: 1,
  name: 'Aprendiz - Grado 1',
  element: 'Silencio',
  description: 'El primer paso en el camino del conocimiento. Acceso público a textos fundamentales.',
  requiredVibration: 0,
  isPublic: true,
  features: [
    {
      id: 'library-search',
      name: 'Búsqueda en Biblioteca',
      description: 'Buscar y explorar textos en el catálogo de Gutenberg',
      enabled: true,
    },
    {
      id: 'library-read',
      name: 'Lectura Básica',
      description: 'Leer textos introductorios seleccionados',
      enabled: true,
    },
    {
      id: 'theme-toggle',
      name: 'Temas Luz/Sombra',
      description: 'Cambiar entre modo día y noche',
      enabled: true,
    },
    {
      id: 'chamber-view',
      name: 'Ver Cámaras',
      description: 'Visualizar el sistema de grados (solo lectura)',
      enabled: true,
    },
  ],
  content: {
    texts: [
      'Introduction to Hermetic Philosophy',
      'Basic Alchemical Principles',
      'Foundations of Masonic Symbolism',
      'The Art of Memory',
    ],
    lessons: [
      'What is the Fire of Knowledge?',
      'Understanding the 33 Grades',
      'The Five Elemental Chambers',
      'Symbolic Language Basics',
    ],
    exercises: [
      'Read your first hermetic text',
      'Explore the chamber system',
      'Try both light and dark themes',
    ],
    visualizations: [
      'Chamber overview map',
    ],
  },
};

/**
 * Check if a user has access to a specific feature
 */
export function hasAccess(userProgress: UserProgress, featureId: string): boolean {
  // Guest users (grade 1) have access to public features only
  if (userProgress.currentGrade === 1) {
    const publicFeature = LEVEL_1_PUBLIC.features.find(f => f.id === featureId);
    return publicFeature?.enabled || false;
  }

  // Higher grades have access to their level features plus all lower levels
  // This will be expanded in future phases
  return userProgress.unlockedFeatures.includes(featureId);
}

/**
 * Calculate vibration level based on user activity
 */
export function calculateVibration(progress: UserProgress): number {
  let vibration = 0;

  // Base vibration from current grade
  vibration += progress.currentGrade * 3;

  // Bonus from completed lessons
  vibration += progress.completedLessons.length * 2;

  // Bonus from read texts
  vibration += progress.readTexts.length * 1;

  // Cap at 100
  return Math.min(vibration, 100);
}

/**
 * Check if user can unlock next grade
 */
export function canUnlockNextGrade(progress: UserProgress): boolean {
  const currentVibration = calculateVibration(progress);
  const nextGrade = (progress.currentGrade + 1) as Grade;
  
  if (nextGrade > 33) return false;

  // Each grade requires progressively more vibration
  const requiredVibration = nextGrade * 3;
  
  return currentVibration >= requiredVibration;
}

/**
 * Get user level configuration
 */
export function getUserLevel(grade: Grade): Level | null {
  // For now, only Level 1 is fully implemented
  if (grade === 1) {
    return LEVEL_1_PUBLIC;
  }

  // Placeholder for future levels
  // TODO: Implement levels 2-33 in Phase 2
  return null;
}

/**
 * Initialize guest user progress
 */
export function createGuestProgress(): UserProgress {
  return {
    currentGrade: 1,
    vibrationLevel: 0,
    completedLessons: [],
    unlockedFeatures: LEVEL_1_PUBLIC.features
      .filter(f => f.enabled)
      .map(f => f.id),
    readTexts: [],
  };
}

/**
 * Get next milestone for user
 */
export function getNextMilestone(progress: UserProgress): {
  description: string;
  progress: number; // 0-100
} {
  if (progress.currentGrade === 1) {
    const textsRead = progress.readTexts.length;
    const lessonsCompleted = progress.completedLessons.length;
    const totalRequired = 5; // Example: need 5 actions to progress

    const currentProgress = Math.min(textsRead + lessonsCompleted, totalRequired);
    const progressPercent = (currentProgress / totalRequired) * 100;

    return {
      description: `Complete ${totalRequired - currentProgress} more activities to unlock Grade 2`,
      progress: progressPercent,
    };
  }

  // Placeholder for higher grades
  return {
    description: 'Continue your journey through the chambers',
    progress: calculateVibration(progress),
  };
}
