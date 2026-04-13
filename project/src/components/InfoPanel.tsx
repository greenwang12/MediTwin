import { Brain, Zap } from 'lucide-react';
import { Disease, ViewMode } from '../types';

interface InfoPanelProps {
  disease: Disease;
  viewMode: ViewMode;
}

export default function InfoPanel({ disease, viewMode }: InfoPanelProps) {
  const content =
    viewMode === 'simplified'
      ? disease.whatIsHappeningSimplified
      : disease.whatIsHappening;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 pt-5 pb-4 border-b border-gray-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center">
            <Brain className="w-4 h-4 text-sky-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">What Is Happening</h3>
            <p className="text-xs text-gray-400">Pathophysiology overview</p>
          </div>
          {viewMode === 'simplified' && (
            <span className="ml-auto flex items-center gap-1 text-xs font-medium text-amber-600 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-full">
              <Zap className="w-3 h-3" />
              Simplified
            </span>
          )}
        </div>
      </div>

      <div className="p-5">
        <p
          className={`leading-relaxed text-gray-700 ${
            viewMode === 'simplified' ? 'text-base' : 'text-sm'
          }`}
        >
          {content}
        </p>
      </div>
    </div>
  );
}
