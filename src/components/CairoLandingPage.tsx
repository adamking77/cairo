import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useScrollTrigger } from '@/hooks/useScrollTrigger';
import { useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';
import AssessmentModal from './assessment/AssessmentModal';
import ThemeToggle from './ThemeToggle';

interface AssessmentFormData {
  name: string;
  email: string;
  company: string;
  role: string;
}

const CairoLandingPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);
  const form = useForm<AssessmentFormData>();

  const onSubmit = (data: AssessmentFormData) => {
    console.log('Form submitted:', data);
    // Handle form submission here
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Theme Toggle - Fixed Position */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Hero Continuation Section */}
      <HeroContinuationSection />
      
      {/* Statistics Section */}
      <StatisticsSection />
      
      {/* Problem Definition Section */}
      <ProblemDefinitionSection />
      
      {/* Solution Preview Section */}
      <SolutionPreviewSection />
      
      {/* Dual CTA Section */}
      <CTASection 
        showForm={showForm} 
        setShowForm={setShowForm} 
        setShowAssessmentModal={setShowAssessmentModal}
        form={form} 
        onSubmit={onSubmit} 
      />
      
      {/* Assessment Modal */}
      <AssessmentModal 
        isOpen={showAssessmentModal} 
        onClose={() => setShowAssessmentModal(false)} 
      />
    </div>
  );
};

const HeroSection = () => {
  const { ref, isVisible } = useScrollTrigger({ threshold: 0.2 });

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-start relative overflow-hidden pt-48 pb-24">
      <div className="max-w-5xl mx-auto px-16 lg:px-20 w-full">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-10 animate-fade-in">
            <div className="space-y-12">
              <div className="space-y-8">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-[0.9] tracking-tight text-foreground">
                  Before You Scrap Your AI Project, Read This
                </h1>
                
                {/* Simple centered vertical line */}
                <div className="flex justify-center pt-12 pb-8">
                  <div className="w-px h-40 bg-border"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2 flex justify-end items-start">
            <div className="w-1 h-48 bg-foreground/10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const HeroContinuationSection = () => {
  const { ref, isVisible } = useScrollTrigger({ threshold: 0.3 });

  return (
    <section ref={ref} className="py-24 lg:py-32">
      <div className="max-w-5xl mx-auto px-16 lg:px-20 w-full">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          <div className={`lg:col-span-12 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="space-y-12">
              <div className="space-y-8">
                <h2 className="text-2xl md:text-3xl font-light text-foreground/80 leading-tight">
                  42% Are Abandoning Their AI Projects. Here's Why Yours Is Actually Salvageable.
                </h2>
                
                <div className="max-w-2xl">
                  <p className="text-lg font-light text-foreground/70 leading-relaxed">
                    Your AI implementation passed every technical test. The metrics prove it works. But something you didn't anticipate happened—organizational dysfunction emerged that your technical team can't explain and your consultants can't solve.
                  </p>
                </div>
                
                <div className="max-w-xl">
                  <p className="text-xl font-medium text-foreground">
                    You're experiencing AI Implementation Blind Spots.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const StatisticsSection = () => {
  const { ref, isVisible } = useScrollTrigger({ threshold: 0.2 });

  return (
    <section ref={ref} className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <div className={`space-y-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">
              The data tells a clear story:
            </h2>
            <div className="w-16 h-px bg-foreground/20"></div>
          </div>
          
          {/* Bento Grid - Mobile: Stack, Desktop: Asymmetrical Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 lg:grid-rows-4 gap-4 lg:h-[600px]">
            
            {/* 1% - Hero Card (Large, Left) */}
            <Card className="lg:col-span-2 lg:row-span-3 p-6 lg:p-12 transition-all duration-300 ease-out hover:scale-[1.05] hover:shadow-2xl hover:shadow-primary/10 hover:bg-foreground/5 flex flex-col justify-center group cursor-pointer">
              <CardContent className="p-0">
                <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
                  <div className="space-y-4">
                    <div className="text-xs font-medium text-foreground/60 tracking-widest uppercase transition-colors duration-300 group-hover:text-foreground/80">
                      Only
                    </div>
                    <div className="text-6xl lg:text-8xl xl:text-9xl font-light text-primary tracking-tight transition-colors duration-300 group-hover:text-primary/90">
                      1%
                    </div>
                  </div>
                  <p className="text-lg lg:text-xl font-light text-foreground/80 leading-relaxed transition-colors duration-300 group-hover:text-foreground">
                    Describe their AI rollouts as "mature"
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* 47% - Tall Card (Top Right) */}
            <Card className="lg:col-span-2 lg:row-span-2 p-6 transition-all duration-300 ease-out hover:scale-[1.05] hover:shadow-xl hover:shadow-primary/8 hover:bg-foreground/5 flex flex-col justify-center group cursor-pointer">
              <CardContent className="p-0">
                <div className="space-y-4 text-center lg:text-left">
                  <div className="text-4xl lg:text-6xl font-light text-primary tracking-tight transition-colors duration-300 group-hover:text-primary/90">
                    47%
                  </div>
                  <p className="text-base lg:text-lg font-light text-foreground/70 leading-relaxed transition-colors duration-300 group-hover:text-foreground/90">
                    Experience organizational consequences despite technical AI success
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* 42% - Medium Card (Middle Right) */}
            <Card className="lg:col-span-2 lg:row-span-1 p-6 transition-all duration-300 ease-out hover:scale-[1.05] hover:shadow-xl hover:shadow-primary/8 hover:bg-foreground/5 flex flex-col justify-center group cursor-pointer">
              <CardContent className="p-0">
                <div className="space-y-3 text-center lg:text-left">
                  <div className="text-3xl lg:text-4xl font-light text-primary tracking-tight transition-colors duration-300 group-hover:text-primary/90">
                    42%
                  </div>
                  <p className="text-sm lg:text-base font-light text-foreground/70 leading-relaxed transition-colors duration-300 group-hover:text-foreground/90">
                    Are scrapping most AI initiatives (up from 17% last year)
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* 33% - Small Card (Bottom Left) */}
            <Card className="lg:col-span-1 lg:row-span-1 p-4 transition-all duration-300 ease-out hover:scale-[1.04] hover:shadow-lg hover:shadow-primary/6 hover:bg-foreground/5 flex flex-col justify-center group cursor-pointer">
              <CardContent className="p-0">
                <div className="space-y-3 text-center">
                  <div className="text-2xl lg:text-3xl font-light text-primary tracking-tight transition-colors duration-300 group-hover:text-primary/90">
                    33%
                  </div>
                  <p className="text-xs lg:text-sm font-light text-foreground/70 leading-relaxed transition-colors duration-300 group-hover:text-foreground/90">
                    Report AI creates tension between teams
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* 21.9% - Medium Card (Bottom Middle) */}
            <Card className="lg:col-span-2 lg:row-span-1 p-4 transition-all duration-300 ease-out hover:scale-[1.04] hover:shadow-lg hover:shadow-primary/6 hover:bg-foreground/5 flex flex-col justify-center group cursor-pointer">
              <CardContent className="p-0">
                <div className="space-y-3 text-center lg:text-left">
                  <div className="text-2xl lg:text-3xl font-light text-primary tracking-tight transition-colors duration-300 group-hover:text-primary/90">
                    21.9%
                  </div>
                  <p className="text-xs lg:text-sm font-light text-foreground/70 leading-relaxed transition-colors duration-300 group-hover:text-foreground/90">
                    Have no clear ownership of AI governance
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* 17% - Small Card (Bottom Right) */}
            <Card className="lg:col-span-1 lg:row-span-1 p-4 transition-all duration-300 ease-out hover:scale-[1.04] hover:shadow-lg hover:shadow-primary/6 hover:bg-foreground/5 flex flex-col justify-center group cursor-pointer">
              <CardContent className="p-0">
                <div className="space-y-3 text-center">
                  <div className="text-2xl lg:text-3xl font-light text-primary tracking-tight transition-colors duration-300 group-hover:text-primary/90">
                    17%
                  </div>
                  <p className="text-xs lg:text-sm font-light text-foreground/70 leading-relaxed transition-colors duration-300 group-hover:text-foreground/90">
                    Have leadership-driven adoption with systematic policies
                  </p>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </section>
  );
};

const ProblemDefinitionSection = () => {
  const { ref, isVisible } = useScrollTrigger({ threshold: 0.2 });

  const problems = [
    "Authority shifts that happened without formal restructuring",
    "Decision-making gaps nobody anticipated during planning",
    "Cultural resistance that emerged after technical success",
    "Shadow AI usage despite governance frameworks",
    "Team friction that wasn't there before deployment"
  ];

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="col-span-1 lg:col-span-6">
            <div className="space-y-12">
              <div className="space-y-8">
                <h2 className="text-4xl md:text-5xl font-light leading-[1.1] tracking-tight text-foreground">
                  The Pattern We're Seeing
                </h2>
                <div className="w-16 h-px bg-border"></div>
                <div className="space-y-6">
                  <p className="text-lg font-light text-muted-foreground leading-relaxed">
                    You implemented AI using technology frameworks, but what you actually needed was business transformation intelligence. Now you're dealing with:
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                {problems.map((problem, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-2 h-2 rounded-full bg-primary/50 mt-2 flex-shrink-0"></div>
                    <p className="text-base font-medium text-foreground leading-relaxed">
                      {problem}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="pt-8">
                <p className="text-lg font-light text-foreground italic">
                  Sound familiar?
                </p>
              </div>
            </div>
          </div>
          
          <div className="col-span-1 lg:col-span-6">
            <div className="space-y-12">
              <div className="space-y-8">
                <h3 className="text-2xl md:text-3xl font-light tracking-tight text-foreground">
                  This Isn't Implementation Failure
                </h3>
                <div className="space-y-6">
                  <p className="text-lg font-light text-muted-foreground leading-relaxed">
                    Your technical team did their job. Your AI works exactly as designed.
                  </p>
                  <p className="text-lg font-medium text-foreground leading-relaxed">
                    The problem is systematic: successful AI implementations create organizational blind spots that traditional consulting frameworks can't detect.
                  </p>
                  <p className="text-base font-light text-muted-foreground leading-relaxed">
                    Organizations experiencing this aren't failing at AI—they're discovering that AI cultural integration requires completely different intelligence than technical deployment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SolutionPreviewSection = () => {
  const { ref, isVisible } = useScrollTrigger({ threshold: 0.2 });

  const assessmentAreas = [
    "The specific organizational shifts that emerged after your AI went live",
    "How decision-making and authority patterns changed (often invisibly)",
    "Whether you're experiencing the systematic vulnerability patterns we've identified",
    "What blind spots exist in your current AI governance approach"
  ];

  return (
    <section ref={ref} className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <div className={`space-y-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="col-span-1 lg:col-span-8">
              <div className="space-y-12">
                <div className="space-y-8">
                  <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">
                    What We're Learning
                  </h2>
                  <div className="w-16 h-px bg-foreground/20"></div>
                  <div className="space-y-6">
                    <p className="text-lg font-light text-foreground/70 leading-relaxed">
                      We're conducting strategic assessments with select organizations to validate systematic patterns and develop solutions for AI cultural intelligence.
                    </p>
                    <p className="text-lg font-medium text-foreground leading-relaxed">
                      You'll get immediate insights from the assessment itself, and when we develop systematic solutions based on this research, you'll be among the first to access them.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-8">
                  <h3 className="text-2xl font-light tracking-tight text-foreground">
                    What We'll Map Together:
                  </h3>
                  <div className="space-y-6">
                    {assessmentAreas.map((area, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/50 mt-2 flex-shrink-0"></div>
                        <p className="text-base font-light text-foreground/80 leading-relaxed">
                          {area}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4 pt-8 border-t border-border">
                  <div className="space-y-2">
                    <p className="text-base font-medium text-foreground">
                      Format: 45-60 minute confidential strategic conversation
                    </p>
                    <p className="text-base font-medium text-foreground">
                      Outcome: Clear assessment of your AI cultural integration gaps
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CTASection = ({ showForm, setShowForm, setShowAssessmentModal, form, onSubmit }: {
  showForm: boolean;
  setShowForm: (show: boolean) => void;
  setShowAssessmentModal: (show: boolean) => void;
  form: any;
  onSubmit: (data: AssessmentFormData) => void;
}) => {
  const { ref, isVisible } = useScrollTrigger({ threshold: 0.2 });

  return (
    <section ref={ref} className="py-32 lg:py-40 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <div className={`transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="grid grid-cols-12 gap-0 relative">
            {/* Primary CTA */}
            <div className="col-span-12 lg:col-span-6 lg:pr-12">
              <div className="space-y-8">
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl font-light leading-tight tracking-tight text-foreground">
                    Schedule Your Strategic Assessment
                  </h2>
                  <div className="w-16 h-px bg-foreground/20"></div>
                  <p className="text-lg font-light text-foreground/70 leading-relaxed">
                    We're limiting these assessments to organizations where we can validate systematic patterns.
                  </p>
                </div>
                
                <div className="space-y-6">
                  <Button 
                    size="lg" 
                    onClick={() => setShowForm(true)}
                    className="font-light text-base px-8 py-3"
                  >
                    Book Confidential Assessment
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Vertical Border */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-border hidden lg:block"></div>
            
            {/* Secondary CTA */}
            <div className="col-span-12 lg:col-span-6 lg:pl-12 mt-12 lg:mt-0">
              <div className="space-y-8">
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl font-light leading-tight tracking-tight text-foreground">
                    Prefer to Share Your Experience in Writing?
                  </h2>
                  <div className="w-16 h-px bg-foreground/20"></div>
                  <p className="text-lg font-light text-foreground/70 leading-relaxed">
                    If a live conversation isn't practical right now, you can help validate our research by sharing your AI implementation experience through our assessment form. You'll receive a detailed analysis of your responses showing which systematic patterns apply to your situation.
                  </p>
                </div>
                
                <div className="space-y-6">
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={() => setShowAssessmentModal(true)}
                    className="font-light border-foreground/20 hover:border-foreground/40 text-base px-8 py-3"
                  >
                    Complete Written Assessment
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Confidentiality Notice */}
          <div className="pt-12 mt-12 border-t border-border text-center">
            <p className="text-sm font-light text-foreground/50 italic">
              All conversations and data remain strictly confidential.
            </p>
          </div>
          
          {/* Form Modal */}
          {showForm && (
            <div className="mt-16 max-w-2xl mx-auto">
              <Card className="p-8">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-2xl font-light">
                    Request Assessment
                  </CardTitle>
                  <CardDescription>
                    Share your details to schedule your confidential strategic conversation
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="your@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company</FormLabel>
                            <FormControl>
                              <Input placeholder="Your company" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Role</FormLabel>
                            <FormControl>
                              <Input placeholder="Your role" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex gap-4">
                        <Button type="submit" className="font-light">
                          Request Assessment
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setShowForm(false)}
                          className="font-light"
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CairoLandingPage;