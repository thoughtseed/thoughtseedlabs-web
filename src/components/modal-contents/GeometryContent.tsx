import React from 'react';

const GeometryCard = ({ title, description, icon, color }) => (
  <div className={`group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 sm:p-6 backdrop-blur-sm transition-all hover:bg-white/10`}>
    <div className={`absolute -right-4 -top-4 h-16 w-16 rounded-full bg-gradient-to-br opacity-20 ${color}`} />
    <div className="relative">
      <div className="mb-4 text-3xl">{icon}</div>
      <h3 className="mb-3 text-lg font-bold text-white">{title}</h3>
      <p className="text-sm leading-relaxed text-white/80">{description}</p>
    </div>
  </div>
);

const GeometryContent = ({ type }) => {
  const geometries = {
    foundation: {
      title: 'Foundation of Consciousness',
      description: 'The tetrahedron embodies our foundational technical architecture - four interconnected vertices representing perception, processing, response, and integration. This geometric principle guides our implementation of consciousness-responsive systems.',
      icon: '🔺',
      color: 'from-red-500 to-orange-500'
    },
    stability: {
      title: 'Stability of Mind',
      description: 'The cube represents our six-factor stability framework: data processing, neural mapping, quantum computation, consciousness integration, biofeedback analysis, and system optimization. Each face contributes to a robust, scalable consciousness platform.',
      icon: '⬛',
      color: 'from-purple-500 to-indigo-500'
    },
    balance: {
      title: 'Balance of Thought',
      description: 'The octahedron illustrates our balanced technical approach: input/output, hardware/software, data/intuition, and theory/application. This symmetrical structure ensures comprehensive system integration across all operational domains.',
      icon: '💠',
      color: 'from-blue-500 to-cyan-500'
    },
    harmony: {
      title: 'Harmony of Being',
      description: 'The dodecahedron symbolizes our twelve-point consciousness integration protocol: data collection, neural processing, quantum computation, pattern recognition, feedback analysis, system optimization, consciousness mapping, interface design, performance monitoring, security implementation, scalability planning, and continuous iteration.',
      icon: '🔮',
      color: 'from-green-500 to-emerald-500'
    },
    potential: {
      title: 'Infinite Potential',
      description: 'The icosahedron represents our expansive technical capabilities across twenty distinct domains, from quantum computing to neural networks, from consciousness mapping to system optimization. Each face opens new possibilities in consciousness-technology integration.',
      icon: '✨',
      color: 'from-pink-500 to-rose-500'
    }
  };

  const geometry = geometries[type] || geometries.foundation;

  return (
    <div className="space-y-8">
      {/* Main Geometry Card */}
      <GeometryCard {...geometry} />

      {/* Interactive Visualization */}
      <div className="aspect-square rounded-lg bg-white/5 p-4 sm:p-6 backdrop-blur-sm">
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <div className="mb-4 text-6xl">{geometry.icon}</div>
            <p className="text-sm text-white/60">Interactive 3D model coming soon</p>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        {[
          { label: 'Vertices', value: '4-20' },
          { label: 'Faces', value: '4-20' },
          { label: 'Edges', value: '6-30' }
        ].map((prop) => (
          <div key={prop.label} className="rounded-lg bg-white/5 p-4 text-center backdrop-blur-sm">
            <div className="text-sm text-white/60">{prop.label}</div>
            <div className="text-lg font-bold text-white">{prop.value}</div>
          </div>
        ))}
      </div>

      {/* Technical Applications */}
      <div className="rounded-lg bg-white/5 p-4 sm:p-6 backdrop-blur-sm">
        <h3 className="mb-3 sm:mb-4 text-xl font-bold text-white">Technical Applications</h3>
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
          {[
            'Data Structure Optimization',
            'Neural Network Architecture',
            'Quantum State Mapping',
            'System Integration Patterns'
          ].map((app) => (
            <div key={app} className="flex items-center space-x-2 text-white/80">
              <span className="text-purple-400">•</span>
              <span>{app}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GeometryContent;
