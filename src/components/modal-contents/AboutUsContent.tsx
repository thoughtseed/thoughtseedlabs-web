import React from 'react';

const TeamMember = ({ name, role, image }: { name: string; role: string; image?: string }) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .slice(0, 2)
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="group relative overflow-hidden rounded-xl bg-white/10 p-6 transition-all hover:bg-white/20">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-4">
          <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-white/20">
            <svg
              viewBox="0 0 100 100"
              className="absolute h-full w-full"
              style={{ filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.2))' }}
            >
              <defs>
                <linearGradient id={`grad-${getInitials(name)}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#8B5CF6', stopOpacity: 0.6 }} />
                  <stop offset="100%" style={{ stopColor: '#3B82F6', stopOpacity: 0.6 }} />
                </linearGradient>
                <pattern id={`pattern-${getInitials(name)}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="10" cy="10" r="1" fill="rgba(255,255,255,0.3)" />
                </pattern>
              </defs>
              <circle cx="50" cy="50" r="48" fill={`url(#grad-${getInitials(name)})`} />
              <circle cx="50" cy="50" r="48" fill={`url(#pattern-${getInitials(name)})`} />
              <text
                x="50"
                y="50"
                dominantBaseline="middle"
                textAnchor="middle"
                fill="white"
                fontSize="24"
                fontWeight="bold"
                style={{ textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}
              >
                {getInitials(name)}
              </text>
            </svg>
          </div>
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white">{name}</h3>
        </div>
        <p className="text-sm leading-relaxed text-neutral-700 dark:text-white/80">{role}</p>
      </div>
    </div>
  );
};

const AboutUsContent = () => {
  return (
    <div className="space-y-8 pb-8">
      {/* Vision Section */}
      <div className="rounded-lg bg-white/5 p-6 backdrop-blur-sm">
        <h3 className="mb-4 text-xl font-bold text-neutral-900 dark:text-white">Our Vision</h3>
        <p className="text-neutral-700 dark:text-white/80">
          We are innovators and problem solvers, specializing in creating systems that work 
          naturally with human needs. Our expertise spans adaptive technology, smart systems, 
          and intuitive solutions that enhance rather than interrupt natural workflows.
        </p>
      </div>

      {/* Team Section */}
      <div>
        <h3 className="mb-4 text-xl font-bold text-neutral-900 dark:text-white">Our Team</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <TeamMember
            name="Mohankumar V (@7Psychon)"
            role="A pioneering quantum technologist who bridges consciousness studies with cutting-edge innovation, Mohankumar's expertise in biofield research and quantum mechanics drives Thoughtseed's transformative solutions. As a visionary founder, he seamlessly integrates ancient wisdom with modern computational paradigms to create breakthrough technologies at the intersection of human potential and digital evolution."
          />
          <TeamMember
            name="Shesh Iyer (@mrhigh3r)"
            role="A Consciousness Architect and Esoteric Innovator, Shesh leads Thoughtseed's mission to redefine human-technology interaction through immersive digital experiences. His multidisciplinary approach combines ancient mystical principles with advanced technological frameworks, pioneering new pathways in consciousness research and interactive technology design."
          />
        </div>
      </div>

      {/* Expertise Areas */}
      <div className="grid gap-4 md:grid-cols-3">
        {['Adaptive Systems', 'Natural Integration', 'Smart Solutions'].map((area) => (
          <div key={area} className="rounded-lg bg-white/5 p-4 text-center backdrop-blur-sm">
            <div className="mb-2 text-neutral-600 dark:text-white/60">Expertise in</div>
            <div className="text-lg font-semibold text-neutral-900 dark:text-white">{area}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUsContent;
