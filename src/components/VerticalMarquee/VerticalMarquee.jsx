import { useEffect, useRef } from "react";
import "./VerticalMarquee.css";

export default function VerticalMarquee({ items, renderItem, direction = "up", paused = false, label }) {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const offsetRef = useRef(0);
  const heightRef = useRef(0);
  const interactionRef = useRef({ hovering: false, dragging: false, pointerId: null, lastY: 0, pauseUntil: 0 });

  function moveBy(delta) {
    const height = heightRef.current;
    if (!height) return;
    offsetRef.current = ((offsetRef.current + delta) % height + height) % height - height;
    trackRef.current.style.transform = `translate3d(0, ${offsetRef.current}px, 0)`;
  }

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let lastTime = 0;
    let frame;
    const styles = getComputedStyle(viewport);
    const durationValue = styles.getPropertyValue("--marquee-duration").trim() || "60s";
    const duration = parseFloat(durationValue) * (durationValue.endsWith("ms") ? 1 : 1000);
    const resize = new ResizeObserver(() => {
      heightRef.current = track.firstElementChild.getBoundingClientRect().height;
      if (heightRef.current) {
        offsetRef.current = ((offsetRef.current % heightRef.current) + heightRef.current) % heightRef.current - heightRef.current;
        track.style.transform = `translate3d(0, ${offsetRef.current}px, 0)`;
      }
    });
    resize.observe(track.firstElementChild);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    observer.observe(viewport);

    function animate(now) {
      const elapsed = lastTime ? Math.min(now - lastTime, 50) : 0;
      const interaction = interactionRef.current;
      if (visible && !document.hidden && !paused && !interaction.hovering && !interaction.dragging && now > interaction.pauseUntil && heightRef.current) {
        const delta = elapsed * heightRef.current / (duration * (reducedMotion.matches ? 2 : 1));
        const height = heightRef.current;
        offsetRef.current = ((offsetRef.current + (direction === "down" ? delta : -delta)) % height + height) % height - height;
        track.style.transform = `translate3d(0, ${offsetRef.current}px, 0)`;
      }
      lastTime = now;
      frame = requestAnimationFrame(animate);
    }
    frame = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resize.disconnect();
    };
  }, [direction, paused]);

  function startDrag(event) {
    if (!event.isPrimary || (event.pointerType === "mouse" && event.button !== 0)) return;
    if (event.target.closest("a, button, input, textarea")) return;
    const interaction = interactionRef.current;
    interaction.dragging = true;
    interaction.pointerId = event.pointerId;
    interaction.lastY = event.clientY;
    event.currentTarget.dataset.dragging = "true";
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function drag(event) {
    const interaction = interactionRef.current;
    if (!interaction.dragging || interaction.pointerId !== event.pointerId) return;
    moveBy(event.clientY - interaction.lastY);
    interaction.lastY = event.clientY;
  }

  function endDrag(event) {
    const interaction = interactionRef.current;
    if (interaction.pointerId !== event.pointerId) return;
    interaction.dragging = false;
    interaction.pointerId = null;
    event.currentTarget.dataset.dragging = "false";
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    if (event.pointerType === "mouse") {
      const bounds = event.currentTarget.getBoundingClientRect();
      interaction.hovering = event.clientX >= bounds.left && event.clientX <= bounds.right && event.clientY >= bounds.top && event.clientY <= bounds.bottom;
    }
  }

  return (
    <div ref={viewportRef} className="vertical-marquee" role="region" tabIndex={0}
      aria-label={`${label}. Drag up or down to explore; use the Up and Down arrow keys.`}
      onPointerEnter={(event) => { if (event.pointerType === "mouse") interactionRef.current.hovering = true; }}
      onPointerLeave={() => { interactionRef.current.hovering = false; }}
      onPointerDown={startDrag} onPointerMove={drag} onPointerUp={endDrag}
      onPointerCancel={endDrag} onLostPointerCapture={endDrag}
      onKeyDown={(event) => {
        if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
        event.preventDefault();
        moveBy(event.key === "ArrowUp" ? 60 : -60);
        interactionRef.current.pauseUntil = event.timeStamp + 1500;
      }}>
      <div ref={trackRef} className="vertical-marquee-track">
        {[0, 1].map((copy) => (
          <div className="vertical-marquee-group" key={copy} aria-hidden={copy === 1 ? true : undefined} inert={copy === 1 ? true : undefined}>
            {items.map((item) => renderItem(item))}
          </div>
        ))}
      </div>
    </div>
  );
}
