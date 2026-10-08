import { useEffect, useRef } from "react";
import logo from "../assets/baig-bots-logo.png";
import { TbBrandOpenai, TbBrandAws, TbBrandAzure } from "react-icons/tb";
import {
  SiClaude, SiGooglegemini, SiElevenlabs, SiDotnet,
  SiTypescript, SiReact, SiCloudflare,
} from "react-icons/si";
import {
  LuStore, LuMessagesSquare, LuChartNoAxesCombined,
  LuShoppingCart, LuMegaphone,
} from "react-icons/lu";
import "./AutomationDiagram.css";

const connectionIds = ["ai", "web", "cloud", "growth"];
const cycleTimes = [7200, 7600, 8000, 7400];
const startOffsets = [0, 1800, 3600, 5400];

function buildRoute(points) {
  const segments = points.slice(1).map((point, index) => ({
    from: points[index],
    to: point,
    length: Math.hypot(point.x - points[index].x, point.y - points[index].y),
  }));
  return {
    segments,
    length: segments.reduce((total, segment) => total + segment.length, 0),
  };
}

function pointOnRoute(route, progress) {
  let distance = route.length * progress;
  for (const segment of route.segments) {
    if (distance <= segment.length) {
      const fraction = segment.length ? distance / segment.length : 0;
      return {
        x: segment.from.x + (segment.to.x - segment.from.x) * fraction,
        y: segment.from.y + (segment.to.y - segment.from.y) * fraction,
      };
    }
    distance -= segment.length;
  }
  return route.segments.at(-1).to;
}

const stacks = [
  {
    id: "ai",
    title: "AI",
    detail: "Intelligence",
    icons: [
      { name: "OpenAI", icon: TbBrandOpenai },
      { name: "Claude", icon: SiClaude },
      { name: "Gemini", icon: SiGooglegemini },
      { name: "ElevenLabs", icon: SiElevenlabs },
      { name: "Retail AI", icon: LuStore },
    ],
  },
  {
    id: "web",
    title: "Web",
    detail: "Development",
    icons: [
      { name: ".NET", icon: SiDotnet },
      { name: "TypeScript", icon: SiTypescript },
      { name: "React", icon: SiReact },
    ],
  },
  {
    id: "cloud",
    title: "Cloud",
    detail: "Computing",
    icons: [
      { name: "AWS", icon: TbBrandAws },
      { name: "Azure", icon: TbBrandAzure },
      { name: "Cloudflare", icon: SiCloudflare },
    ],
  },
  {
    id: "growth",
    title: "Growth",
    detail: "Strategy",
    icons: [
      { name: "Communication", icon: LuMessagesSquare },
      { name: "Analytics", icon: LuChartNoAxesCombined },
      { name: "Sales", icon: LuShoppingCart },
      { name: "Marketing", icon: LuMegaphone },
    ],
  },
];

function Stack({ id, title, detail, icons }) {
  const satellites = (
    <div className="automation-satellites">
      {icons.map(({ name, icon: Icon }) => (
        <span className="automation-satellite" title={name} key={name}>
          <Icon aria-hidden="true" />
        </span>
      ))}
    </div>
  );
  const card = (
    <div className="automation-node">
      <span className="automation-node-copy">
        <strong>{title}</strong>
        <small>{detail}</small>
      </span>
    </div>
  );

  return (
    <div className={"automation-stack automation-stack--" + id} aria-hidden="true">
      {id === "ai" || id === "web" ? satellites : card}
      <span className="automation-stack-stem" />
      {id === "ai" || id === "web" ? card : satellites}
    </div>
  );
}

function AutomationDiagram() {
  const diagramRef = useRef(null);

  useEffect(() => {
    const diagram = diagramRef.current;
    const svg = diagram?.querySelector(".automation-connections");
    if (!diagram || !svg) return undefined;

    let routes = [];
    const measure = () => {
      const bounds = diagram.getBoundingClientRect();
      const coreBounds = diagram.querySelector(".automation-core").getBoundingClientRect();
      const center = (elementBounds) => ({
        x: elementBounds.left - bounds.left + elementBounds.width / 2,
        y: elementBounds.top - bounds.top + elementBounds.height / 2,
      });
      svg.setAttribute("viewBox", "0 0 " + bounds.width + " " + bounds.height);

      routes = connectionIds.map((id, index) => {
        const stack = diagram.querySelector(".automation-stack--" + id);
        const nodeBounds = stack.querySelector(".automation-node").getBoundingClientRect();
        const node = center(nodeBounds);
        const upper = index < 2;
        const left = index % 2 === 0;
        const nodeEntry = {
          x: node.x,
          y: (upper ? nodeBounds.top : nodeBounds.bottom) - bounds.top,
        };
        const exit = {
          x: node.x,
          y: (upper ? nodeBounds.bottom : nodeBounds.top) - bounds.top,
        };
        const entry = {
          x: (left ? coreBounds.left + coreBounds.width * 0.3 : coreBounds.right - coreBounds.width * 0.3) - bounds.left,
          y: (upper ? coreBounds.top : coreBounds.bottom) - bounds.top,
        };
        const elbowY = (exit.y + entry.y) / 2;
        const wire = diagram.querySelector('.automation-route[data-id="' + id + '"]');
        wire.querySelector(".automation-wire").setAttribute(
          "d",
          "M " + exit.x + " " + exit.y +
          " V " + elbowY + " H " + entry.x + " V " + entry.y
        );
        const railBounds = stack.querySelector(".automation-satellites").getBoundingClientRect();
        const railY = (upper ? railBounds.bottom : railBounds.top) - bounds.top;
        const iconRoutes = [...stack.querySelectorAll(".automation-satellite")].map((icon) => {
          const source = center(icon.getBoundingClientRect());
          return {
            name: icon.title,
            element: icon,
            incoming: buildRoute([
              source,
              { x: source.x, y: railY },
              { x: node.x, y: railY },
              nodeEntry,
            ]),
          };
        });
        const outgoing = buildRoute([
          exit,
          { x: exit.x, y: elbowY },
          { x: entry.x, y: elbowY },
          entry,
        ]);
        return {
          packet: wire.querySelector(".automation-packet"),
          node: stack.querySelector(".automation-node"),
          iconRoutes,
          outgoing,
        };
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(diagram);

    const started = performance.now();
    let frame;
    const core = diagram.querySelector(".automation-core");
    const animate = (now) => {
      let receiving = false;
      routes.forEach(({ packet, node, iconRoutes, outgoing }, index) => {
        const elapsed = Math.max(0, now - started) + startOffsets[index];
        const cycle = Math.floor(elapsed / cycleTimes[index]);
        const progress = (elapsed % cycleTimes[index]) / cycleTimes[index];
        const source = iconRoutes[cycle % iconRoutes.length];
        const incoming = progress < 0.43;
        const charging = progress >= 0.43 && progress < 0.54;
        const outgoingProgress = (progress - 0.54) / 0.46;
        const stage = incoming ? "incoming" : charging ? "charging" : "outgoing";
        const point = incoming
          ? pointOnRoute(source.incoming, progress / 0.43)
          : pointOnRoute(outgoing, charging ? 0 : outgoingProgress);

        packet.setAttribute("transform", "translate(" + point.x + " " + point.y + ")");
        packet.style.opacity = charging
          ? 0
          : incoming
            ? Math.min(1, progress * 24)
            : Math.min(1, outgoingProgress * 12, (1 - outgoingProgress) * 12);
        packet.dataset.source = source.name;
        packet.dataset.stage = stage;
        node.classList.toggle("is-energized", progress >= 0.43 && progress < 0.65);
        iconRoutes.forEach(({ element }) => {
          element.classList.toggle("is-source", incoming && element === source.element);
        });
        if (!charging && !incoming && outgoingProgress > 0.9) receiving = true;
      });
      core.classList.toggle("is-receiving", receiving);
      frame = window.requestAnimationFrame(animate);
    };
    frame = window.requestAnimationFrame(animate);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={diagramRef}
      className="automation-diagram"
      role="img"
      aria-label="AI tools, web technology, cloud computing and growth systems connect to one solution"
    >
      <span className="automation-halo" aria-hidden="true" />
      <svg
        className="automation-connections"
        viewBox="0 0 600 520"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {connectionIds.map((id) => (
          <g className="automation-route" data-id={id} key={id}>
            <path className="automation-wire" />
            <g className="automation-packet">
              <circle className="automation-packet-glow" r="13" />
              <circle className="automation-packet-core" r="5" />
            </g>
          </g>
        ))}
      </svg>

      {stacks.map((stack) => <Stack {...stack} key={stack.id} />)}

      <div className="automation-core" aria-hidden="true">
        <div className="automation-core-top">
          <img className="automation-core-logo" src={logo} alt="" />
          <span className="automation-core-bars"><i /><i /><i /></span>
        </div>
        <strong>One connected<br />solution</strong>
        <span className="automation-core-status"><i /> Live sync</span>
      </div>
    </div>
  );
}

export default AutomationDiagram;

