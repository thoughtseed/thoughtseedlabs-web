import { useEffect, useRef, useState } from "react";
import { useStore } from "./store/useStore";
import gsap from "gsap";
import { isMobile, isTablet } from "react-device-detect";
import Scene from "./Scene";
import WaypointsToggle from "./components/WaypointsToggle";
import InstructionsToggle from "./components/InstructionsToggle";
import DirectionalHintToggle from "./components/DirectionalHintToggle";
import DirectionalHint from "./components/DirectionalHint";
import Modal from "./components/Modal";
import InfiniteSnowGround from "./components/InfiniteSnowGround";
import { TimelineDemo } from "./components/TimelineDemo";
import { ProgressCounter } from "./components/ProgressCounter";
import ToggleGroup from "./components/ToggleGroup";

// Waypoint positions for navigation
const INNER_CIRCLE_POSITIONS = [
  { 
    position: [0, 5, -35],  // Start closer to player, towards horizon
    label: 'Our Approach'
  },
  { 
    position: [35, 5, -65],  // Meander right into distance
    label: 'Services'
  },
  { 
    position: [-35, 5, -95], // Meander left deeper
    label: 'Projects'
  },
  { 
    position: [35, 5, -125], // Meander right further
    label: 'About Us'
  },
  { 
    position: [-35, 5, -155], // Final meander left
    label: 'Contact Us'
  }
];

const SECTION_CONTENT = {
  // Inner Circle (Primary Navigation)
  "our approach": {
    title: "Our Approach",
    content: "At Thoughtseed, we believe in a holistic approach that combines scientific rigor with human-centered design. Our methodology is built on the foundation of conscious growth, systematic understanding, and practical application."
  },
  services: {
    title: "Our Services",
    content: "We offer a comprehensive suite of services designed to cultivate conscious intentions. From individual coaching to organizational transformation, our services are tailored to meet your unique needs and goals."
  },
  projects: {
    title: "Featured Projects",
    content: (
      <>
        <p className="mb-8">Explore our portfolio of transformative projects that demonstrate our commitment to conscious growth. Each project showcases our unique blend of science, engineering, design, and human connection.</p>
        <TimelineDemo />
      </>
    )
  },
  "about us": {
    title: "About Thoughtseed",
    content: "Welcome to Thoughtseed, where we cultivate conscious intentions through a unique blend of science, engineering, design, and human connection. Begin your journey of understanding and growth with us."
  },
  "contact us": {
    title: "Connect With Us",
    content: "Ready to explore conscious intentions? Connect with us to start your Thoughtseed journey and join a community dedicated to mindful growth and development."
  },

  // Outer Circle (Krebs Cycle)
  science: {
    title: "The Science of Consciousness",
    content: "At Thoughtseed, we transform information into knowledge through systematic understanding. With extensive research and data-driven insights, we're building a foundation for conscious growth that bridges neuroscience, psychology, and human potential."
  },
  engineering: {
    title: "Engineering for Growth",
    content: "Our technical prowess turns knowledge into practical tools and systems. Through innovative engineering solutions, we're creating frameworks and platforms that make consciousness accessible and measurable."
  },
  design: {
    title: "Design for Human Experience",
    content: "We transform utility into meaningful experiences through user-centered design thinking. Our approach ensures that every interaction and touchpoint resonates with human experience and facilitates genuine transformation."
  },
  art: {
    title: "The Art of Transformation",
    content: "Art is our bridge between science and human experience. Through creative expression and aesthetic innovation, we make complex concepts accessible and create immersive experiences that catalyze personal growth."
  }
};

function App() {
  const tutorialRef = useRef(null);
  const thoughtseedRef = useRef(null);
  const { 
    waypointsVisible, 
    setWaypointsVisible, 
    instructionsVisible, 
    setInstructionsVisible,
    isCompleted,
    setTexture
  } = useStore();
  const [showHints, setShowHints] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [playerPosition, setPlayerPosition] = useState(null);
  const [canShowInstructions, setCanShowInstructions] = useState(true);

  // Handle completion
  useEffect(() => {
    if (isCompleted) {
      setShowCompletionModal(true);
    }
  }, [isCompleted]);

  useEffect(() => {
    let timeoutId;
    if (!isMoving) {
      // When player stops moving, wait 15 seconds before allowing instructions
      timeoutId = setTimeout(() => {
        setCanShowInstructions(true);
      }, 15000);
    } else {
      // When player starts moving, immediately prevent showing instructions
      setCanShowInstructions(false);
      if (timeoutId) clearTimeout(timeoutId);
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isMoving]);

  useEffect(() => {
    // Show instructions by default, but hide when moving or during delay
    const shouldShow = instructionsVisible && !isMoving && canShowInstructions;
    if (tutorialRef.current) {
      tutorialRef.current.style.opacity = shouldShow ? "1" : "0";
      tutorialRef.current.style.visibility = shouldShow ? "visible" : "hidden";
    }
    if (thoughtseedRef.current) {
      thoughtseedRef.current.style.opacity = shouldShow ? "1" : "0";
      thoughtseedRef.current.style.visibility = shouldShow ? "visible" : "hidden";
    }
  }, [instructionsVisible, isMoving, canShowInstructions]);

  const handleWaypointClick = (section) => {
    const content = SECTION_CONTENT[section];
    if (content) {
      setModalContent(content);
    }
  };

  return (
    <div className="canvas-wrapper" style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Scene 
        showWaypoints={waypointsVisible} 
        onWaypointClick={handleWaypointClick}
        onMovingChange={setIsMoving}
        onPositionChange={setPlayerPosition}
      />
      <div className="ui-layer">
        <ProgressCounter />
        <img src="/images/logo-dark-nobg.png" alt="Logo" className="logo" />
        <ToggleGroup>
          <WaypointsToggle onToggle={setWaypointsVisible} isActive={waypointsVisible} />
          <InstructionsToggle 
            onToggle={setInstructionsVisible} 
            isActive={instructionsVisible}
          />
          <DirectionalHintToggle onToggle={setShowHints} isActive={showHints} />
        </ToggleGroup>
      </div>
      <DirectionalHint 
        playerPosition={playerPosition}
        waypoints={INNER_CIRCLE_POSITIONS}
        visible={showHints}
      />
      
      {/* Content Modal */}
      <Modal
        isOpen={!!modalContent}
        onClose={() => setModalContent(null)}
        title={modalContent?.title}
      >
        {modalContent?.content}
      </Modal>

      {/* Completion Modal */}
      <Modal
        isOpen={showCompletionModal}
        onClose={() => {
          setTexture('/images/texture2.png');
          setShowCompletionModal(false);
        }}
        title="Congratulations!"
        className="completion-modal"
      >
        <div className="prose prose-invert max-w-none">
          <p className="text-lg leading-relaxed">
            You've discovered all the waypoints! Your journey through Thoughtseed's landscape of conscious intentions is complete. Each waypoint has revealed a facet of our approach to cultivating mindful growth and transformation.
          </p>
        </div>
      </Modal>

      <div ref={thoughtseedRef} className="thoughtseed-title">
        <div className="main-title">THOUGHTSEED</div>
        <div className="tagline">Inoculating conscious intentions</div>
      </div>
      
      <div ref={tutorialRef} className="tutorial-wrapper">
        {isTablet || isMobile ? (
          <span className="mobile-tutorial">
            Touch and drag on the screen to navigate the character.
          </span>
        ) : (
          <div className="tutorial-keys">
            <section className="wasd-keys">
              <span className="top-key">W</span>
              <div className="bottom-row">
                <span>A</span>
                <span>S</span>
                <span>D</span>
              </div>
            </section>

            <section className="arrow-keys">
              <span className="top-key">&uarr;</span>
              <div className="bottom-row">
                <span>&larr;</span>
                <span>&darr;</span>
                <span>&rarr;</span>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
