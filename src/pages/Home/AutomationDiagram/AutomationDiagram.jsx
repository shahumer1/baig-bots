import { useEffect, useRef } from "react";
import "./AutomationDiagram.css";

function AutomationDiagram() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    let active = true;
    let dispose;

    import("./AutomationScene")
      .then(({ mountAutomationScene }) => {
        if (!active) return;
        try {
          dispose = mountAutomationScene(container);
        } catch (error) {
          console.error("Unable to start the 3D hero scene", error);
          container.classList.add("is-unavailable");
        }
      })
      .catch((error) => {
        if (!active) return;
        console.error("Unable to load the 3D hero scene", error);
        container.classList.add("is-unavailable");
      });

    return () => {
      active = false;
      dispose?.();
      container.classList.remove("is-unavailable");
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="automation-diagram"
      role="img"
      aria-label="A three-dimensional Baig Bots system connects AI, web, cloud and growth through a flowing stream of data"
    >
      <div className="automation-fallback">
        <span>BAIG BOTS</span>
        <strong>One connected solution</strong>
      </div>
    </div>
  );
}

export default AutomationDiagram;
