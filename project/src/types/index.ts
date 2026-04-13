export interface Disease {
  id: string;
  name: string;
  category: string;
  whatIsHappening: string;
  whatIsHappeningSimplified: string;
  untreated: {
    shortTerm: string[];
    longTerm: string[];
    progression: string;
  };
  treated: {
    approach: string;
    outcomes: string[];
    prognosis: string;
  };
  severity: 'low' | 'medium' | 'high' | 'critical';
  affectedSystems: string[];
}

export type ViewMode = 'normal' | 'simplified';
export type ActiveTab = 'what' | 'comparison';
