import * as THREE from "three";
import logoUrl from "../../../assets/baig-bots-logo.png";

const STAGES = ["BAIG BOTS", "AI + WEB", "CLOUD", "GROWTH"];
const WIDTH = 2.8;
const HEIGHT = 3.4;
const DEPTH = 1.18;
const SPACING = 1.72;

function paletteFromTheme() {
  const style = getComputedStyle(document.documentElement);
  const read = (key) => style.getPropertyValue(key).trim();
  return { primary: read("--color-primary"), hover: read("--color-primary-hover"), cream: read("--color-cream"), black: read("--color-navbar"), footer: read("--color-footer") };
}

function rgba(hex, alpha) {
  const value = Number.parseInt(hex.slice(1), 16);
  return `rgba(${(value >> 16) & 255},${(value >> 8) & 255},${value & 255},${alpha})`;
}

function roundedRectangle(width, height, radius) {
  const path = new THREE.Path();
  const x = -width / 2;
  const y = -height / 2;
  path.moveTo(x + radius, y);
  path.lineTo(x + width - radius, y);
  path.quadraticCurveTo(x + width, y, x + width, y + radius);
  path.lineTo(x + width, y + height - radius);
  path.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  path.lineTo(x + radius, y + height);
  path.quadraticCurveTo(x, y + height, x, y + height - radius);
  path.lineTo(x, y + radius);
  path.quadraticCurveTo(x, y, x + radius, y);
  path.closePath();
  return path;
}

function canvasTexture(width, height, paint, track) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  paint(context, width, height);
  const texture = track(new THREE.CanvasTexture(canvas));
  texture.colorSpace = THREE.SRGBColorSpace;
  return { texture, context, canvas };
}

function labelTexture(text, palette, track) {
  return canvasTexture(1024, 160, (context, width, height) => {
    context.font = '500 128px "Space Grotesk", Arial, sans-serif';
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = palette.cream;
    context.fillText(text, width / 2, height / 2);
  }, track).texture;
}

function binaryTexture(palette, track) {
  const digitColors = [
    palette.cream,
    "#" + new THREE.Color(palette.hover).lerp(new THREE.Color(palette.cream), 0.38).getHexString(),
    "#" + new THREE.Color(palette.primary).lerp(new THREE.Color(palette.cream), 0.16).getHexString(),
    palette.hover,
  ];
  const { texture, context, canvas } = canvasTexture(512, 2048, () => {}, track);
  texture.wrapT = THREE.RepeatWrapping;
  const paint = (step) => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = "600 43px monospace";
    context.textAlign = "center";
    context.textBaseline = "middle";
    for (let row = 0; row < 30; row += 1) {
      for (let column = 0; column < 7; column += 1) {
        const number = (row * 7 + column * 3 + step * (column % 3 + 1)) % 10;
        const colorIndex = (row * 3 + column) % 10;
        context.fillStyle = digitColors[colorIndex < 4 ? 0 : colorIndex < 7 ? 1 : colorIndex < 9 ? 2 : 3];
        context.shadowColor = context.fillStyle;
        context.shadowBlur = colorIndex < 7 ? 3 : 0;
        context.globalAlpha = (row + column) % 5 === 0 ? 0.66 : 0.95;
        context.fillText(String(number), 38 + column * 73, 34 + row * 68);
      }
    }
    context.globalAlpha = 1;
    context.shadowBlur = 0;
    texture.needsUpdate = true;
  };
  paint(0);
  return { texture, paint };
}

export function mountAutomationScene(container) {
  const resources = new Set();
  const track = (resource) => { resources.add(resource); return resource; };
  const palette = paletteFromTheme();
  const flowCycle = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--automation-flow-cycle")) || 8;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
  container.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(12, 11.5, 12.5);
  camera.lookAt(0, 0, 0.5);
  const root = new THREE.Group();
  scene.add(root);
  scene.add(new THREE.AmbientLight(palette.cream, 1.05));
  const key = new THREE.DirectionalLight(palette.cream, 2.8);
  key.position.set(-3, 8, 6);
  scene.add(key);
  const redLight = new THREE.PointLight(palette.hover, 22, 14);
  redLight.position.set(-2, 0, 2);
  scene.add(redLight);
  const rearLight = new THREE.PointLight(palette.primary, 30, 12);
  rearLight.position.set(2, 1, -3);
  scene.add(rearLight);

  const outer = roundedRectangle(WIDTH, HEIGHT, 0.32);
  const inner = roundedRectangle(WIDTH - 0.16, HEIGHT - 0.16, 0.27);
  const shell = new THREE.Shape(outer.getPoints(32));
  shell.holes.push(new THREE.Path(inner.getPoints(32).reverse()));
  const shellGeometry = track(new THREE.ExtrudeGeometry(shell, {
    depth: DEPTH, bevelEnabled: true, bevelSize: 0.025, bevelThickness: 0.025,
    bevelSegments: 4, curveSegments: 24,
  }));
  const rimCurve = new THREE.CatmullRomCurve3(inner.getPoints(32).slice(0, -1).map((p) => new THREE.Vector3(p.x, p.y, DEPTH + 0.035)), true, "centripetal");
  const rimGeometry = track(new THREE.TubeGeometry(rimCurve, 144, 0.016, 8, true));
  const haloGeometry = track(new THREE.TubeGeometry(rimCurve, 144, 0.075, 8, true));
  const effects = [];
  const logo = track(new THREE.TextureLoader().load(logoUrl));
  logo.colorSpace = THREE.SRGBColorSpace;
  const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
  logo.anisotropy = maxAnisotropy;

  STAGES.forEach((name, index) => {
    const stage = new THREE.Group();
    stage.position.z = (1.5 - index) * SPACING;
    root.add(stage);
    const frontMaterial = track(new THREE.MeshPhysicalMaterial({ color: palette.black, metalness: 0.3, roughness: 0.24, clearcoat: 1, clearcoatRoughness: 0.13, emissive: palette.primary, emissiveIntensity: 0.025 }));
    const wallMaterial = track(new THREE.MeshPhysicalMaterial({ color: index === 3 || index === 1 ? palette.primary : palette.footer, emissive: palette.primary, emissiveIntensity: 0.22, metalness: 0.28, roughness: 0.28, clearcoat: 1 }));
    stage.add(new THREE.Mesh(shellGeometry, [frontMaterial, wallMaterial]));
    const rimMaterial = track(new THREE.MeshBasicMaterial({ color: palette.cream, toneMapped: false, transparent: true, opacity: 0.8 }));
    const haloMaterial = track(new THREE.MeshBasicMaterial({ color: new THREE.Color(palette.primary).lerp(new THREE.Color(palette.cream), 0.14), toneMapped: false, transparent: true, opacity: 0.15, blending: THREE.AdditiveBlending, depthWrite: false }));
    stage.add(new THREE.Mesh(rimGeometry, rimMaterial));
    stage.add(new THREE.Mesh(haloGeometry, haloMaterial));

    // Text sits on the actual top surface, so its angle and occlusion match the tunnel.
    const label = track(labelTexture(name, palette, track));
    label.anisotropy = maxAnisotropy;
    const labelMesh = new THREE.Mesh(track(new THREE.PlaneGeometry(index === 0 ? 1.95 : 2.35, 0.39)), track(new THREE.MeshBasicMaterial({ map: label, transparent: true, depthWrite: false, toneMapped: false })));
    labelMesh.rotation.x = -Math.PI / 2;
    labelMesh.position.set(0, HEIGHT / 2 + 0.032, index === 0 ? 0.91 : DEPTH / 2);
    stage.add(labelMesh);
    if (index === 0) {
      const brand = new THREE.Mesh(track(new THREE.PlaneGeometry(0.9, 0.58)), track(new THREE.MeshBasicMaterial({ map: logo, transparent: true, depthWrite: false, toneMapped: false })));
      brand.rotation.x = -Math.PI / 2;
      brand.position.set(0, HEIGHT / 2 + 0.036, 0.38);
      stage.add(brand);
    }
    // Warm interior illumination, without a solid pane blocking the flowing digits.
    const liner = canvasTexture(256, 512, (ctx, w, h) => {
      ctx.fillStyle = rgba(palette.black, 0.70); ctx.fillRect(0, 0, w, h);
      const fill = ctx.createLinearGradient(0, 0, w, h);
      fill.addColorStop(0, rgba(palette.hover, 0.52));
      fill.addColorStop(0.4, rgba(palette.primary, 0.10));
      fill.addColorStop(1, rgba(palette.primary, 0.64));
      ctx.fillStyle = fill; ctx.fillRect(0, 0, w, h);
    }, track).texture;
    const lining = new THREE.Mesh(track(new THREE.PlaneGeometry(WIDTH - 0.21, HEIGHT - 0.21)), track(new THREE.MeshBasicMaterial({ map: liner, transparent: true, opacity: 0.86, depthWrite: false, side: THREE.DoubleSide, toneMapped: false })));
    lining.position.z = 0.04;
    stage.add(lining);
    const stageLight = new THREE.PointLight(palette.hover, 0, 4.5, 2);
    stageLight.position.set(0, 0.3, DEPTH + 0.25);
    stage.add(stageLight);
    effects.push({ frontMaterial, wallMaterial, rimMaterial, haloMaterial, stageLight });
  });

  // The reference's broad floating sheet: seven parallel lanes of changing digits.
  const { texture: dataTexture, paint } = binaryTexture(palette, track);
  dataTexture.anisotropy = maxAnisotropy;
  const dataSheet = new THREE.Mesh(track(new THREE.PlaneGeometry(2.48, 11.8)), track(new THREE.MeshBasicMaterial({ map: dataTexture, transparent: true, opacity: 1, depthWrite: false, side: THREE.DoubleSide, toneMapped: false })));
  dataSheet.rotation.x = -Math.PI / 2;
  dataSheet.position.set(0, -0.12, 0.4);
  root.add(dataSheet);

  // Sparse tiles lie on the same isometric ground plane as the portals.
  const tiles = [];
  for (let x = -12; x <= 12; x += 1) {
    for (let z = -21; z <= 21; z += 1) {
      if ((x * 13 + z * 7) % 11 === 0 || (Math.abs(x) < 4 && Math.abs(z) < 13)) continue;
      tiles.push([x * 0.29, z * 0.29]);
    }
  }
  const grid = new THREE.InstancedMesh(track(new THREE.PlaneGeometry(0.20, 0.20)), track(new THREE.MeshBasicMaterial({ color: palette.hover, transparent: true, opacity: 0.10, depthWrite: false, side: THREE.DoubleSide })), tiles.length);
  const dummy = new THREE.Object3D();
  tiles.forEach(([x, z], index) => {
    dummy.position.set(x, -HEIGHT / 2 - 0.08, z);
    dummy.rotation.x = -Math.PI / 2;
    dummy.updateMatrix();
    grid.setMatrixAt(index, dummy.matrix);
  });
  track(grid);
  root.add(grid);

  // Two restrained interior details echo the reference's sphere and processing core.
  const orbMaterial = track(new THREE.MeshPhysicalMaterial({ color: palette.black, emissive: palette.primary, emissiveIntensity: 0.22, roughness: 0.18, metalness: 0.5 }));
  const orb = new THREE.Mesh(track(new THREE.SphereGeometry(0.36, 32, 24)), orbMaterial);
  orb.position.set(0.75, -1.16, 3.28);
  root.add(orb);
  const orbGlow = new THREE.Mesh(orb.geometry, track(new THREE.ShaderMaterial({
    uniforms: { tint: { value: new THREE.Color(palette.hover).lerp(new THREE.Color(palette.cream), 0.22) } },
    vertexShader: "varying vec3 normalView; varying vec3 directionView; void main() { vec4 p = modelViewMatrix * vec4(position, 1.0); normalView = normalize(normalMatrix * normal); directionView = normalize(-p.xyz); gl_Position = projectionMatrix * p; }",
    fragmentShader: "uniform vec3 tint; varying vec3 normalView; varying vec3 directionView; void main() { float rim = pow(1.0 - max(dot(normalize(normalView), normalize(directionView)), 0.0), 2.5); gl_FragColor = vec4(tint, rim * 0.95); }",
    transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
  })));
  orbGlow.position.copy(orb.position);
  orbGlow.scale.setScalar(1.015);
  root.add(orbGlow);
  const core = new THREE.Group();
  core.position.set(1.03, -0.95, 2.03);
  const coreMaterial = track(new THREE.MeshBasicMaterial({ color: palette.cream, transparent: true, opacity: 0.7, toneMapped: false }));
  for (const radius of [0.16, 0.24, 0.31]) core.add(new THREE.Mesh(track(new THREE.TorusGeometry(radius, 0.008, 6, 48)), coreMaterial));
  const shieldPoints = [[-0.11, 0.11], [0, 0.16], [0.11, 0.11], [0.10, -0.06], [0, -0.15], [-0.10, -0.06], [-0.11, 0.11]];
  const shield = new THREE.Line(track(new THREE.BufferGeometry().setFromPoints(shieldPoints.map(([x, y]) => new THREE.Vector3(x, y, 0.012)))), track(new THREE.LineBasicMaterial({ color: palette.cream, toneMapped: false })));
  core.add(shield);
  const check = new THREE.Line(track(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-0.06, 0, 0.015), new THREE.Vector3(-0.015, -0.045, 0.015), new THREE.Vector3(0.075, 0.065, 0.015)])), shield.material);
  core.add(check);
  root.add(core);

  const resize = () => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    if (!width || !height) return;
    camera.aspect = width / height;
    camera.fov = 35;
    camera.updateProjectionMatrix();
    root.updateMatrixWorld(true);
    const points = [];
    for (const z of [-2.58 - 0.04, 2.58 + DEPTH + 0.04]) {
      for (const x of [-WIDTH / 2 - 0.04, WIDTH / 2 + 0.04]) {
        for (const y of [-HEIGHT / 2 - 0.04, HEIGHT / 2 + 0.07]) points.push(new THREE.Vector3(x, y, z));
      }
    }
    const bounds = () => {
      const projected = points.map((point) => point.clone().project(camera));
      return { left: Math.min(...projected.map((p) => p.x)), right: Math.max(...projected.map((p) => p.x)), bottom: Math.min(...projected.map((p) => p.y)), top: Math.max(...projected.map((p) => p.y)) };
    };
    const initial = bounds();
    const fit = Math.max((initial.right - initial.left) / 1.80, (initial.top - initial.bottom) / 1.72);
    camera.fov = THREE.MathUtils.radToDeg(2 * Math.atan(Math.tan(THREE.MathUtils.degToRad(17.5)) * fit));
    camera.updateProjectionMatrix();
    const fitted = bounds();
    camera.projectionMatrix.elements[8] = (fitted.left + fitted.right) / 2;
    camera.projectionMatrix.elements[9] = (fitted.bottom + fitted.top) / 2;
    camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert();
    renderer.setSize(width, height, false);
    renderer.render(scene, camera);
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);
  resize();
  let visible = true;
  const visibilityObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
  visibilityObserver.observe(container);
  const started = performance.now();
  let previous = 0;
  let lastStep = -1;
  renderer.setAnimationLoop((now) => {
    if (!visible || document.hidden || now - previous < 1000 / 30) return;
    previous = now;
    const elapsed = (now - started) / 1000 * (reducedMotion ? 0.35 : 1);
    const stageDuration = flowCycle / STAGES.length;
    // UV +Y travels along world +Z: rear Growth stage toward the front Baig Bots stage.
    dataTexture.offset.y = (elapsed * SPACING / (stageDuration * 11.8)) % 1;
    const step = Math.floor(elapsed * 0.9);
    if (step !== lastStep) { paint(step); lastStep = step; }
    const sequence = (elapsed / stageDuration) % STAGES.length;
    effects.forEach(({ frontMaterial, wallMaterial, rimMaterial, haloMaterial, stageLight }, index) => {
      const peak = STAGES.length - 1 - index + 0.5;
      const separation = Math.abs(sequence - peak);
      const distance = Math.min(separation, STAGES.length - separation);
      const pulse = Math.exp(-Math.pow(distance / 0.36, 2));
      frontMaterial.emissiveIntensity = 0.025 + pulse * 0.7;
      wallMaterial.emissiveIntensity = 0.22 + pulse * 1.65;
      rimMaterial.opacity = 0.72 + pulse * 0.28;
      haloMaterial.opacity = 0.15 + pulse * 0.68;
      stageLight.intensity = pulse * 15;
    });
    core.rotation.z = elapsed * 0.15;
    renderer.render(scene, camera);
  });

  return () => {
    renderer.setAnimationLoop(null);
    resizeObserver.disconnect();
    visibilityObserver.disconnect();
    resources.forEach((resource) => resource.dispose());
    renderer.dispose();
    renderer.forceContextLoss();
    renderer.domElement.remove();
  };
}
