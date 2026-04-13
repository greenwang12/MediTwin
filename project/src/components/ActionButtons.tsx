import { PlayCircle, Zap, RotateCcw } from 'lucide-react';
import { ViewMode } from '../types';

interface ActionButtonsProps {
  viewMode: ViewMode;
  isExplaining: boolean;
  onStartExplanation: () => void;
  onSimplify: () => void;
  onReset: () => void;
}

export default function ActionButtons({
  viewMode,
  isExplaining,
  onStartExplanation,
  onSimplify,
  onReset,
}: ActionButtonsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={onStartExplanation}
        disabled={isExplaining}
        className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-medium text-sm transition-all ${
          isExplaining
            ? 'bg-sky-50 text-sky-400 border border-sky-100 cursor-not-allowed'
            : 'bg-sky-600 text-white hover:bg-sky-700 shadow-sm hover:shadow-md active:scale-95'
        }`}
      >
        <PlayCircle className="w-4 h-4" />
        {isExplaining ? 'Explanation Active' : 'Start Explanation'}
      </button>

      <button
        onClick={onSimplify}
        className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-medium text-sm transition-all border ${
          viewMode === 'simplified'
            ? 'bg-amber-500 text-white border-amber-500 shadow-sm hover:bg-amber-600 active:scale-95'
            : 'bg-white text-gray-700 border-gray-200 hover:border-amber-300 hover:text-amber-600 hover:bg-amber-50 active:scale-95'
        }`}
      >
        <Zap className="w-4 h-4" />
        {viewMode === 'simplified' ? 'Simplified View' : 'Simplify'}
      </button>

      {isExplaining && (
        <button
          onClick={onReset}
          className="flex items-center gap-2.5 px-5 py-3 rounded-xl font-medium text-sm border border-gray-200 text-gray-600 bg-white hover:bg-gray-50 transition-all active:scale-95"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      )}
    </div>
  );
}
