import { Project, JournalEntry, ExplorationItem, StatItem } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'automotive-motion',
    title: 'Automotive Motion',
    category: 'Interactive & 3D Experience',
    year: '2026',
    span: 'md:col-span-7',
    aspect: 'aspect-[16/10]',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1200&auto=format&fit=crop',
    description: 'An immersive digital showroom featuring real-time WebGL rendering, custom audio synthesizers, and fluid motion design for high-performance electric vehicles.',
    client: 'Apex Motors GmbH',
    role: 'Lead Interactive Developer',
    tech: ['Three.js', 'React', 'GSAP', 'WebGL', 'Tailwind CSS'],
    link: 'https://github.com/rohanshah'
  },
  {
    id: 'urban-architecture',
    title: 'Urban Architecture',
    category: 'Spatial & Digital Identity',
    year: '2025',
    span: 'md:col-span-5',
    aspect: 'aspect-[4/3]',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop',
    description: 'A minimalist architectural portfolio highlighting brutalist form and light studies with micro-interactions and smooth page routing.',
    client: 'Monolith Studio Tokyo',
    role: 'Creative Technologist',
    tech: ['React', 'Framer Motion', 'Tailwind CSS', 'Next.js'],
    link: 'https://github.com/rohanshah'
  },
  {
    id: 'human-perspective',
    title: 'Human Perspective',
    category: 'Editorial & Typography',
    year: '2025',
    span: 'md:col-span-5',
    aspect: 'aspect-[4/3]',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop',
    description: 'Experimental portrait gallery exploring expressive typography pairings, variable fonts, and human emotion through monochrome imagery.',
    client: 'Vogue Design Lab',
    role: 'Art Director & Frontend',
    tech: ['TypeScript', 'GSAP ScrollTrigger', 'CSS Grid'],
    link: 'https://github.com/rohanshah'
  },
  {
    id: 'brand-identity',
    title: 'Brand Identity',
    category: 'System & Branding',
    year: '2026',
    span: 'md:col-span-7',
    aspect: 'aspect-[16/10]',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    description: 'A comprehensive design system and generative brand identity built for a global generative AI research institute.',
    client: 'Aetheria AI Lab',
    role: 'Brand Systems Architect',
    tech: ['Design Systems', 'React', 'SVG Motion', 'Tailwind'],
    link: 'https://github.com/rohanshah'
  }
];

export const JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: 'future-of-micro-interactions',
    title: 'The Invisible Craft of Micro-Interactions in Modern Web',
    excerpt: 'Exploring how subtle motion, haptics, and spring physics elevate digital products from functional to unforgettable.',
    content: `When we talk about digital craft, we often highlight big visual reveals or hero layouts. But true magic lies in the invisible margins: the spring of a button release, the 200ms easing of an accordion, or the gentle inertia of a custom scroll cursor.

Micro-interactions act as the tactile feedback loop of the web. They reassure the user that the system is responsive, predictable, and alive.

Key principles when designing micro-interactions:
1. Intentionality over Flashiness: Every keyframe should communicate state or affordance.
2. Physics-Based Motion: Utilize stiffness and damping over rigid duration-based linear timelines.
3. Performance First: Stick to transform and opacity changes to prevent layout thrashing and maintain 60fps across mobile displays.`,
    date: 'AUG 02, 2026',
    readTime: '4 MIN READ',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600&auto=format&fit=crop',
    category: 'Design Engineering'
  },
  {
    id: 'designing-for-spatial-canvas',
    title: 'Designing for the Infinite Spatial Canvas',
    excerpt: 'Rethinking responsive breakpoints when screens expand into multi-layered 3D spatial viewports.',
    content: `The modern browser is no longer a static document viewport; it is an infinite spatial canvas. With WebGL, GLSL shaders, and hardware-accelerated CSS, we can layer depth, focus blur, and ambient particle fields behind interface cards.

By keeping backgrounds translucent (using backdrop-filters and low-opacity surface fills), content floats naturally over cosmic or generative environments.

This creates a sense of continuous space as the user scrolls, grounding the navigation in a single, immersive universe.`,
    date: 'JUL 18, 2026',
    readTime: '6 MIN READ',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop',
    category: 'Spatial UI'
  },
  {
    id: 'fullstack-creativity-with-ai',
    title: 'Fullstack Creativity: Bridging Code and Art',
    excerpt: 'How engineers in Nepal and globally are combining generative tools, web standards, and craftsmanship to build new products.',
    content: `Building products from Kathmandu to global audiences requires an end-to-end mindset. You cannot isolate frontend aesthetic from backend latency, nor brand narrative from user experience.

When code and typography sync seamlessly, users feel a sense of clarity. From custom video streaming pipelines with HLS to fluid GSAP scroll triggers, engineering serves as the engine for creative expression.`,
    date: 'JUN 29, 2026',
    readTime: '5 MIN READ',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop',
    category: 'Thoughts'
  },
  {
    id: 'typography-as-architecture',
    title: 'Typography as Spatial Architecture',
    excerpt: 'Combining expressive display serifs with crisp sans-serif bodies to guide human attention.',
    content: `Typography is the architecture of thought. Pairing standard geometrical sans-serifs like Inter with expressive display italic serifs like Instrument Serif creates a rich rhythm between functional density and emotional resonance.

By balancing tight uppercase tracking for eyebrows with wide display typography for headings, we build a visual hierarchy that feels both modern and timeless.`,
    date: 'MAY 14, 2026',
    readTime: '3 MIN READ',
    image: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?q=80&w=600&auto=format&fit=crop',
    category: 'Typography'
  }
];

export const EXPLORATIONS: ExplorationItem[] = [
  {
    id: 'exp-1',
    title: 'Orbital Mesh',
    category: '3D & Generative',
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=600&auto=format&fit=crop',
    likes: 342,
    rotation: '-rotate-3',
    column: 1
  },
  {
    id: 'exp-2',
    title: 'Prismatic Light Study',
    category: 'Shader Art',
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=600&auto=format&fit=crop',
    likes: 512,
    rotation: 'rotate-2',
    column: 2
  },
  {
    id: 'exp-3',
    title: 'Fluid Chroma Sculpture',
    category: 'Motion Graphics',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=600&auto=format&fit=crop',
    likes: 289,
    rotation: 'rotate-1',
    column: 1
  },
  {
    id: 'exp-4',
    title: 'Brutalist Interface Concept',
    category: 'UI Concept',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=600&auto=format&fit=crop',
    likes: 421,
    rotation: '-rotate-2',
    column: 2
  },
  {
    id: 'exp-5',
    title: 'Neon Cybernetics',
    category: 'Digital Art',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop',
    likes: 610,
    rotation: '-rotate-1',
    column: 1
  },
  {
    id: 'exp-6',
    title: 'Cosmic Topography',
    category: 'Generative Landscape',
    image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=600&auto=format&fit=crop',
    likes: 478,
    rotation: 'rotate-3',
    column: 2
  }
];

export const STATS: StatItem[] = [
  {
    id: 'stat-exp',
    value: 20,
    suffix: '+',
    label: 'Years Experience',
    description: 'Combining creative direction, digital craft, and system architecture.'
  },
  {
    id: 'stat-projects',
    value: 95,
    suffix: '+',
    label: 'Projects Done',
    description: 'Shipped high-impact digital experiences for worldwide clients.'
  },
  {
    id: 'stat-clients',
    value: 200,
    suffix: '%',
    label: 'Satisfied Clients',
    description: 'Exceeding expectations through relentless focus on quality & speed.'
  }
];
