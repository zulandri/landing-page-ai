---
name: Nocturnal Wonder
colors:
  surface: '#0c1322'
  surface-dim: '#0c1322'
  surface-bright: '#323949'
  surface-container-lowest: '#070e1d'
  surface-container-low: '#141b2b'
  surface-container: '#191f2f'
  surface-container-high: '#232a3a'
  surface-container-highest: '#2e3545'
  on-surface: '#dce2f7'
  on-surface-variant: '#e0bfbd'
  inverse-surface: '#dce2f7'
  inverse-on-surface: '#293040'
  outline: '#a78a88'
  outline-variant: '#584140'
  surface-tint: '#ffb3b0'
  primary: '#ffb3b0'
  on-primary: '#68000f'
  primary-container: '#ff6b6b'
  on-primary-container: '#6d0010'
  inverse-primary: '#ae2f34'
  secondary: '#4edea3'
  on-secondary: '#003824'
  secondary-container: '#00a572'
  on-secondary-container: '#00311f'
  tertiary: '#4cd7f6'
  on-tertiary: '#003640'
  tertiary-container: '#00aac6'
  on-tertiary-container: '#003943'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdad8'
  primary-fixed-dim: '#ffb3b0'
  on-primary-fixed: '#410006'
  on-primary-fixed-variant: '#8c1520'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#acedff'
  tertiary-fixed-dim: '#4cd7f6'
  on-tertiary-fixed: '#001f26'
  on-tertiary-fixed-variant: '#004e5c'
  background: '#0c1322'
  on-background: '#dce2f7'
  surface-variant: '#2e3545'
typography:
  display-hero:
    fontFamily: Rubik
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.02em
  display-hero-mobile:
    fontFamily: Rubik
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Rubik
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Rubik
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: 0em
  headline-sm:
    fontFamily: Rubik
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0em
  body-lg:
    fontFamily: Rubik
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 24px
    letterSpacing: 0.01em
  body-md:
    fontFamily: Rubik
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-lg:
    fontFamily: Rubik
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 18px
    letterSpacing: 0.03em
  label-md:
    fontFamily: Rubik
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: Rubik
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-tablet: 1.25rem
  margin: 1rem
  margin-tablet: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style
The design system balances the playful exuberance of early childhood digital learning with the calm, eye-resting qualities of a premium dark-mode interface. Designed for children, parents, and educators, it departs from harsh light-mode glare in favor of an immersive deep-space canvas punctuated by luminous, candy-toned neon accents.

The aesthetic blends **Playful Tactility** with **Luminous Minimalism**:
- Surfaces stay grounded in rich navy and slate tones to preserve battery and minimize visual fatigue during evening sessions.
- Interactive learning targets use high-energy, friendly neon pigments (coral, mint, cyan, amber, and purple) with soft ambient glows to encourage exploration and reinforce positive game feedback.
- Chunky, friendly, tactile touch zones provide immediate physical and kinetic reassurance for developing motor skills, without feeling immature or cluttered.

## Colors
The color palette uses deep, light-absorbing foundations layered under high-chroma accent spots.

### Canvas & Surface Architecture
- **Base Background:** `#0B0F19` (Canvas void, maximum contrast).
- **Surface Level 1 (Cards, Modules):** `#111827` (Deep Slate-Navy).
- **Surface Level 2 (Elevated Sheets, Modals):** `#1E293B` (Luminous Slate).
- **Surface Level 3 (Pills, Chips, Inset Troughs):** `#243247` (Interactive foundation).
- **Borders & Dividers:** Crisp structural outlines use `#334155` for high-structure borders and `rgba(255, 255, 255, 0.08)` for subtle interior framing.

### The Educational Neon Accents
- **Primary / Action Coral (`#FF6B6B`):** Hero gameplay buttons, lives/hearts, celebration badges, and urgent milestones.
- **Success & Growth Mint (`#10B981`):** Correct answers, reward coins, progress meters, and mastered skills.
- **Energy Amber (`#F59E0B`):** Star ratings, combo multipliers, streaks, and warning hints.
- **Cyber Cyan (`#06B6D4`):** Quests, science/logic categories, active tabs, and informational cues.
- **Playful Purple (`#8B5CF6`):** Creative tasks, music/art categories, and avatar customizations.

### Text Contrast
- **Text High-Contrast:** `#F8FAFC` (Titles, prompts, clear legibility).
- **Text Medium-Contrast:** `#94A3B8` (Captions, subtitles, secondary metadata).
- **Text Low-Contrast:** `#64748B` (Inactive states, footers).

## Typography
**Rubik** serves as the universal typeface across all display, body, and label roles. Its subtly rounded corner radii echo the playful child-centric motif, while its geometric construction guarantees instant readability under low-light and rapid-tap circumstances.

- **Numerals:** Tabular figures are used for timers, score tickers, and level trackers to prevent layout shift during countdowns.
- **Hierarchy:** Font weights lean deliberately heavy (`600` to `800`) on headlines to retain structural presence against dark surfaces and bloom glows.
- **Legibility Guardrails:** Small text is kept to a minimum (`12px` and `10px` used strictly for non-critical parent metadata or auxiliary tags). Active game instructions are never smaller than `16px` (`body-lg`).

## Layout & Spacing
The layout system is tailored for primary handheld use (smartphones and mini-tablets) where children operate with variable tap precision.

- **Grid Model:** A 4-column fluid grid for mobile screens (< 600px) transitions to an 8-column layout on tablets (600px – 1024px).
- **Edge Cushioning:** Outer margins sit at `1rem` on mobile devices to optimize horizontal canvas area while preventing finger slips on bezel-less glass edges.
- **Rhythm & Touch Targets:** Every interactive touch target enforces a strict minimum dimension of 48×48px, with child-centric primary game action targets scaled to 56×56px or larger.
- **Spacing Units:** Distances strictly follow a 4px/8px progressive rhythm to maintain alignment across badge clusters, icon headers, and game grids.

## Elevation & Depth
Depth is created through chromatic radiance and tiered surface luminance rather than muddy black drop shadows.

- **Surface Tiers:** Depth stacks progressively from `#0B0F19` (base viewport), to `#111827` (card panels), to `#1E293B` (interactive modals).
- **Luminous Glows (Active States):** Instead of dark elevation drops, elevated elements project soft ambient light colored by their thematic neon role:
  - Coral focus: `0 8px 24px -4px rgba(255, 107, 107, 0.35)`
  - Mint focus: `0 8px 24px -4px rgba(16, 185, 129, 0.35)`
  - Cyan focus: `0 8px 24px -4px rgba(6, 182, 212, 0.35)`
  - Amber focus: `0 8px 24px -4px rgba(245, 158, 11, 0.35)`
  - Purple focus: `0 8px 24px -4px rgba(139, 92, 246, 0.35)`
- **Dual-Border Definition:** Surface layers feature a dual boundary system—a solid structural perimeter (`#334155`) paired with a 1px inner hairline highlight (`rgba(255, 255, 255, 0.08)`) to mimic smooth, back-lit translucent resin.

## Shapes
The shape language uses pronounced, soft curvature to project a friendly, approachable, and toy-like character that feels safe and fun.

- **Standard Containers (`roundedness: 2` / 0.5rem - 1rem):** Cards, lesson progress modules, and bottom sheet containers use `1rem` (`rounded-lg`) to `1.5rem` (`rounded-xl`) corner radiuses.
- **Interactive Targets & Pills:** Buttons, level badges, coin counters, and micro-chips utilize pill-shaped geometries (`border-radius: 9999px`) to invite confident tactile interaction.
- **Visual Cushions:** No sharp internal corners are permitted. Modal dialogs, popup notifications, and avatar frames must carry generous curving to fit the kid-friendly aesthetic.

## Components

### Buttons
- **Primary Game Action:** Thick, pill-shaped button with a solid neon fill (Coral `#FF6B6B`), high-contrast dark text (`#0B0F19`, font weight `700`), an inset highlight at the top edge (`rgba(255,255,255,0.3)`), and a physical 3D drop-edge of 4px solid `#D94545`. Active state depresses 4px downwards.
- **Secondary Action:** Surface `#1E293B` background with a 1.5px border in `#334155`, text in `#F8FAFC`. On press, shifts border to Cyan `#06B6D4` with Cyan glow.
- **Reward / Bonus Buttons:** Mint `#10B981` background with 3D drop-edge of 4px solid `#059669`.

### Cards
- Built on `#111827` surface with a `1rem` corner radius, surrounded by a 1px border of `#334155` and a soft inner rim of `rgba(255, 255, 255, 0.06)`.
- Cards for unlocked levels feature a subtle radial gradient wash of the chapter color (e.g., Purple `#8B5CF6` at 10% opacity) pooling in the top-right corner.
- Locked cards reduce card background to `#0E131F`, apply monochromatic slate typography (`#64748B`), and remove outer glows.

### Chips & Filters
- Compact pill-shaped modules used for game topics (e.g., "Membaca", "Berhitung", "Sains").
- Default: `#1E293B` background, `#94A3B8` text, no border.
- Selected: Neon tint fill (15% opacity), 1.5px solid neon border matching topic category, and crisp white `#F8FAFC` text with glowing icon accent.

### Inputs & Parental Gate Fields
- Deep `#0B0F19` background inset into `#1E293B` containers, creating a recessed carved appearance.
- Thick 2px border in `#334155`. Upon focus, shifts smoothly to Cyber Cyan `#06B6D4` with `0 0 12px rgba(6, 182, 212, 0.3)`.
- Numerals and characters render in extra-bold tabular formatting at a minimum of `18px`.

### QR Code Container (Parental Pairing / Device Sync)
- Pure white background `#FFFFFF` card with generous padding (`space-lg`), encased inside a `1.5rem` rounded dark slate container (`#1E293B`).
- Avoids inverted dark QR patterns to guarantee high camera readability across any phone model.
- Framed by a soft Cyber Cyan `#06B6D4` glowing halo around the white card to visually tie the utility component back into the glowing dark mode environment.

### Checkboxes, Radio & Multi-Choice Options
- Extra-large 28×28px circular selection controls.
- Unchecked: `#1E293B` surface with a 2px `#334155` border.
- Checked: Radiant Mint `#10B981` fill with an inset bold white checkmark icon, casting a localized `0 0 12px rgba(16, 185, 129, 0.5)` halo.

### Progress Meters & Star Containers
- Troughs set to `#0B0F19` with rounded pill terminations.
- Filled tracks leverage linear gradients (`#10B981` to `#06B6D4` or `#FF6B6B` to `#F59E0B`) with an animated glowing leading head.
- Star reward holders use `#1E293B` with high-visibility Amber `#F59E0B` fills when unlocked.