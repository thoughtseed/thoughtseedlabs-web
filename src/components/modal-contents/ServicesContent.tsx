import React from 'react';

const ServiceCard = ({ title, description, icon, features }) => (
  <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 sm:p-6 backdrop-blur-sm transition-all hover:bg-white/10">
    <div className="absolute -right-8 -top-8 w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-xl" />
    <div className="relative">
      <div className="mb-4 text-3xl">{icon}</div>
      <h3 className="mb-3 text-lg font-bold text-white">{title}</h3>
      <p className="mb-4 text-sm leading-relaxed text-white/80">{description}</p>
      <div className="space-y-2">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center text-sm text-white/70">
            <span className="mr-2 text-cyan-400">▹</span>
            {feature}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const TechnologyBadge = ({ name }) => (
  <div className="rounded-full px-3 py-1 text-sm border border-white/10 bg-white/5 text-white/80 backdrop-blur-sm">
    {name}
  </div>
);

const ServicesContent = () => {
  const services = [
    {
      title: 'Consciousness Engineering',
      description: 'Advanced integration of consciousness and technology through sophisticated engineering solutions.',
      icon: '🧠',
      features: [
        'Neural Network Architecture',
        'Consciousness Mapping',
        'Biofeedback Integration',
        'Pattern Recognition Systems'
      ]
    },
    {
      title: 'AI Integration',
      description: 'Cutting-edge AI solutions tailored for consciousness-aware applications and systems.',
      icon: '🤖',
      features: [
        'Deep Learning Models',
        'Natural Language Processing',
        'Behavioral Analysis',
        'Adaptive AI Systems'
      ]
    },
    {
      title: 'Smart Technology',
      description: 'Innovative smart systems that bridge consciousness with practical applications.',
      icon: '💡',
      features: [
        'IoT Device Integration',
        'Real-time Processing',
        'Smart Environment Control',
        'Automated Optimization'
      ]
    }
  ];

  const technologies = [
    'Quantum Computing',
    'Neural Networks',
    'Blockchain',
    'IoT',
    'Edge Computing',
    'Cloud Infrastructure',
    'Machine Learning',
    'Data Analytics'
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="rounded-xl border border-white/10 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-4 sm:p-6 backdrop-blur-sm">
        <h2 className="mb-4 text-xl font-bold text-white">Technical Solutions</h2>
        <p className="text-white/90 leading-relaxed">
          Specialized technical solutions spanning consciousness engineering, AI integration, 
          and smart technology development. Our implementations bridge the gap between 
          advanced technology and consciousness enhancement.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.title} {...service} />
        ))}
      </div>

      {/* Technologies Section */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-4 sm:p-6 backdrop-blur-sm">
        <h3 className="mb-4 text-lg font-bold text-white">Core Technologies</h3>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <TechnologyBadge key={tech} name={tech} />
          ))}
        </div>
      </div>

      {/* Implementation Process */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-4 sm:p-6 backdrop-blur-sm">
        <h3 className="mb-4 text-lg font-bold text-white">Service Implementation</h3>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-blue-500/50 to-transparent" />
          <div className="space-y-6 pl-12">
            <div>
              <h4 className="text-white font-medium">1. Technical Assessment</h4>
              <p className="text-sm text-white/60 mt-1">Comprehensive analysis of requirements and technical feasibility</p>
            </div>
            <div>
              <h4 className="text-white font-medium">2. Solution Architecture</h4>
              <p className="text-sm text-white/60 mt-1">Custom design of integrated consciousness-technology systems</p>
            </div>
            <div>
              <h4 className="text-white font-medium">3. Implementation</h4>
              <p className="text-sm text-white/60 mt-1">Agile development and deployment of solutions</p>
            </div>
            <div>
              <h4 className="text-white font-medium">4. Optimization</h4>
              <p className="text-sm text-white/60 mt-1">Continuous improvement based on performance metrics</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesContent;
