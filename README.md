# ThoughtSeed Interactive Experience

An immersive 3D web experience built with React Three Fiber and Three.js that embodies ThoughtSeed's focus on conscious growth and transformation.

## Current Implementation

### Core Experience
- Immersive 3D snow environment with character navigation
- Dynamic snow deformation responding to footsteps
- Cinematic camera following with smooth controls
- Ambient audio with footstep sounds

### Navigation System
- Interactive waypoints arranged in Fibonacci spiral pattern
- Two-layer navigation structure:
  - Inner Circle (Primary Navigation):
    - Our Approach
    - Services
    - Projects
    - About Us
    - Contact Us
  - Outer Circle (Krebs Cycle):
    - Science
    - Engineering
    - Design
    - Art
- Each waypoint features:
  - Custom 3D animated geometric elements
  - Dynamic lighting with unique colors
  - Proximity-based visibility and scaling
  - Floating text labels with outlines

### UI Elements
- Clean, minimal interface with:
  - ThoughtSeed logo
  - Waypoints visibility toggle
  - Movement instructions (WASD/arrow keys for desktop, touch for mobile)
  - Directional hints system
  - Modal system for content display

### Content Structure
Each section contains carefully crafted content about ThoughtSeed:
- Our Approach: Focus on holistic methodology combining science and design
- Services: Comprehensive suite for conscious growth
- Projects: Interactive timeline showcasing transformative work
- About Us: Company introduction and philosophy
- Contact: Connection point for potential clients

### Technical Features
- Responsive design supporting desktop and mobile
- Optimized performance with FPS limiting
- Infinite terrain system with chunk loading/unloading
- Advanced 3D graphics with normal mapping and displacement
- Smooth animations and transitions using GSAP

## Planned Enhancements

### Phase 1 - Core Progress System
Foundation layer focusing on pure functionality:
1. Add to useStore:
   - visitedWaypoints array
   - isCompleted flag
   - waypoint visit tracking functions
2. Create basic numerical counter (x/9)
3. Implement waypoint visit detection
4. Add completion state check

### Phase 2 - Visual Progress Indicator
Transform numerical tracking into visual experience:
1. Create ProgressSymbol component:
   - SVG-based sacred geometry in top-right
   - 9 distinct layers for each waypoint
   - Base layer always visible
   - Additional layers reveal on visits
2. Add visual effects:
   - Glow effect using CSS filters
   - Scale/opacity animations for layer reveals
   - Light fill effect for visited states

### Phase 3 - Completion Rewards
Add polish and celebration elements:
1. CompletionMessage component:
   - Three.js particle system for text
   - Message: "You have awakened all nine seeds of consciousness. Your journey of understanding has just begun."
2. Waypoint transformation:
   - Add texture2 material to shader system
   - Create transition effect from original to texture2
3. Audio and animation:
   - Add completion sound effect
   - Coordinate particle message timing
   - Synchronize texture transitions

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Run the development server:
```bash
npm run dev
```

## Controls
- Desktop: WASD or Arrow keys for movement
- Mobile: Touch and drag for movement
- UI toggles for waypoints and hints
- Click/tap waypoints to view content

## Technologies Used
- React
- Three.js
- React Three Fiber
- GSAP
- Tailwind CSS
- TypeScript
