'use client';

import { Chamber } from '@/types';

interface ChamberCardProps {
  chamber: Chamber;
  onClick?: () => void;
}

const elementColors = {
  Silencio: 'from-gray-600 to-gray-800',
  Luz: 'from-yellow-400 to-yellow-600',
  Fuego: 'from-orange-500 to-red-600',
  Aire: 'from-blue-400 to-cyan-500',
  Éter: 'from-purple-500 to-indigo-600',
};

const elementIcons = {
  Silencio: '🤫',
  Luz: '💡',
  Fuego: '🔥',
  Aire: '🌬️',
  Éter: '✨',
};

export default function ChamberCard({ chamber, onClick }: ChamberCardProps) {
  return (
    <div
      onClick={chamber.unlocked ? onClick : undefined}
      className={`
        relative p-6 rounded-xl border-2 
        ${chamber.unlocked 
          ? 'cursor-pointer hover:scale-105 border-flame-primary dark:border-flame-secondary' 
          : 'opacity-50 cursor-not-allowed border-gray-400 dark:border-gray-600'
        }
        transition-all duration-300
        bg-white dark:bg-shadow-light
        ${chamber.unlocked ? 'hover:shadow-lg hover:shadow-flame-primary/50' : ''}
      `}
    >
      {!chamber.unlocked && (
        <div className="absolute top-2 right-2">
          <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}

      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${elementColors[chamber.element]} mb-4`}>
        <span className="text-3xl">{elementIcons[chamber.element]}</span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Grado {chamber.grade}
          </span>
          <span className="text-xs px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
            {chamber.element}
          </span>
        </div>

        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          {chamber.name}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-400">
          {chamber.description}
        </p>

        {!chamber.unlocked && chamber.requiredVibration && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-500">
              Vibración requerida: {chamber.requiredVibration}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
