import React from 'react';

const ResearchArea = ({ title, description, metrics }) => (
  <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 sm:p-6 backdrop-blur-sm transition-all hover:bg-white/10">
    <div className="absolute -right-12 -top-12 w-24 h-24 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full blur-2xl" />
    <div className="relative">
      <h3 className="mb-3 text-lg font-bold text-white">{title}</h3>
      <p className="mb-4 text-sm leading-relaxed text-white/80">{description}</p>
      <div className="grid grid-cols-2 gap-3">
        {metrics.map((metric, index) => (
          <div key={index} className="rounded-lg bg-white/5 p-3 backdrop-blur-sm">
            <div className="text-2xl font-bold text-pink-400">{metric.value}</div>
            <div className="text-xs text-white/60">{metric.label}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const MethodologyStep = ({ number, title, description }) => (
  <div className="flex items-start space-x-4">
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center text-white font-bold">
      {number}
    </div>
    <div>
      <h4 className="text-white font-medium">{title}</h4>
      <p className="text-sm text-white/60 mt-1">{description}</p>
    </div>
  </div>
);

const ScienceContent = () => {
  const researchAreas = [
    {
      title: 'Neuroscience Integration',
      description: 'Advanced neural mapping and consciousness pattern analysis through cutting-edge brain-computer interfaces.',
      metrics: [
        { value: '99.9%', label: 'Pattern Recognition Accuracy' },
        { value: '10ms', label: 'Neural Response Time' }
      ]
    },
    {
      title: 'Quantum Computing',
      description: 'Quantum algorithms for consciousness simulation and parallel reality processing.',
      metrics: [
        { value: '1000+', label: 'Qubits Processed' },
        { value: '100x', label: 'Processing Speed Increase' }
      ]
    },
    {
      title: 'Consciousness Studies',
      description: 'Empirical research into consciousness patterns and their technological applications.',
      metrics: [
        { value: '50TB', label: 'Data Analyzed Daily' },
        { value: '95%', label: 'Prediction Accuracy' }
      ]
    }
  ];

  const publications = [
    'Quantum Consciousness Integration Protocols',
    'Neural Pattern Recognition in Distributed Systems',
    'Consciousness Mapping Through Advanced AI',
    'Biofeedback Systems in Quantum Computing'
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="rounded-xl border border-white/10 bg-gradient-to-br from-pink-500/10 to-purple-500/10 p-4 sm:p-6 backdrop-blur-sm">
        <h2 className="mb-4 text-xl font-bold text-white">Research & Methodology</h2>
        <p className="text-white/90 leading-relaxed">
          Our research combines neuroscience, quantum computing, and consciousness studies. 
          Through rigorous methodology and data-driven analysis, we're advancing the 
          understanding of human-technology integration.
        </p>
      </div>

      {/* Research Areas Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {researchAreas.map((area) => (
          <ResearchArea key={area.title} {...area} />
        ))}
      </div>

      {/* Research Methodology */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-4 sm:p-6 backdrop-blur-sm">
        <h3 className="mb-6 text-lg font-bold text-white">Research Methodology</h3>
        <div className="space-y-6">
          <MethodologyStep 
            number="1"
            title="Data Collection"
            description="Advanced sensors and quantum detectors gather consciousness pattern data"
          />
          <MethodologyStep 
            number="2"
            title="Quantum Analysis"
            description="Quantum computing algorithms process multi-dimensional data sets"
          />
          <MethodologyStep 
            number="3"
            title="Pattern Recognition"
            description="AI systems identify consciousness patterns and correlations"
          />
          <MethodologyStep 
            number="4"
            title="Validation"
            description="Rigorous testing and peer review of findings"
          />
        </div>
      </div>

      {/* Publications */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-4 sm:p-6 backdrop-blur-sm">
        <h3 className="mb-4 text-lg font-bold text-white">Recent Publications</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {publications.map((pub, index) => (
            <div key={index} className="flex items-center space-x-2 text-white/80">
              <span className="text-pink-400">📄</span>
              <span className="text-sm">{pub}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScienceContent;
