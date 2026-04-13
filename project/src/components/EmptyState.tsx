import { Stethoscope, ArrowDown } from 'lucide-react';

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-sky-50 flex items-center justify-center mb-5">
        <Stethoscope className="w-8 h-8 text-sky-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Select a Condition to Begin</h3>
      <p className="text-sm text-gray-400 max-w-sm leading-relaxed mb-6">
        Choose a disease or condition from the selector above. The digital twin will generate
        a complete clinical explanation and outcome comparison.
      </p>
      <div className="flex items-center gap-1.5 text-xs text-gray-300">
        <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        <span>8 conditions available</span>
      </div>
    </div>
  );
}
