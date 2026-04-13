import { useEffect, useState } from 'react';
import { Loader2, Volume2 } from 'lucide-react';
import { Disease, ViewMode } from '../types';

interface ExplanationPanelProps {
  disease: Disease;
  viewMode: ViewMode;
}

interface Step {
  label: string;
  detail: string;
}

function buildSteps(disease: Disease, mode: ViewMode): Step[] {
  if (mode === 'simplified') {
    return [
      {
        label: 'What starts it',
        detail: disease.whatIsHappeningSimplified.split('.')[0] + '.',
      },
      {
        label: 'What happens next',
        detail: 'Your body tries to fight back, but without treatment, it cannot stop the damage on its own.',
      },
      {
        label: 'Which parts are affected',
        detail: `The main systems involved are: ${disease.affectedSystems.join(', ')}.`,
      },
      {
        label: 'What you might feel',
        detail: disease.untreated.shortTerm[0] + (disease.untreated.shortTerm[1] ? ` and ${disease.untreated.shortTerm[1].toLowerCase()}.` : '.'),
      },
      {
        label: 'How treatment helps',
        detail: disease.treated.outcomes[0] + '.',
      },
    ];
  }

  return [
    {
      label: 'Initial Trigger',
      detail: disease.whatIsHappening.split('.')[0] + '.',
    },
    {
      label: 'Pathological Cascade',
      detail: "Homeostatic mechanisms attempt compensation, but maladaptive remodeling perpetuates the underlying pathology.",
    },
    {
      label: 'End-Organ Impact',
      detail: `Primary systems affected: ${disease.affectedSystems.join(', ')}.`,
    },
    {
      label: 'Clinical Presentation',
      detail: disease.untreated.shortTerm.slice(0, 2).join('; ') + '.',
    },
    {
      label: 'Therapeutic Intervention',
      detail: disease.treated.approach.split('.')[0] + '.',
    },
  ];
}

export default function ExplanationPanel({ disease, viewMode }: ExplanationPanelProps) {
  const steps = buildSteps(disease, viewMode);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    setVisibleCount(0);
    const timer = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev >= steps.length) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 850);
    return () => clearInterval(timer);
  }, [disease.id, viewMode, steps.length]);

  const isLoading = visibleCount < steps.length;

  return (
    <div className="bg-white rounded-2xl border border-sky-100 shadow-sm overflow-hidden">
      <div className="px-5 pt-5 pb-4 border-b border-sky-50 bg-gradient-to-r from-sky-50/60 to-white">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center">
            <Volume2 className="w-4 h-4 text-sky-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Step-by-Step Explanation</h3>
            <p className="text-xs text-gray-400">{disease.name}</p>
          </div>
          {isLoading && (
            <div className="ml-auto flex items-center gap-1.5 text-xs text-sky-500 font-medium">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              Generating...
            </div>
          )}
          {!isLoading && (
            <span className="ml-auto text-xs text-emerald-600 font-medium bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">
              Complete
            </span>
          )}
        </div>
      </div>

      <div className="p-5">
        <div className="relative">
          <div className="absolute left-3 top-0 bottom-0 w-px bg-gray-100" />
          <div className="space-y-4">
            {steps.slice(0, visibleCount).map((step, i) => (
              <div
                key={i}
                className="flex items-start gap-4"
                style={{ animation: 'fadeSlideIn 0.4s ease-out both' }}
              >
                <div className="relative z-10 w-7 h-7 rounded-full bg-sky-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 shadow-sm">
                  {i + 1}
                </div>
                <div className="pt-0.5 pb-1">
                  <p className="text-xs font-semibold text-sky-700 mb-0.5">{step.label}</p>
                  <p className={`text-gray-700 leading-relaxed ${viewMode === 'simplified' ? 'text-sm' : 'text-xs'}`}>
                    {step.detail}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-4">
                <div className="relative z-10 w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <div className="flex gap-0.5">
                    <span className="w-1 h-1 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1 h-1 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1 h-1 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
                <p className="text-xs text-gray-400">Loading next step...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
