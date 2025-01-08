import React from 'react';

const ArchitectureComponent = ({ title, description, specs, icon }) => (
  <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 sm:p-6 backdrop-blur-sm transition-all hover:bg-white/10">
    <div className="absolute -right-12 -top-12 w-24 h-24 bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 rounded-full blur-2xl" />
    <div className="relative">
      <div className="mb-4 text-3xl">{icon}</div>
      <h3 className="mb-3 text-lg font-bold text-white">{title}</h3>
      <p className="mb-4 text-sm leading-relaxed text-white/80">{description}</p>
      <div className="space-y-2">
        {specs.map((spec, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <span className="text-white/60">{spec.label}</span>
            <span className="text-cyan-400 font-mono">{spec.value}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SystemLayer = ({ name, components }) => (
  <div className="rounded-lg border border-white/10 bg-white/5 p-3 backdrop-blur-sm">
    <div className="text-sm font-medium text-white mb-2">{name}</div>
    <div className="flex flex-wrap gap-2">
      {components.map((comp, index) => (
        <span key={index} className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/70">
          {comp}
        </span>
      ))}
    </div>
  </div>
);

const EngineeringContent = () => {
  const architectureComponents = [
    {
      title: 'Adaptive Sensors',
      description: 'Smart sensor networks that automatically adjust to usage patterns and environmental conditions.',
      icon: '📡',
      specs: [
        { label: 'Response Time', value: '<5ms' },
        { label: 'Accuracy', value: '99.99%' },
        { label: 'Coverage', value: '100%' },
        { label: 'Power Usage', value: '0.1W' }
      ]
    },
    {
      title: 'Learning Systems',
      description: 'Self-improving algorithms that evolve with usage to provide more natural interactions.',
      icon: '🧠',
      specs: [
        { label: 'Patterns', value: '1.2M' },
        { label: 'Adaptation', value: '24/7' },
        { label: 'Response', value: '0.5ms' },
        { label: 'Accuracy', value: '99.9%' }
      ]
    },
    {
      title: 'Flow Processing',
      description: 'Advanced processing systems that handle multiple interaction streams seamlessly.',
      icon: '⚡',
      specs: [
        { label: 'Streams', value: '1024' },
        { label: 'Latency', value: '100μs' },
        { label: 'Reliability', value: '99.9%' },
        { label: 'Throughput', value: '10GB/s' }
      ]
    }
  ];

  const systemLayers = [
    {
      name: 'Input Layer',
      components: ['Smart Sensors', 'Flow Detectors', 'Pattern Monitors', 'Adaptive Inputs']
    },
    {
      name: 'Processing Layer',
      components: ['Learning Systems', 'Flow Analysis', 'Pattern Recognition', 'Adaptive Logic']
    },
    {
      name: 'Integration Layer',
      components: ['Seamless API', 'Event Flow', 'State Harmony', 'Natural Security']
    },
    {
      name: 'Interface Layer',
      components: ['Natural UI', 'Flow Insights', 'Adaptive Controls', 'Smart Monitoring']
    }
  ];

  return (
    <div className="space-y-8 pb-8">
      {/* Header Section */}
      <div className="rounded-xl border border-white/10 bg-gradient-to-br from-cyan-500/10 to-indigo-500/10 p-4 sm:p-6 backdrop-blur-sm">
        <h2 className="mb-4 text-xl font-bold text-white">System Architecture</h2>
        <p className="text-white/90 leading-relaxed">
          Creating systems that adapt and respond naturally to user needs. Our engineering approach 
          combines smart sensors, learning algorithms, and seamless integration to deliver 
          experiences that feel completely intuitive.
        </p>
      </div>

      {/* Architecture Components */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {architectureComponents.map((component) => (
          <ArchitectureComponent key={component.title} {...component} />
        ))}
      </div>

      {/* System Architecture */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-4 sm:p-6 backdrop-blur-sm">
        <h3 className="mb-6 text-lg font-bold text-white">System Architecture</h3>
        <div className="space-y-4">
          {systemLayers.map((layer) => (
            <SystemLayer key={layer.name} {...layer} />
          ))}
        </div>
      </div>

      {/* Technical Metrics */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
          <h3 className="mb-4 text-lg font-bold text-white">Performance Metrics</h3>
          <div className="space-y-3">
            {[
              { label: 'System Uptime', value: '99.999%' },
              { label: 'Response Time', value: '<10ms' },
              { label: 'Data Throughput', value: '10TB/day' },
              { label: 'Processing Cores', value: '1024' }
            ].map((metric) => (
              <div key={metric.label} className="flex justify-between items-center">
                <span className="text-sm text-white/60">{metric.label}</span>
                <span className="text-sm font-mono text-cyan-400">{metric.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
          <h3 className="mb-4 text-lg font-bold text-white">System Capabilities</h3>
          <div className="space-y-3">
            {[
              { label: 'Concurrent Users', value: '1M+' },
              { label: 'Data Points/Sec', value: '1M' },
              { label: 'AI Models', value: '50+' },
              { label: 'Integration APIs', value: '100+' }
            ].map((metric) => (
              <div key={metric.label} className="flex justify-between items-center">
                <span className="text-sm text-white/60">{metric.label}</span>
                <span className="text-sm font-mono text-cyan-400">{metric.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngineeringContent;
