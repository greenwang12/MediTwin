import { XCircle, CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react';
import { Disease, ViewMode } from '../types';

interface ComparisonPanelProps {
  disease: Disease;
  viewMode: ViewMode;
}

export default function ComparisonPanel({ disease, viewMode }: ComparisonPanelProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 pt-5 pb-4 border-b border-gray-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-slate-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Untreated vs Treated</h3>
            <p className="text-xs text-gray-400">Outcome comparison</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-50">
        <div className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <XCircle className="w-4 h-4 text-red-500" />
            <h4 className="text-sm font-semibold text-red-700">Without Treatment</h4>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                Short-term effects
              </p>
              <ul className="space-y-1.5">
                {disease.untreated.shortTerm.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0 mt-1.5" />
                    <span className={`text-gray-700 leading-snug ${viewMode === 'simplified' ? 'text-sm' : 'text-xs'}`}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                Long-term consequences
              </p>
              <ul className="space-y-1.5">
                {disease.untreated.longTerm.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0 mt-1.5" />
                    <span className={`text-gray-700 leading-snug ${viewMode === 'simplified' ? 'text-sm' : 'text-xs'}`}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-red-50 border border-red-100 rounded-xl p-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className={`text-red-700 leading-snug ${viewMode === 'simplified' ? 'text-sm' : 'text-xs'}`}>
                  {disease.untreated.progression}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <h4 className="text-sm font-semibold text-emerald-700">With Treatment</h4>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                Treatment approach
              </p>
              <p className={`text-gray-700 leading-relaxed ${viewMode === 'simplified' ? 'text-sm' : 'text-xs'}`}>
                {disease.treated.approach}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                Expected outcomes
              </p>
              <ul className="space-y-1.5">
                {disease.treated.outcomes.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0 mt-1.5" />
                    <span className={`text-gray-700 leading-snug ${viewMode === 'simplified' ? 'text-sm' : 'text-xs'}`}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <p className={`text-emerald-700 leading-snug ${viewMode === 'simplified' ? 'text-sm' : 'text-xs'}`}>
                  {disease.treated.prognosis}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
