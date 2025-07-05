import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { QuestionStep } from './QuestionStep';
import { questions } from './questions';
import { AssessmentData } from './types';
import { cn } from '@/lib/utils';

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AssessmentModal: React.FC<AssessmentModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [assessmentData, setAssessmentData] = useState<Partial<AssessmentData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Save to sessionStorage whenever data changes
  useEffect(() => {
    if (Object.keys(assessmentData).length > 0) {
      sessionStorage.setItem('assessmentData', JSON.stringify(assessmentData));
      sessionStorage.setItem('assessmentStep', currentStep.toString());
    }
  }, [assessmentData, currentStep]);

  // Load from sessionStorage on mount
  useEffect(() => {
    if (isOpen) {
      const savedData = sessionStorage.getItem('assessmentData');
      const savedStep = sessionStorage.getItem('assessmentStep');
      
      if (savedData) {
        try {
          setAssessmentData(JSON.parse(savedData));
        } catch (e) {
          console.error('Failed to parse saved assessment data');
        }
      }
      
      if (savedStep) {
        setCurrentStep(parseInt(savedStep, 10));
      }
    }
  }, [isOpen]);

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleValueChange = (value: any) => {
    const questionId = currentQuestion.id;
    
    setAssessmentData(prev => {
      const newData = { ...prev };
      
      // Handle nested data structure
      if (questionId.includes('.')) {
        const [parent, child] = questionId.split('.');
        if (!newData[parent as keyof AssessmentData]) {
          (newData as any)[parent] = {};
        }
        (newData as any)[parent][child] = value;
      } else {
        (newData as any)[questionId] = value;
      }
      
      return newData;
    });
  };

  const getCurrentValue = () => {
    const questionId = currentQuestion.id;
    
    if (questionId.includes('.')) {
      const [parent, child] = questionId.split('.');
      return (assessmentData as any)?.[parent]?.[child] || '';
    }
    
    return (assessmentData as any)?.[questionId] || '';
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Placeholder for actual submission
      console.log('Submitting assessment data:', assessmentData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Clear saved data on successful submission
      sessionStorage.removeItem('assessmentData');
      sessionStorage.removeItem('assessmentStep');
      
      // Close modal
      onClose();
      
      // You could show a success toast here
      
    } catch (error) {
      console.error('Failed to submit assessment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const canGoNext = () => {
    const currentValue = getCurrentValue();
    
    // For preview purposes, make validation more lenient
    // Only block progression if field is completely empty when required
    if (currentQuestion.required && (!currentValue || (typeof currentValue === 'string' && currentValue.trim().length === 0))) {
      return false;
    }
    
    // Skip validation for textarea and text fields to allow preview
    if (currentQuestion.type === 'textarea' || currentQuestion.type === 'text') {
      return currentValue && currentValue.trim().length > 0;
    }
    
    // Keep validation for other field types
    if (currentQuestion.validation) {
      return !currentQuestion.validation(currentValue);
    }
    
    return true;
  };

  const handleClose = () => {
    // Data is automatically saved to sessionStorage
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto">
        <DialogHeader className="space-y-6 pr-12">
          {/* Progress Bar */}
          <div className="space-y-3 mt-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-light text-foreground/60 tracking-widest uppercase">
                Assessment Progress
              </span>
              <span className="text-xs font-light text-foreground/60">
                {currentStep + 1} of {questions.length}
              </span>
            </div>
            <Progress 
              value={progress} 
              className="h-1 bg-secondary"
            />
          </div>
        </DialogHeader>

        {/* Question Step */}
        <div className="py-12 px-8">
          <QuestionStep
            question={currentQuestion}
            value={getCurrentValue()}
            onChange={handleValueChange}
            onNext={handleNext}
            onBack={handleBack}
            canGoBack={currentStep > 0}
            canGoNext={canGoNext()}
            isLoading={isSubmitting}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssessmentModal;