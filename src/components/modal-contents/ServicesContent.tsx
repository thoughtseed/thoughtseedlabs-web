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
      title: 'Flow Optimization',
      description: 'Systems that naturally adapt to usage patterns, enhancing efficiency without disrupting established workflows.',
      icon: '⚡',
      features: [
        'Adaptive Learning',
        'Pattern Recognition',
        'Process Enhancement',
        'Seamless Integration'
      ]
    },
    {
      title: 'Smart Environments',
      description: 'Spaces that understand and respond to needs, creating natural interactions between users and technology.',
      icon: '🔧',
      features: [
        'Intuitive Controls',
        'Ambient Intelligence',
        'Natural Interactions',
        'Environmental Harmony'
      ]
    },
    {
      title: 'Intelligent Assistance',
      description: 'Solutions that anticipate needs and provide support exactly when needed, becoming an natural extension of human capability.',
      icon: '🤖',
      features: [
        'Contextual Awareness',
        'Predictive Support',
        'Adaptive Learning',
        'Seamless Integration'
      ]
    }
  ];

  const technologies = [
    'React/React Native',
    'Python/FastAPI',
    'Firebase/Supabase',
    'IoT/Tuya APIs',
    'OpenAI Integration',
    'Flutter/Vue.js',
    'Go/Redis/Postgres',
    'Cloud Services'
  ];

  return (
    <div className="space-y-8 pb-8">
      {/* Header Section */}
      <div className="rounded-xl border border-white/10 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-4 sm:p-6 backdrop-blur-sm">
        <h2 className="mb-4 text-xl font-bold text-white">Natural Enhancement</h2>
        <p className="text-white/90 leading-relaxed">
          We create solutions that feel like natural extensions of human capability. Our systems 
          work invisibly in the background, learning and adapting to provide support exactly 
          when needed, without drawing attention to themselves.
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
              <h4 className="text-white font-medium">1. Understanding Patterns</h4>
              <p className="text-sm text-white/60 mt-1">Observing natural workflows and identifying enhancement opportunities</p>
            </div>
            <div>
              <h4 className="text-white font-medium">2. Invisible Design</h4>
              <p className="text-sm text-white/60 mt-1">Creating systems that enhance without interrupting</p>
            </div>
            <div>
              <h4 className="text-white font-medium">3. Natural Integration</h4>
              <p className="text-sm text-white/60 mt-1">Implementing solutions that feel like they've always been there</p>
            </div>
            <div>
              <h4 className="text-white font-medium">4. Continuous Evolution</h4>
              <p className="text-sm text-white/60 mt-1">Adapting and improving based on real-world interactions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesContent;
