import React from 'react';

const MethodologyCard = ({ title, description, icon }) => (
  <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 sm:p-6 backdrop-blur-sm transition-all hover:bg-white/10">
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0 text-2xl">{icon}</div>
      <div>
        <h3 className="mb-2 text-lg font-bold text-neutral-900 dark:text-white">{title}</h3>
        <p className="text-sm leading-relaxed text-neutral-700 dark:text-white/80">{description}</p>
      </div>
    </div>
  </div>
);

const ApproachContent = () => {
  const methodologies = [
    {
      title: 'Adaptive Systems',
      description: 'Self-learning solutions that evolve with usage patterns, improving efficiency and user experience over time.',
      icon: '🔄'
    },
    {
      title: 'Seamless Integration',
      description: 'Unified systems that work invisibly in the background, enhancing rather than interrupting natural workflows.',
      icon: '⚡'
    },
    {
      title: 'Measured Impact',
      description: 'Real-world performance metrics that demonstrate tangible improvements in efficiency, usability, and user satisfaction.',
      icon: '📈'
    }
  ];

  const technicalHighlights = [
    'Intuitive Design',
    'Smart Automation',
    'Adaptive Learning',
    'Seamless Flow'
  ];

  return (
    <div className="space-y-8 pb-8">
      {/* Main Description */}
      <div className="rounded-xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-4 sm:p-6 backdrop-blur-sm">
        <h2 className="mb-4 text-xl font-bold text-neutral-900 dark:text-white">Invisible Innovation</h2>
        <p className="text-neutral-700 dark:text-white/90 leading-relaxed">
          We create systems that enhance natural workflows without drawing attention to themselves. 
          Our solutions work behind the scenes, learning and adapting to provide seamless experiences 
          that feel completely natural to users.
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
        <h3 className="mb-4 text-lg font-bold text-neutral-900 dark:text-white">Technical Capabilities</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {technicalHighlights.map((highlight) => (
            <div key={highlight} className="flex items-center space-x-2 text-neutral-700 dark:text-white/80">
              <span className="text-blue-400">•</span>
              <span className="text-sm">{highlight}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Implementation Process */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-4 sm:p-6 backdrop-blur-sm">
        <h3 className="mb-4 text-lg font-bold text-neutral-900 dark:text-white">Implementation Process</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-neutral-900 dark:text-white">1</div>
            <div className="flex-grow">
              <h4 className="text-neutral-900 dark:text-white font-medium">Understanding Flow</h4>
              <p className="text-sm text-neutral-600 dark:text-white/60">Analyzing natural patterns and identifying enhancement opportunities</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-neutral-900 dark:text-white">2</div>
            <div className="flex-grow">
              <h4 className="text-neutral-900 dark:text-white font-medium">Seamless Implementation</h4>
              <p className="text-sm text-neutral-600 dark:text-white/60">Building solutions that integrate naturally with existing workflows</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-neutral-900 dark:text-white">3</div>
            <div className="flex-grow">
              <h4 className="text-neutral-900 dark:text-white font-medium">Continuous Refinement</h4>
              <p className="text-sm text-neutral-600 dark:text-white/60">Iterative improvements based on real usage patterns and feedback</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApproachContent;
