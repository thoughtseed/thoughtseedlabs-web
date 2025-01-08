import React from 'react';

const ArtProject = ({ title, description, specs, preview }) => (
  <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 sm:p-6 backdrop-blur-sm transition-all hover:bg-white/10">
    <div className="absolute -right-12 -top-12 w-24 h-24 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full blur-2xl" />
    <div className="relative">
      <div className="mb-4 aspect-video rounded-lg bg-white/5 flex items-center justify-center">
        <div className="text-4xl">{preview}</div>
      </div>
      <h3 className="mb-3 text-lg font-bold text-white">{title}</h3>
      <p className="mb-4 text-sm leading-relaxed text-white/80">{description}</p>
      <div className="grid grid-cols-2 gap-3">
        {specs.map((spec, index) => (
          <div key={index} className="rounded-lg bg-white/5 p-3 backdrop-blur-sm">
            <div className="text-sm font-bold text-emerald-400">{spec.value}</div>
            <div className="text-xs text-white/60">{spec.label}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const TechniqueCard = ({ title, description, icon }) => (
  <div className="flex items-start space-x-4 p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center text-xl">
      {icon}
    </div>
    <div>
      <h4 className="text-white font-medium">{title}</h4>
      <p className="text-sm text-white/60 mt-1">{description}</p>
    </div>
  </div>
);

const ArtContent = () => {
  const artProjects = [
    {
      title: 'Neural Pattern Visualization',
      description: 'Real-time visualization of consciousness patterns through advanced neural networks.',
      preview: '🌊',
      specs: [
        { value: '1M+', label: 'Data Points' },
        { value: '60fps', label: 'Render Speed' }
      ]
    },
    {
      title: 'Quantum Art Generation',
      description: 'Artistic expressions derived from quantum consciousness computations.',
      preview: '✨',
      specs: [
        { value: '1024', label: 'Quantum States' },
        { value: '4K', label: 'Resolution' }
      ]
    },
    {
      title: 'Consciousness Landscapes',
      description: 'Dynamic 3D landscapes generated from collective consciousness data.',
      preview: '🏔️',
      specs: [
        { value: 'Real-time', label: 'Generation' },
        { value: '100K', label: 'Vertices' }
      ]
    }
  ];

  const techniques = [
    {
      title: 'Neural Style Transfer',
      description: 'Applying consciousness patterns to transform visual aesthetics',
      icon: '🎨'
    },
    {
      title: 'Quantum Pattern Synthesis',
      description: 'Generating art from quantum consciousness states',
      icon: '⚛️'
    },
    {
      title: 'Biofeedback Visualization',
      description: 'Converting neural responses into visual elements',
      icon: '📊'
    },
    {
      title: 'Algorithmic Composition',
      description: 'Mathematical beauty derived from consciousness data',
      icon: '🔢'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="rounded-xl border border-white/10 bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-4 sm:p-6 backdrop-blur-sm">
        <h2 className="mb-4 text-xl font-bold text-white">Computational Creativity</h2>
        <p className="text-white/90 leading-relaxed">
          Merging computational creativity with consciousness exploration. Through 
          algorithmic art generation and neural network visualization, we create 
          immersive experiences that reveal the patterns of consciousness.
        </p>
      </div>

      {/* Art Projects Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {artProjects.map((project) => (
          <ArtProject key={project.title} {...project} />
        ))}
      </div>

      {/* Creative Techniques */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-4 sm:p-6 backdrop-blur-sm">
        <h3 className="mb-6 text-lg font-bold text-white">Creative Techniques</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {techniques.map((technique) => (
            <TechniqueCard key={technique.title} {...technique} />
          ))}
        </div>
      </div>

      {/* Creative Process */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-4 sm:p-6 backdrop-blur-sm">
        <h3 className="mb-6 text-lg font-bold text-white">Creative Process</h3>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-green-500/50 via-emerald-500/50 to-transparent" />
          <div className="space-y-6 pl-12">
            <div>
              <h4 className="text-white font-medium">1. Data Collection</h4>
              <p className="text-sm text-white/60 mt-1">Gathering consciousness patterns and neural responses</p>
            </div>
            <div>
              <h4 className="text-white font-medium">2. Pattern Analysis</h4>
              <p className="text-sm text-white/60 mt-1">Processing data through neural networks and quantum algorithms</p>
            </div>
            <div>
              <h4 className="text-white font-medium">3. Visual Synthesis</h4>
              <p className="text-sm text-white/60 mt-1">Converting patterns into visual and interactive elements</p>
            </div>
            <div>
              <h4 className="text-white font-medium">4. Experience Integration</h4>
              <p className="text-sm text-white/60 mt-1">Creating immersive, consciousness-responsive artworks</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtContent;
