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
      title: 'IoT Sensor Network',
      description: 'Distributed sensor array for real-time consciousness data collection and processing.',
      icon: '📡',
      specs: [
        { label: 'Sampling Rate', value: '1000Hz' },
        { label: 'Latency', value: '<5ms' },
        { label: 'Accuracy', value: '99.99%' },
        { label: 'Power Usage', value: '0.1W' }
      ]
    },
    {
      title: 'Neural Processing',
      description: 'Advanced neural networks optimized for consciousness pattern recognition.',
      icon: '🧠',
      specs: [
        { label: 'Model Size', value: '1.2B' },
        { label: 'Training Time', value: '72h' },
        { label: 'Inference Speed', value: '0.5ms' },
        { label: 'Memory Usage', value: '16GB' }
      ]
    },
    {
      title: 'Quantum Systems',
      description: 'Quantum algorithms for parallel consciousness state processing.',
      icon: '⚛️',
      specs: [
        { label: 'Qubits', value: '1024' },
        { label: 'Coherence Time', value: '100μs' },
        { label: 'Gate Fidelity', value: '99.9%' },
        { label: 'Error Rate', value: '0.1%' }
      ]
    }
  ];

  const systemLayers = [
    {
      name: 'Data Collection Layer',
      components: ['Biometric Sensors', 'Neural Interfaces', 'Quantum Detectors', 'Environmental Monitors']
    },
    {
      name: 'Processing Layer',
      components: ['Neural Networks', 'Quantum Processors', 'Pattern Recognition', 'Data Fusion']
    },
    {
      name: 'Integration Layer',
      components: ['API Gateway', 'Event Bus', 'State Management', 'Security Protocol']
    },
    {
      name: 'Application Layer',
      components: ['User Interface', 'Analytics Dashboard', 'Control Systems', 'Monitoring Tools']
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="rounded-xl border border-white/10 bg-gradient-to-br from-cyan-500/10 to-indigo-500/10 p-4 sm:p-6 backdrop-blur-sm">
        <h2 className="mb-4 text-xl font-bold text-white">Technical Architecture</h2>
        <p className="text-white/90 leading-relaxed">
          Implementing robust technical architectures that bridge consciousness and computation. 
          Our engineering approach integrates IoT sensors, neural networks, and quantum 
          algorithms to create measurable consciousness-technology interfaces.
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
