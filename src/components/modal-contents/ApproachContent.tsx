import React from 'react';

const MethodologyCard = ({ title, description, icon }) => (
  <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 sm:p-6 backdrop-blur-sm transition-all hover:bg-white/10">
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0 text-2xl">{icon}</div>
      <div>
        <h3 className="mb-2 text-lg font-bold text-white">{title}</h3>
        <p className="text-sm leading-relaxed text-white/80">{description}</p>
      </div>
    </div>
  </div>
);

const ApproachContent = () => {
  const methodologies = [
    {
      title: 'Neural Networks Integration',
      description: 'Advanced neural architectures combined with biofeedback systems for precise consciousness mapping and response optimization.',
      icon: '🧠'
    },
    {
      title: 'Biofeedback Systems',
      description: 'Real-time physiological data processing enabling dynamic consciousness-technology interaction and adaptation.',
      icon: '📊'
    },
    {
      title: 'Transformation Metrics',
      description: 'Quantifiable measurements of consciousness evolution through advanced data analytics and pattern recognition.',
      icon: '📈'
    }
  ];

  const technicalHighlights = [
    'AI-Driven Pattern Recognition',
    'Quantum Computing Integration',
    'Consciousness Mapping Algorithms',
    'Real-time Data Processing'
  ];

  return (
    <div className="space-y-8">
      {/* Main Description */}
      <div className="rounded-xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-4 sm:p-6 backdrop-blur-sm">
        <h2 className="mb-4 text-xl font-bold text-white">Pioneering Integration</h2>
        <p className="text-white/90 leading-relaxed">
          Our approach combines cutting-edge AI technology with advanced consciousness studies, 
          delivering measurable transformation in human potential through precise methodologies 
          and systematic implementation.
        </p>
      </div>

      {/* Methodology Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {methodologies.map((method) => (
          <MethodologyCard key={method.title} {...method} />
        ))}
      </div>

      {/* Technical Highlights */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-4 sm:p-6 backdrop-blur-sm">
        <h3 className="mb-4 text-lg font-bold text-white">Technical Capabilities</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {technicalHighlights.map((highlight) => (
            <div key={highlight} className="flex items-center space-x-2 text-white/80">
              <span className="text-blue-400">•</span>
              <span className="text-sm">{highlight}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Implementation Process */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-4 sm:p-6 backdrop-blur-sm">
        <h3 className="mb-4 text-lg font-bold text-white">Implementation Process</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-white">1</div>
            <div className="flex-grow">
              <h4 className="text-white font-medium">Analysis & Mapping</h4>
              <p className="text-sm text-white/60">Initial consciousness pattern assessment and system architecture design</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-white">2</div>
            <div className="flex-grow">
              <h4 className="text-white font-medium">Integration & Development</h4>
              <p className="text-sm text-white/60">Neural network training and biofeedback system implementation</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-white">3</div>
            <div className="flex-grow">
              <h4 className="text-white font-medium">Optimization & Scaling</h4>
              <p className="text-sm text-white/60">Performance tuning and system expansion based on collected metrics</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApproachContent;
