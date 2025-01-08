import React from 'react';

const DesignPrinciple = ({ title, description, metrics }) => (
  <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 sm:p-6 backdrop-blur-sm transition-all hover:bg-white/10">
    <div className="absolute -right-12 -top-12 w-24 h-24 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-full blur-2xl" />
    <div className="relative">
      <h3 className="mb-3 text-lg font-bold text-white">{title}</h3>
      <p className="mb-4 text-sm leading-relaxed text-white/80">{description}</p>
      <div className="grid grid-cols-2 gap-3">
        {metrics.map((metric, index) => (
          <div key={index} className="rounded-lg bg-white/5 p-3 backdrop-blur-sm">
            <div className="text-lg font-bold text-amber-400">{metric.value}</div>
            <div className="text-xs text-white/60">{metric.label}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const InteractionPattern = ({ title, description, icon }) => (
  <div className="flex items-start space-x-4 p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center text-xl">
      {icon}
    </div>
    <div>
      <h4 className="text-white font-medium">{title}</h4>
      <p className="text-sm text-white/60 mt-1">{description}</p>
    </div>
  </div>
);

const DesignContent = () => {
  const designPrinciples = [
    {
      title: 'Intuitive Flow',
      description: 'Interfaces that feel natural and effortless, adapting to how people naturally work and think.',
      metrics: [
        { value: '98%', label: 'Task Completion' },
        { value: '0.1s', label: 'Response Time' }
      ]
    },
    {
      title: 'Smart Adaptation',
      description: 'Real-time adjustments based on usage patterns and environmental context.',
      metrics: [
        { value: '95%', label: 'Accuracy Rate' },
        { value: '50ms', label: 'Adaptation Speed' }
      ]
    },
    {
      title: 'Usage Patterns',
      description: 'Dynamic interfaces that evolve based on how they\'re actually used.',
      metrics: [
        { value: '1000+', label: 'Flow States' },
        { value: '99%', label: 'User Satisfaction' }
      ]
    }
  ];

  const interactionPatterns = [
    {
      title: 'Smart Elements',
      description: 'Interface elements that understand and adapt to natural work patterns',
      icon: '💡'
    },
    {
      title: 'Natural Navigation',
      description: 'Movement and flow that feels completely intuitive',
      icon: '🔄'
    },
    {
      title: 'Adaptive Components',
      description: 'Interactive elements that adjust to provide what\'s needed, when needed',
      icon: '✨'
    },
    {
      title: 'Fluid Layouts',
      description: 'Spaces that naturally organize around how they\'re being used',
      icon: '📱'
    }
  ];

  return (
    <div className="space-y-8 pb-8">
      {/* Header Section */}
      <div className="rounded-xl border border-white/10 bg-gradient-to-br from-amber-500/10 to-orange-500/10 p-4 sm:p-6 backdrop-blur-sm">
        <h2 className="mb-4 text-xl font-bold text-white">Natural Design</h2>
        <p className="text-white/90 leading-relaxed">
          Creating interfaces that feel like natural extensions of human intention. 
          Our design approach focuses on understanding how people naturally work and interact, 
          resulting in experiences that feel completely intuitive.
        </p>
      </div>

      {/* Design Principles Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {designPrinciples.map((principle) => (
          <DesignPrinciple key={principle.title} {...principle} />
        ))}
      </div>

      {/* Interaction Patterns */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-4 sm:p-6 backdrop-blur-sm">
        <h3 className="mb-6 text-lg font-bold text-white">Interaction Patterns</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {interactionPatterns.map((pattern) => (
            <InteractionPattern key={pattern.title} {...pattern} />
          ))}
        </div>
      </div>

      {/* Design Process */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-4 sm:p-6 backdrop-blur-sm">
        <h3 className="mb-6 text-lg font-bold text-white">Design Process</h3>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-amber-500/50 via-orange-500/50 to-transparent" />
          <div className="space-y-6 pl-12">
            <div>
              <h4 className="text-white font-medium">1. Flow Analysis</h4>
              <p className="text-sm text-white/60 mt-1">Understanding natural work patterns and interaction preferences</p>
            </div>
            <div>
              <h4 className="text-white font-medium">2. Natural Prototyping</h4>
              <p className="text-sm text-white/60 mt-1">Creating interfaces that feel like they've always been there</p>
            </div>
            <div>
              <h4 className="text-white font-medium">3. Usage Testing</h4>
              <p className="text-sm text-white/60 mt-1">Real-world testing focused on natural interaction patterns</p>
            </div>
            <div>
              <h4 className="text-white font-medium">4. Flow Refinement</h4>
              <p className="text-sm text-white/60 mt-1">Continuous improvement based on actual usage patterns</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignContent;
