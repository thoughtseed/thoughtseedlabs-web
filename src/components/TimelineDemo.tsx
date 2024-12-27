import React from "react";
import Image from "./ui/Image";
import { Timeline } from "./ui/timeline";

export function TimelineDemo() {
  const data = [
    {
      title: "2024",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            Launched dynamic terrain deformation system with real-time physics and interactive 3D experiences
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg overflow-hidden h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06)]">
              <video 
                src="/dynamic-terrain-deformation.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
            <Image
              src="/images/logo-dark.png"
              alt="Thoughtseed Logo"
              width={500}
              height={500}
              className="rounded-lg object-contain bg-white h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06)]"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2023",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            Developed advanced 3D web technologies and interactive user experiences
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/images/Origami 1.jpeg"
              alt="Origami Project"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06)]"
            />
            <div className="rounded-lg bg-neutral-100 dark:bg-neutral-800 h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06)] flex items-center justify-center">
              <span className="text-neutral-500 dark:text-neutral-400">Coming Soon</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Key Features",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
            Our latest technological achievements:
          </p>
          <div className="mb-8">
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              ✨ Real-time terrain deformation with physics
            </div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              ✨ Interactive 3D character controls
            </div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              ✨ Dynamic waypoint navigation system
            </div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              ✨ Responsive design with mobile support
            </div>
          </div>
        </div>
      ),
    },
  ];
  
  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
}
