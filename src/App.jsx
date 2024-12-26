import { useEffect, useRef, useState } from "react";
import { isMobile, isTablet } from "react-device-detect";

import Scene from "./Scene";
import WaypointsToggle from "./components/WaypointsToggle";
import InstructionsToggle from "./components/InstructionsToggle";
import Modal from "./components/Modal";

const SECTION_CONTENT = {
  about: {
    title: "About",
    content: "Welcome to my portfolio! I'm a passionate web developer specializing in creating immersive 3D experiences using Three.js and Next.js."
  },
  projects: {
    title: "Projects",
    content: "Explore my latest projects showcasing interactive 3D graphics, responsive design, and cutting-edge web technologies."
  },
  skills: {
    title: "Skills",
    content: "Proficient in Three.js, React, Next.js, WebGL, and modern web development practices."
  },
  contact: {
    title: "Contact",
    content: "Let's connect! Feel free to reach out for collaborations, opportunities, or just to chat about web development."
  }
};

function App() {
  const tutorialRef = useRef(null);
  const thoughtseedRef = useRef(null);
  const [showWaypoints, setShowWaypoints] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    // Show instructions by default
    tutorialRef.current.style.display = showInstructions ? "block" : "none";
    thoughtseedRef.current.style.display = showInstructions ? "block" : "none";
  }, [showInstructions]);

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
      />
      <WaypointsToggle onToggle={setShowWaypoints} isActive={showWaypoints} />
      <InstructionsToggle onToggle={setShowInstructions} isActive={showInstructions} />
      
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
