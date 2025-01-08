# ThoughtSeed Digital Consciousness Expedition - Design Specifications

## Color System

### Primary Colors
```css
/* Core Website Colors */
--primary-blue: #4A90E2;      /* Main interactive elements */
--accent-teal: #50E3C2;       /* Highlights and accents */
--deep-purple: #6B66FF;       /* Special interactions */
--consciousness-gold: #FFD700; /* Achievement indicators */

/* Consciousness Expedition Extensions */
--quantum-field: #1a1a1a;     /* Deep consciousness state */
--ethereal-glow: #00ffff;     /* Energy field indicators */
--awareness-white: #f0f0f0;    /* Consciousness particles */
```

### Environment Colors
```css
--terrain-base: #1a1a1a;      /* Base terrain color */
--fog-color: rgba(0, 0, 0, 0.7); /* Atmospheric fog */
--snow-white: #f0f0f0;        /* Snow particle color */
--glow-blue: #00ffff;         /* Waypoint glow effect */

/* Consciousness-Specific Effects */
--energy-field: rgba(74, 144, 226, 0.3);
--thought-trail: rgba(80, 227, 194, 0.4);
--awareness-pulse: rgba(255, 215, 0, 0.5);
```

### UI Elements
```css
--modal-bg: rgba(10, 10, 10, 0.95);
--text-primary: #ffffff;
--text-secondary: rgba(255, 255, 255, 0.7);
--border-glow: rgba(74, 144, 226, 0.3);

/* Consciousness Interface */
--wisdom-overlay: rgba(10, 10, 10, 0.85);
--insight-highlight: rgba(80, 227, 194, 0.6);
```

## Typography

### Font Families
```css
--font-primary: 'SubjectivitySerif', serif;    /* Wisdom and insights */
--font-secondary: 'Inter', sans-serif;         /* Navigation and interface */
--font-consciousness: 'SubjectivitySerif', serif; /* Special consciousness states */
```

### Scale and Hierarchy
```css
--text-xs: 0.75rem;    /* Subtle consciousness cues */
--text-sm: 0.875rem;   /* Interface elements */
--text-base: 1rem;     /* Main content */
--text-lg: 1.125rem;   /* Important insights */
--text-xl: 1.25rem;    /* Revelations */
--text-2xl: 1.5rem;    /* Major discoveries */
--text-3xl: 1.875rem;  /* Consciousness peaks */
--text-4xl: 2.25rem;   /* Ultimate realizations */
```

## Spatial Design

### Sacred Geometry Grid
```css
/* Fibonacci-based spacing */
--phi: 1.618033988749895;
--phi-small: calc(1rem * var(--phi));
--phi-medium: calc(var(--phi-small) * var(--phi));
--phi-large: calc(var(--phi-medium) * var(--phi));
```

### Consciousness Waypoints
```javascript
const waypointSystem = {
  mainSpacing: 50,        // Base unit spacing
  activationRadius: 10,   // Interaction zone
  hiddenDistance: 75,     // Secret waypoint placement
  energyField: {
    radius: 15,
    intensity: 0.8,
    pulseRate: 1.5
  }
};
```

## Animation and Motion

### State Transitions
```css
--transition-consciousness: 700ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-revelation: 1000ms cubic-bezier(0.19, 1, 0.22, 1);
--transition-insight: 300ms cubic-bezier(0.4, 0, 0.2, 1);
```

### Energy Field Effects
```javascript
const energyField = {
  pulseFrequency: 0.5,
  wavelength: 2.0,
  amplitude: 0.3,
  decay: 0.85
};
```

## Interactive Elements

### Modal System
```css
.consciousness-modal {
  --modal-width: 100vw;
  --modal-max-width: 32rem;
  --modal-padding: 1.5rem;
  --modal-border-radius: 0.5rem;
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-glow);
}
```

### Terrain Deformation
```javascript
const terrainSystem = {
  resolution: 128,
  amplitude: 2.5,
  persistence: 0.5,
  scale: 100,
  deformation: {
    radius: 5,
    strength: 0.3,
    memory: 0.7
  }
};
```

## Audio Landscape

### Consciousness Harmonics
```javascript
const audioSystem = {
  masterVolume: 1.0,
  meditation: 0.7,
  insights: 0.8,
  ambient: 0.5,
  frequencies: {
    theta: 4.5,
    alpha: 10.0,
    beta: 15.0,
    gamma: 40.0
  }
};
```

## Performance Guidelines

### Optimization Targets
```javascript
const performance = {
  targetFPS: 60,
  minAcceptable: 30,
  loadingThresholds: {
    initial: 3000,    // ms
    texture: 500,     // ms
    model: 1000,      // ms
    audio: 2000       // ms
  }
};
```

## Responsive Design

### Consciousness Breakpoints
```css
--breakpoint-sm: 640px;  /* Mobile consciousness */
--breakpoint-md: 768px;  /* Tablet awareness */
--breakpoint-lg: 1024px; /* Desktop insight */
--breakpoint-xl: 1280px; /* Expanded consciousness */
--breakpoint-2xl: 1536px; /* Full enlightenment */
```

## Achievement System

### Progress Tracking
```typescript
interface ConsciousnessProgress {
  discoveredWaypoints: number[];
  energyFields: Map<string, number>;
  insightLevels: {
    basic: number;
    intermediate: number;
    advanced: number;
    master: number;
  };
  completionMetrics: {
    exploration: number;
    understanding: number;
    mastery: number;
  };
}
```

---

### Version Information
- Version: 2.0.0
- Last Updated: 2025-01-08
- Author: ThoughtSeed Design Team