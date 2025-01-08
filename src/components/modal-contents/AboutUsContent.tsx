import React from 'react';

const TeamMember = ({ name, role, image }) => (
  <div className="group relative overflow-hidden rounded-xl bg-white/10 p-4 transition-all hover:bg-white/20">
    <div className="flex items-center space-x-4">
      <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-white/20">
        <div className="h-full w-full bg-gradient-to-br from-purple-500/50 to-blue-500/50" />
      </div>
      <div>
        <h3 className="text-lg font-bold text-white">{name}</h3>
        <p className="text-sm text-white/70">{role}</p>
      </div>
    </div>
  </div>
);

const AboutUsContent = () => {
  return (
    <div className="space-y-8">
      {/* Vision Section */}
      <div className="rounded-lg bg-white/5 p-6 backdrop-blur-sm">
        <h3 className="mb-4 text-xl font-bold text-white">Our Vision</h3>
        <p className="text-white/80">
          We are technology integrators and consciousness engineers, specializing in the convergence 
          of AI, biofeedback systems, and smart technology. Our cross-domain expertise spans energy 
          optimization, consciousness technology, and intelligent systems.
        </p>
      </div>

      {/* Team Section */}
      <div>
        <h3 className="mb-4 text-xl font-bold text-white">Our Team</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <TeamMember
            name="Dr. Sarah Chen"
            role="Chief Consciousness Engineer"
          />
          <TeamMember
            name="Alex Rivera"
            role="AI Integration Specialist"
          />
          <TeamMember
            name="Dr. Maya Patel"
            role="Quantum Systems Architect"
          />
          <TeamMember
            name="James Wilson"
            role="Biofeedback Systems Lead"
          />
        </div>
      </div>

      {/* Expertise Areas */}
      <div className="grid gap-4 md:grid-cols-3">
        {['AI Integration', 'Consciousness Engineering', 'Smart Systems'].map((area) => (
          <div key={area} className="rounded-lg bg-white/5 p-4 text-center backdrop-blur-sm">
            <div className="mb-2 text-white/60">Expertise in</div>
            <div className="text-lg font-semibold text-white">{area}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUsContent;
