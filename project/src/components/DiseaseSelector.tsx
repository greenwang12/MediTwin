import { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, X, Tag } from 'lucide-react';
import { Disease } from '../types';
import { diseases, categories, severityConfig } from '../data/diseases';

interface DiseaseSelectorProps {
  selected: Disease | null;
  onSelect: (disease: Disease | null) => void;
}

export default function DiseaseSelector({ selected, onSelect }: DiseaseSelectorProps) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = diseases.filter((d) => {
    const matchesQuery =
      query === '' ||
      d.name.toLowerCase().includes(query.toLowerCase()) ||
      d.category.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = activeCategory === 'All' || d.category === activeCategory;
    return matchesQuery && matchesCategory;
  });

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleSelect(disease: Disease) {
    onSelect(disease);
    setQuery('');
    setOpen(false);
  }

  function handleClear() {
    onSelect(null);
    setQuery('');
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center gap-2 mb-4">
        <Tag className="w-4 h-4 text-sky-500" />
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
          Disease Selection
        </h2>
      </div>

      <div ref={containerRef} className="relative">
        <div
          className={`flex items-center gap-3 border rounded-xl px-4 py-3 cursor-text transition-all ${
            open ? 'border-sky-400 ring-2 ring-sky-50' : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => setOpen(true)}
        >
          <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <input
            className="flex-1 text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent"
            placeholder="Search conditions, diseases..."
            value={selected && !open ? selected.name : query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
          />
          {selected ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
              className="p-0.5 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <ChevronDown
              className={`w-4 h-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
            />
          )}
        </div>

        {open && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-40 overflow-hidden">
            <div className="flex gap-1.5 p-2 border-b border-gray-50 overflow-x-auto scrollbar-hide">
              {['All', ...categories].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                    activeCategory === cat
                      ? 'bg-sky-600 text-white'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="max-h-64 overflow-y-auto">
              {filtered.length === 0 ? (
                <div className="px-4 py-6 text-center text-sm text-gray-400">
                  No conditions found
                </div>
              ) : (
                filtered.map((disease) => {
                  const sev = severityConfig[disease.severity];
                  return (
                    <button
                      key={disease.id}
                      onClick={() => handleSelect(disease)}
                      className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors text-left group"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-900 group-hover:text-sky-700 transition-colors">
                          {disease.name}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">{disease.category}</p>
                      </div>
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${sev.bg} ${sev.color} border ${sev.border}`}
                      >
                        {sev.label}
                      </span>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>

      {selected && (
        <div className="mt-4 flex flex-wrap gap-2">
          {selected.affectedSystems.map((sys) => (
            <span
              key={sys}
              className="text-xs px-2.5 py-1 bg-slate-50 text-slate-600 border border-slate-100 rounded-full"
            >
              {sys}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
