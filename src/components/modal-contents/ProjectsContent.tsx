import React from 'react';

const ProjectCard = ({ title, description, category, color }) => (
  <div className={`group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:bg-white/10`}>
    <div className={`absolute -right-4 -top-4 h-16 w-16 rounded-full bg-gradient-to-br opacity-20 ${color}`} />
    <div className="relative">
      <div className="mb-2 text-sm font-medium text-white/60">{category}</div>
      <h3 className="mb-2 text-lg font-bold text-white">{title}</h3>
      <p className="text-sm text-white/80">{description}</p>
    </div>
  </div>
);

const ProjectsContent = () => {
  const projects = {
    'Energy & Infrastructure': [
      {
        title: 'Axtech',
        description: 'Enterprise B2B platform revolutionizing infrastructure and energy materials supply chain through AI-optimized ordering systems.',
        color: 'from-blue-500 to-cyan-500'
      },
      {
        title: 'WEGRID',
        description: 'Next-generation AI-powered home optimization system delivering smart energy storage solutions.',
        color: 'from-green-500 to-emerald-500'
      }
    ],
    'Smart Technology': [
      {
        title: 'Thaleos',
        description: 'Comprehensive smart home control system featuring advanced IoT integration and intuitive interfaces.',
        color: 'from-purple-500 to-indigo-500'
      },
      {
        title: 'Instal',
        description: 'Revolutionary installation service platform connecting homeowners with verified providers through AI-powered matching.',
        color: 'from-pink-500 to-rose-500'
      }
    ],
    'Consciousness & Wellness': [
      {
        title: 'Vibrasonix',
        description: 'Advanced vibroacoustic technology ecosystem integrating biofield tuning with digital consciousness mapping.',
        color: 'from-amber-500 to-orange-500'
      },
      {
        title: 'TokenofME',
        description: 'Revolutionary wellness tokenization platform bridging blockchain technology with consciousness metrics.',
        color: 'from-violet-500 to-purple-500'
      }
    ]
  };

  return (
    <div className="space-y-8">
      {/* Project Categories */}
      {Object.entries(projects).map(([category, projectList]) => (
        <div key={category}>
          <h3 className="mb-4 text-xl font-bold text-white">{category}</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {projectList.map((project) => (
              <ProjectCard
                key={project.title}
                title={project.title}
                description={project.description}
                category={category}
                color={project.color}
              />
            ))}
          </div>
        </div>
      ))}

      {/* Project Stats */}
      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {[
          { label: 'Projects', value: '12+' },
          { label: 'Countries', value: '5' },
          { label: 'Team Members', value: '30+' },
          { label: 'Technologies', value: '20+' }
        ].map((stat) => (
          <div key={stat.label} className="rounded-lg bg-white/5 p-4 text-center backdrop-blur-sm">
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-sm text-white/60">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Project Timeline */}
      <div className="relative mt-8 space-y-4">
        <div className="absolute left-4 top-0 h-full w-0.5 bg-gradient-to-b from-purple-500/50 to-transparent md:left-1/2" />
        {[
          { year: '2023', event: 'Launched TokenofME Platform' },
          { year: '2022', event: 'Expanded to European Markets' },
          { year: '2021', event: 'Released Vibrasonix 2.0' },
          { year: '2020', event: 'Founded Thoughtseed' }
        ].map((milestone, index) => (
          <div key={milestone.year} className="relative pl-8 md:ml-1/2 md:pl-12">
            <div className="absolute -left-1.5 top-1.5 h-4 w-4 rounded-full border-2 border-purple-500 bg-neutral-900 md:-left-2" />
            <div className="rounded-lg bg-white/5 p-4 backdrop-blur-sm">
              <div className="text-sm font-medium text-purple-400">{milestone.year}</div>
              <div className="text-white">{milestone.event}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsContent;
