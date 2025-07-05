import { Question } from './types';

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const questions: Question[] = [
  // 1. Opening Context
  {
    id: 'intro',
    type: 'intro',
    title: "Let's assess your AI implementation experience",
    subtitle: "This takes about 3-4 minutes and helps us identify organizational blind spots that might be affecting your AI success.",
  },

  // 2. Contact Information
  {
    id: 'contact.name',
    type: 'text',
    title: "First, let's get some basic information so we can personalize your assessment.",
    subtitle: "What's your name?",
    placeholder: "Your full name",
    required: true,
    validation: (value: string) => {
      if (!value || value.trim().length < 2) {
        return "Please enter your full name";
      }
      return null;
    }
  },

  {
    id: 'contact.email',
    type: 'text',
    title: "What's the best email to send your detailed assessment?",
    placeholder: "your@email.com",
    required: true,
    validation: (value: string) => {
      if (!value) {
        return "Please enter your email address";
      }
      if (!isValidEmail(value)) {
        return "Please enter a valid email address";
      }
      return null;
    }
  },

  {
    id: 'contact.company',
    type: 'text',
    title: "What company or organization are you with?",
    placeholder: "Your company name",
    required: true,
    validation: (value: string) => {
      if (!value || value.trim().length < 2) {
        return "Please enter your company name";
      }
      return null;
    }
  },

  {
    id: 'contact.role',
    type: 'text',
    title: "What's your role or position at the company?",
    placeholder: "e.g., CTO, VP of Operations, Director of AI",
    required: true,
    validation: (value: string) => {
      if (!value || value.trim().length < 2) {
        return "Please enter your role or position";
      }
      return null;
    }
  },

  // 3. Implementation Background
  {
    id: 'implementation.background',
    type: 'textarea',
    title: "Tell us about your AI implementation journey.",
    subtitle: "Give us a brief overview - what AI capabilities did you deploy and roughly when?",
    placeholder: "e.g., We implemented a customer service chatbot and predictive analytics dashboard in Q2 2023...",
    required: true,
    validation: (value: string) => {
      if (!value || value.trim().length < 20) {
        return "Please provide a brief overview of your AI implementation (at least a few sentences)";
      }
      return null;
    }
  },

  // 4. Technical vs Business Success
  {
    id: 'success.type',
    type: 'select',
    title: "If you had to choose, would you say your AI project was a technical success, a business success, both, or neither?",
    required: true,
    options: [
      { value: 'both', label: 'Technical success, business success' },
      { value: 'technical_only', label: 'Technical success, but business challenges' },
      { value: 'business_only', label: 'Business success despite technical issues' },
      { value: 'neither', label: 'Neither - struggling on both fronts' }
    ]
  },

  {
    id: 'success.elaboration',
    type: 'textarea',
    title: "Tell us more about that...",
    subtitle: "What makes you characterize it that way?",
    placeholder: "Help us understand the gap between technical and business outcomes...",
    required: true,
    validation: (value: string) => {
      if (!value || value.trim().length < 10) {
        return "Please elaborate on your assessment";
      }
      return null;
    }
  },

  // 5. Post-Implementation Surprises
  {
    id: 'surprises',
    type: 'textarea',
    title: "What surprised you most about what happened after your AI went live and was technically functioning?",
    subtitle: "What organizational dynamics or challenges emerged that you didn't anticipate during planning?",
    placeholder: "e.g., Teams started using the AI differently than intended, or decision-making became unclear...",
    required: true,
    validation: (value: string) => {
      if (!value || value.trim().length < 15) {
        return "Please describe what surprised you about the post-implementation experience";
      }
      return null;
    }
  },

  // 6. Organizational Changes
  {
    id: 'organizationalChanges.type',
    type: 'select',
    title: "How has decision-making authority or responsibility shifted since AI implementation?",
    required: true,
    options: [
      { value: 'planned_well', label: 'Changes were planned and managed well' },
      { value: 'unplanned_manageable', label: 'Some unplanned shifts, but manageable' },
      { value: 'significant_unplanned', label: 'Significant unplanned authority changes' },
      { value: 'unclear_fragmented', label: 'Decision-making became unclear/fragmented' }
    ]
  },

  {
    id: 'organizationalChanges.details',
    type: 'textarea',
    title: "Were these changes planned or did they just happen?",
    subtitle: "Tell us more about how authority and decision-making evolved.",
    placeholder: "Describe how decision-making patterns changed after AI implementation...",
    required: true,
    validation: (value: string) => {
      if (!value || value.trim().length < 10) {
        return "Please provide more details about the organizational changes";
      }
      return null;
    }
  },

  // 7. Pattern Recognition
  {
    id: 'patterns',
    type: 'multiselect',
    title: "Have you experienced any of these patterns since AI implementation?",
    subtitle: "Select all that apply to your situation:",
    options: [
      { 
        value: 'technical_vs_operational', 
        label: 'Technical teams report success while operational teams report problems' 
      },
      { 
        value: 'authority_shifts', 
        label: 'Decision-making authority shifted without formal restructuring' 
      },
      { 
        value: 'cultural_resistance', 
        label: 'Cultural resistance emerged after technical deployment' 
      },
      { 
        value: 'shadow_usage', 
        label: 'Shadow AI usage outside governance frameworks' 
      },
      { 
        value: 'unexpected_dependencies', 
        label: 'New dependencies that weren\'t anticipated during planning' 
      },
      { 
        value: 'none', 
        label: 'None of these apply' 
      }
    ]
  },

  // 8. Current Situation Assessment
  {
    id: 'currentSituation',
    type: 'select',
    title: "Which best describes your current situation?",
    required: true,
    options: [
      { value: 'ready_expand', label: 'Ready to expand AI initiatives based on success' },
      { value: 'cautiously_optimizing', label: 'Cautiously optimizing current AI before expanding' },
      { value: 'struggling_value', label: 'Struggling to get value from technically successful AI' },
      { value: 'considering_reducing', label: 'Actively considering reducing or eliminating AI initiatives' },
      { value: 'already_scaling_back', label: 'Already scaling back AI projects despite technical functionality' }
    ]
  },

  // 9. Investment Likelihood
  {
    id: 'investmentLikelihood.score',
    type: 'slider',
    title: "On a scale of 1-10, how likely are you to continue investing in this AI initiative versus scaling it back?",
    required: true
  },

  {
    id: 'investmentLikelihood.reasoning',
    type: 'textarea',
    title: "What's driving that assessment?",
    subtitle: "Help us understand the key factors influencing your decision.",
    placeholder: "e.g., Budget constraints, lack of clear ROI, organizational resistance, technical limitations...",
    required: true,
    validation: (value: string) => {
      if (!value || value.trim().length < 10) {
        return "Please explain what's driving your likelihood assessment";
      }
      return null;
    }
  },

  // 10. Final Strategic Question
  {
    id: 'strategicQuestion',
    type: 'textarea',
    title: "What's your biggest unanswered question about your AI implementation experience?",
    subtitle: "Anything specific you'd like us to address in your assessment? (Optional)",
    placeholder: "e.g., How do we get teams to actually use the AI as intended? Why does our ROI look good on paper but feel disappointing in practice?"
  },

  // 11. Completion
  {
    id: 'completion',
    type: 'completion',
    title: "Thank you for sharing your AI implementation experience.",
    subtitle: "We'll analyze your responses and send your detailed AI Implementation Blind Spots Assessment within 24 hours. This assessment will identify specific organizational patterns and provide actionable insights for your situation."
  }
];