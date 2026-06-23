# Lorcana DB Revamp - Design Philosophy

## Chosen Design Approach: **Minimal Elegance**

### Design Movement
**Contemporary Minimalism with Functional Luxury** — inspired by high-end product design (Apple, Figma, Stripe). The interface disappears to let the card artwork shine.

### Core Principles
1. **Content-First**: Cards are the hero; UI serves them, never competes
2. **Breathing Room**: Generous whitespace and deliberate spacing create calm, premium feel
3. **Subtle Depth**: Soft shadows, gentle gradients, and refined typography add dimension without clutter
4. **Purposeful Motion**: Smooth transitions and micro-interactions feel responsive, never gratuitous

### Color Philosophy
- **Primary**: Deep indigo/slate (`#1a1a2e` dark, `#f8f9fa` light) — sophisticated, neutral foundation
- **Accent**: Warm gold (`#d4a574`) — echoes the mystical, card-game aesthetic; used sparingly for CTAs and highlights
- **Secondary**: Cool gray (`#6b7280`) — for supporting text and borders
- **Background**: Near-white light mode (`#fafbfc`), deep charcoal dark mode (`#0f1117`)

**Reasoning**: The color palette is intentionally restrained. Gold accents reference the card game's luxury positioning without overwhelming. The dark mode uses true blacks with careful contrast for readability.

### Layout Paradigm
- **Asymmetric Grid**: Cards flow in a responsive masonry-like grid (not rigid columns)
- **Sticky Header**: Navigation stays accessible; search bar remains visible on scroll
- **Centered Content**: Max-width container (1280px) with generous side margins
- **Vertical Rhythm**: Consistent spacing scale (8px base) for predictable, harmonious layout

### Signature Elements
1. **Elevated Card Component**: Subtle shadow on hover, smooth scale-up, refined border radius
2. **Refined Search Bar**: Integrated into header with icon, smooth focus states
3. **Filter Sidebar**: Collapsible on mobile, always accessible on desktop; uses toggle switches for clean interaction

### Interaction Philosophy
- **Instant Feedback**: Buttons scale slightly on click; search results appear without delay
- **Smooth Transitions**: All state changes (theme, filters, pagination) use 200-300ms easing
- **Hover Rewards**: Cards lift slightly; buttons change color; links underline smoothly
- **Mobile-First**: Touch targets are generous (44px minimum); swipe-friendly interactions

### Animation Guidelines
- **Card Hover**: `transform: translateY(-4px)` + `box-shadow` enhancement (200ms ease-out)
- **Button Press**: `scale(0.98)` on active (150ms ease-out)
- **Theme Toggle**: Smooth opacity transition (300ms) for background/text color shifts
- **Search Results**: Staggered entrance (30ms per item) for visual rhythm
- **Page Transitions**: Fade-in (200ms) for new content

### Typography System
- **Display Font**: `Geist` or `Sohne` (bold, geometric) — for headings and branding
- **Body Font**: `Inter` (clean, neutral) — for all body text and UI labels
- **Hierarchy**:
  - H1: 32px, 700 weight (page titles)
  - H2: 24px, 600 weight (section headers)
  - H3: 18px, 600 weight (card titles)
  - Body: 14-16px, 400 weight (default text)
  - Small: 12px, 500 weight (metadata, labels)

### Brand Essence
**One-liner**: A modern, frictionless card database for collectors who value elegance and efficiency.

**Personality**: Sophisticated, Intuitive, Trustworthy

### Brand Voice
- **Headlines**: Speak directly, no fluff. "Discover Your Next Card" not "Welcome to Lorcana"
- **CTAs**: Action-oriented and clear. "View Card" not "Click Here"
- **Microcopy**: Helpful and concise. "No results found. Try a different search." not "Error: 0 results"

**Example Lines**:
- "Explore the complete Lorcana collection"
- "Filter by rarity, franchise, or ink color"

### Signature Brand Color
**Gold Accent** (`#d4a574`) — represents the premium, collectible nature of trading cards. Used for:
- Active filter buttons
- Hover states on CTAs
- Accent borders on featured cards
- Loading indicators

### Logo & Wordmark
A bold, geometric **"L"** symbol (no text) on transparent background. The letter is constructed from clean lines and subtle curves, evoking both a card edge and a collector's badge. Used in:
- Header (32px)
- Favicon (16px)
- Loading state animation

---

## Implementation Notes
- Use **TailwindCSS** for all styling; avoid custom CSS except for animations
- Leverage **shadcn/ui** components for consistent, accessible UI
- Implement **dark mode** via `next-themes` with smooth transitions
- Build **responsive** design mobile-first (375px → 1920px)
- Use **Framer Motion** for polished micro-interactions
- Fetch from **Lorcana API** with proper error handling and loading states
