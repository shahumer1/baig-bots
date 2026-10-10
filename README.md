# Baig Bots

React + Vite website with browser light/dark theme support and a Three.js hero.

## Development

```sh
npm install
npm run dev
npm run build
npm run lint
```

## Source structure

```text
src/
  pages/
    Home/                 # Home entry and its specific sections/3D scene
    Services/             # Services directory
    Contact/              # Contact page
    FAQ/                  # FAQ page
    About/, Portfolio/    # Company pages
    AI/, Chatbots/, ...   # Separate service page folders
    NotFound/             # Unknown route fallback
    routes.js             # Query parameter route registry
  components/
    Button/               # All button variants and CTA links
    NavigationLinks/      # Navbar/footer link rendering
    Navbar/, Footer/, Brand/
    Section/, PageLayout/, PageHeader/
    ContentPage/           # Shared service/company page template
    ContentSection/, FeatureGrid/, InfoCard/, Process/, RelatedPages/
    ServiceCard/          # Reusable service card and expanding action
    ServiceDetails/       # Shared accessible service details dialog
    ContactSection/, FormField/
    FAQSection/, Accordion/, ContactFAQ/
    GraphBackground/, CircuitDots/, TechnologySlider/
    SiteContainer/, SectionEyebrow/, ArrowUpRight/
  hooks/                  # Shared behavior, including service detail dialogs
  content/                # Page copy, service data, industry mappings, navigation links
  assets/                 # Local images/fonts
  theme.css               # Shared palette, fonts and theme tokens
```

Every page has its own entry folder. Reusable components live directly under
`components`, without a `common` subfolder. Page entries compose shared UI;
service/company entries use one `ContentPage` template with data from
`content/siteContent.js`.

## Editing

- Colors, typography and theme settings: `src/theme.css`.
- Written page content: `src/content/siteContent.js`.
- Home service offerings: `src/content/homeServices.js`.
- Industry selections and relevant solutions: `src/content/industries.js`.
- Auto-moving capability columns: `src/pages/Home/ExpertiseWall/`, using the shared `VerticalMarquee` and `InfoCard` components.
- Industry layout: `src/pages/Home/Industries/`; it reuses `ServiceCard` and `ServiceDetails`.
- Navigation: `src/content/navigationLinks.js`.
- Page registrations: `src/pages/routes.js` (URLs use `?page=...`).
- Shared button behavior/styles: `src/components/Button/`.
- Home tunnel geometry and motion: `src/pages/Home/AutomationDiagram/`.

Contact is currently UI-only; the send button stays disabled until submission
is connected. The technology slider repeats its data for seamless scrolling;
its item rendering is defined once.
