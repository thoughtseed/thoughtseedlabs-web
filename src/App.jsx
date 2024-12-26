import { useEffect, useRef, useState } from "react";
import { isMobile, isTablet } from "react-device-detect";

import Scene from "./Scene";
import WaypointsToggle from "./components/WaypointsToggle";
import InstructionsToggle from "./components/InstructionsToggle";
import Modal from "./components/Modal";
import InfiniteSnowGround from "./components/InfiniteSnowGround";

const SECTION_CONTENT = {
  about: {
    title: "About Thoughtseed",
    content: "Welcome to Thoughtseed, where we cultivate conscious intentions through a unique blend of science, engineering, design, and human connection. Begin your journey of understanding and growth with us."
  },
  science: {
    title: "The Science",
    content: "At Thoughtseed, we transform information into knowledge through systematic understanding. With 24 research papers and over 1.2M data points, we're building a foundation for conscious growth."
  },
  engineering: {
    title: "Engineering Excellence",
    content: "Our technical prowess turns knowledge into utility. Through 37 projects and 142 solutions, we're creating tools that make consciousness accessible and practical."
  },
  design: {
    title: "Design Philosophy",
    content: "We transform utility into behavior through user-centered thinking. With 89 prototypes and 312 user tests, we ensure our solutions resonate with human experience."
  },
  contact: {
    title: "Begin Your Journey",
    content: "Ready to explore conscious intentions? Connect with us to start your Thoughtseed journey and join a community dedicated to mindful growth and development."
  }
};

function App() {
  const tutorialRef = useRef(null);
  const thoughtseedRef = useRef(null);
  const [showWaypoints, setShowWaypoints] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [modalContent, setModalContent] = useState(null);
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    // Show instructions by default, but hide when moving
    const shouldShow = showInstructions && !isMoving;
    tutorialRef.current.style.display = shouldShow ? "block" : "none";
    thoughtseedRef.current.style.display = shouldShow ? "block" : "none";
  }, [showInstructions, isMoving]);

  const handleWaypointClick = (section) => {
    const content = SECTION_CONTENT[section];
    if (content) {
      setModalContent(content);
    }
  };

  return (
    <div className="canvas-wrapper">
      <img src="/images/logo-dark.png" alt="Logo" className="logo" />
      <Scene 
        showWaypoints={showWaypoints} 
        onWaypointClick={handleWaypointClick}
        onMovingChange={setIsMoving}
      />
      <WaypointsToggle onToggle={setShowWaypoints} isActive={showWaypoints} />
      <InstructionsToggle 
        onToggle={setShowInstructions} 
        isActive={showInstructions} 
        isMoving={isMoving}
      />
      
      <Modal
        isOpen={!!modalContent}
        onClose={() => setModalContent(null)}
        title={modalContent?.title}
      >
        {modalContent?.content}
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
              <span>W</span>
              <span>A</span>
              <span>S</span>
              <span>D</span>
            </section>

            <section className="arrow-keys">
              <span>&uarr;</span>
              <span>&larr;</span>
              <span>&darr;</span>
              <span>&rarr;</span>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
