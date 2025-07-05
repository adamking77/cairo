export interface ContactInfo {
  name: string;
  email: string;
  company: string;
  role: string;
}

export interface AssessmentData {
  contact: ContactInfo;
  implementation: {
    background: string;
  };
  success: {
    type: string;
    elaboration: string;
  };
  surprises: string;
  organizationalChanges: {
    type: string;
    details: string;
  };
  patterns: string[];
  currentSituation: string;
  investmentLikelihood: {
    score: number;
    reasoning: string;
  };
  strategicQuestion: string;
}

export interface Question {
  id: string;
  type: 'text' | 'textarea' | 'select' | 'multiselect' | 'slider' | 'intro' | 'completion';
  title: string;
  subtitle?: string;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  required?: boolean;
  validation?: (value: any) => string | null;
  followUp?: {
    condition: (value: any) => boolean;
    question: Omit<Question, 'followUp'>;
  };
}

export interface QuestionStepProps {
  question: Question;
  value: any;
  onChange: (value: any) => void;
  onNext: () => void;
  onBack: () => void;
  canGoBack: boolean;
  canGoNext: boolean;
  isLoading?: boolean;
}