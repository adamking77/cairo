import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { QuestionStepProps } from './types';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const QuestionStep: React.FC<QuestionStepProps> = ({
  question,
  value,
  onChange,
  onNext,
  onBack,
  canGoBack,
  canGoNext,
  isLoading = false
}) => {
  const [validationError, setValidationError] = React.useState<string | null>(null);
  
  const handleNext = () => {
    // Only show validation errors, but don't block progression for preview
    if (question.validation && question.required && question.type !== 'textarea' && question.type !== 'text') {
      const error = question.validation(value);
      if (error) {
        setValidationError(error);
        return;
      }
    }
    setValidationError(null);
    onNext();
  };

  const handleValueChange = (newValue: any) => {
    setValidationError(null);
    onChange(newValue);
  };
  const renderQuestionContent = () => {
    switch (question.type) {
      case 'intro':
        return (
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-light text-foreground">
                {question.title}
              </h2>
              {question.subtitle && (
                <p className="text-lg font-light text-foreground/70 leading-relaxed max-w-xl mx-auto">
                  {question.subtitle}
                </p>
              )}
            </div>
          </div>
        );

      case 'completion':
        return (
          <div className="text-center space-y-8">
            <div className="space-y-6">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-primary rounded-full"></div>
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-foreground">
                {question.title}
              </h2>
              {question.subtitle && (
                <p className="text-lg font-light text-foreground/70 leading-relaxed max-w-xl mx-auto">
                  {question.subtitle}
                </p>
              )}
            </div>
          </div>
        );

      case 'text':
        return (
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-xl md:text-2xl font-light text-foreground">
                {question.title}
              </h2>
              {question.subtitle && (
                <p className="text-base font-light text-foreground/70 leading-relaxed">
                  {question.subtitle}
                </p>
              )}
            </div>
            <Input
              value={value || ''}
              onChange={(e) => handleValueChange(e.target.value)}
              placeholder={question.placeholder}
              className={cn(
                "text-base font-light",
                validationError && "border-destructive focus-visible:ring-destructive"
              )}
              autoFocus
            />
            {validationError && (
              <p className="text-sm text-destructive font-light mt-2">
                {validationError}
              </p>
            )}
          </div>
        );

      case 'textarea':
        return (
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-xl md:text-2xl font-light text-foreground">
                {question.title}
              </h2>
              {question.subtitle && (
                <p className="text-base font-light text-foreground/70 leading-relaxed">
                  {question.subtitle}
                </p>
              )}
            </div>
            <Textarea
              value={value || ''}
              onChange={(e) => handleValueChange(e.target.value)}
              placeholder={question.placeholder}
              className={cn(
                "min-h-[160px] text-base font-light",
                validationError && "border-destructive focus-visible:ring-destructive"
              )}
              autoFocus
            />
            {validationError && (
              <p className="text-sm text-destructive font-light mt-2">
                {validationError}
              </p>
            )}
          </div>
        );

      case 'select':
        return (
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-light text-foreground">
                {question.title}
              </h2>
              {question.subtitle && (
                <p className="text-base font-light text-foreground/70 leading-relaxed">
                  {question.subtitle}
                </p>
              )}
            </div>
            <div className="space-y-3">
              {question.options?.map((option) => (
                <Card 
                  key={option.value}
                  className={cn(
                    "cursor-pointer transition-all duration-200 hover:bg-foreground/5",
                    value === option.value && "bg-primary/10 border-primary/20"
                  )}
                  onClick={() => handleValueChange(option.value)}
                >
                  <CardContent className="p-4">
                    <p className="text-base font-light text-foreground">
                      {option.label}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'multiselect':
        return (
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-light text-foreground">
                {question.title}
              </h2>
              {question.subtitle && (
                <p className="text-base font-light text-foreground/70 leading-relaxed">
                  {question.subtitle}
                </p>
              )}
            </div>
            <div className="space-y-3">
              {question.options?.map((option) => {
                const isSelected = Array.isArray(value) && value.includes(option.value);
                return (
                  <Card 
                    key={option.value}
                    className={cn(
                      "cursor-pointer transition-all duration-200 hover:bg-foreground/5",
                      isSelected && "bg-primary/10 border-primary/20"
                    )}
                    onClick={() => {
                      const currentValues = Array.isArray(value) ? value : [];
                      if (isSelected) {
                        handleValueChange(currentValues.filter(v => v !== option.value));
                      } else {
                        handleValueChange([...currentValues, option.value]);
                      }
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className={cn(
                          "w-5 h-5 rounded border-2 transition-colors duration-200",
                          isSelected 
                            ? "bg-primary border-primary" 
                            : "border-foreground/20"
                        )}>
                          {isSelected && (
                            <div className="w-full h-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-sm"></div>
                            </div>
                          )}
                        </div>
                        <p className="text-base font-light text-foreground">
                          {option.label}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        );

      case 'slider':
        const sliderValue = typeof value === 'number' ? value : 5;
        return (
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-light text-foreground">
                {question.title}
              </h2>
              {question.subtitle && (
                <p className="text-base font-light text-foreground/70 leading-relaxed">
                  {question.subtitle}
                </p>
              )}
            </div>
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-light text-foreground/60">
                    Likely to scale back
                  </span>
                  <span className="text-sm font-light text-foreground/60">
                    Definitely continuing/expanding
                  </span>
                </div>
                <Slider
                  value={[sliderValue]}
                  onValueChange={(newValue) => handleValueChange(newValue[0])}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="text-center">
                  <span className="text-2xl font-light text-primary">
                    {sliderValue}
                  </span>
                  <span className="text-base font-light text-foreground/60 ml-2">
                    / 10
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderNavigationButtons = () => {
    if (question.type === 'intro') {
      return (
        <div className="flex justify-center">
          <Button 
            onClick={onNext}
            size="lg"
            className="font-light text-base px-8"
          >
            Let's Start
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      );
    }

    if (question.type === 'completion') {
      return (
        <div className="flex justify-center">
          <Button 
            onClick={onNext}
            size="lg"
            className="font-light text-base px-8"
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Complete Assessment'}
          </Button>
        </div>
      );
    }

    return (
      <div className="flex justify-between items-center">
        <Button 
          variant="outline"
          onClick={onBack}
          disabled={!canGoBack}
          className="font-light text-base"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        
        <Button 
          onClick={handleNext}
          disabled={!canGoNext}
          className="font-light text-base"
        >
          {question.type === 'completion' ? 'Complete' : 'Continue'}
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    );
  };

  return (
    <div className="space-y-16">
      <div className="min-h-[400px]">
        {renderQuestionContent()}
      </div>
      
      <div className="pt-8 border-t border-border">
        {renderNavigationButtons()}
      </div>
    </div>
  );
};