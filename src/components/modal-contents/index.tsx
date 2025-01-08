import React from 'react';
import AboutUsContent from './AboutUsContent.tsx';
import ContactContent from './ContactContent.tsx';
import ProjectsContent from './ProjectsContent.tsx';
import ServicesContent from './ServicesContent.tsx';
import GeometryContent from './GeometryContent.tsx';
import ApproachContent from './ApproachContent.tsx';
import ScienceContent from './ScienceContent.tsx';
import EngineeringContent from './EngineeringContent.tsx';
import DesignContent from './DesignContent.tsx';
import ArtContent from './ArtContent.tsx';

export { 
  AboutUsContent, 
  ContactContent, 
  ProjectsContent, 
  ServicesContent, 
  GeometryContent,
  ApproachContent,
  ScienceContent,
  EngineeringContent,
  DesignContent,
  ArtContent
};

interface ModalContentMap {
  [key: string]: React.ComponentType<any>;
}

// Modal content mapping - using lowercase keys to match App.jsx section names
const MODAL_CONTENT_MAP: ModalContentMap = {
  // Primary Navigation
  'our approach': ApproachContent,
  'services': ServicesContent,
  'projects': ProjectsContent,
  'about us': AboutUsContent,
  'contact us': ContactContent,

  // Secondary Navigation
  'science': ScienceContent,
  'engineering': EngineeringContent,
  'design': DesignContent,
  'art': ArtContent,

  // Hidden Easter Eggs
  'foundation of consciousness': ({ ...props }) => <GeometryContent type="foundation" {...props} />,
  'stability of mind': ({ ...props }) => <GeometryContent type="stability" {...props} />,
  'balance of thought': ({ ...props }) => <GeometryContent type="balance" {...props} />,
  'harmony of being': ({ ...props }) => <GeometryContent type="harmony" {...props} />,
  'infinite potential': ({ ...props }) => <GeometryContent type="potential" {...props} />
};

export { MODAL_CONTENT_MAP };
