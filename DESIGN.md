---
name: Technical Support System
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#3e4a3f'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#6e7a6e'
  outline-variant: '#bdcabc'
  surface-tint: '#006d34'
  primary: '#006b33'
  on-primary: '#ffffff'
  primary-container: '#008742'
  on-primary-container: '#f6fff3'
  inverse-primary: '#6cdd8c'
  secondary: '#b90c1e'
  on-secondary: '#ffffff'
  secondary-container: '#dd2e33'
  on-secondary-container: '#fffbff'
  tertiary: '#125cab'
  on-tertiary: '#ffffff'
  tertiary-container: '#3875c6'
  on-tertiary-container: '#fefcff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#89faa5'
  primary-fixed-dim: '#6cdd8c'
  on-primary-fixed: '#00210b'
  on-primary-fixed-variant: '#005226'
  secondary-fixed: '#ffdad7'
  secondary-fixed-dim: '#ffb3ad'
  on-secondary-fixed: '#410004'
  on-secondary-fixed-variant: '#930013'
  tertiary-fixed: '#d5e3ff'
  tertiary-fixed-dim: '#a8c8ff'
  on-tertiary-fixed: '#001b3c'
  on-tertiary-fixed-variant: '#004689'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  mono-label:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  container-max: 1440px
  sidebar-width: 260px
  gutter: 1.5rem
  margin-page: 2rem
  stack-sm: 0.5rem
  stack-md: 1rem
  stack-lg: 2rem
---

## Brand & Style

This design system is built on a **Corporate / Modern** aesthetic with a distinctive "Mediterranean Tech" twist. It prioritizes high-velocity information processing and professional reliability. The brand personality is efficient, authoritative, and vibrant, moving away from the coldness of typical enterprise software by utilizing a high-energy Italian-inspired color palette.

The visual style leverages a "Clean-Vivid" approach: a clinical, white-space-heavy environment punctuated by intense, high-saturation accents. This ensures that technical data remains the focus while the interface feels modern and "tech-forward."

## Colors

The palette is rooted in the "Il Tricolore" and "Azzurro" heritage, repurposed for functional UI feedback. 

- **Primary Green (#008C45):** Represents "Active," "Online," or "Resolved" statuses. It is the primary action color for success states.
- **Secondary Red (#CD212A):** Reserved strictly for "Critical Alerts," "Urgent Tickets," and "System Failures."
- **Tertiary Blue (#0055A4) & Azure (#0092D0):** Used for navigation, links, and informational badges. Blue serves as the grounding professional tone for the sidebar and structural elements.
- **Clean Light Background:** The UI utilizes a layered white and off-white strategy to minimize cognitive load, allowing the vivid accents to guide the user's eye to high-priority tasks.

## Typography

The typography system uses **Inter** for its exceptional legibility in data-dense environments. It is configured with a tight letter-spacing for headlines to maintain a modern, "tech-forward" feel.

- **Headlines:** Use a bold weight to anchor sections of the dashboard.
- **Labels:** Uppercase labels with increased letter spacing are used for table headers and category descriptors to differentiate them from dynamic content.
- **Technical Data:** For ticket IDs, IP addresses, or log snippets, a secondary monospaced font (JetBrains Mono) is introduced to ensure character clarity.

## Layout & Spacing

This design system employs a **Fixed-Fluid Hybrid** grid. The navigation sidebar remains fixed at 260px, while the main content area utilizes a 12-column fluid grid that adapts to screen width.

- **Breakpoints:** 
  - Desktop: 12 columns, 32px margins.
  - Tablet: 6 columns, 24px margins. Sidebar collapses into an icon-only rail or hamburger menu.
  - Mobile: 4 columns, 16px margins.
- **Rhythm:** An 8px linear scale is used for all internal component spacing to maintain a mathematical, precise layout consistent with technical applications.

## Elevation & Depth

Visual hierarchy is achieved through **Tonal Layering** and **Ambient Shadows**. Instead of heavy borders, the design system uses surface contrast to define boundaries.

- **Level 0 (Background):** The base layer uses a slightly off-white (#F8F9FA) to reduce glare.
- **Level 1 (Cards):** Pure white cards with a very soft, diffused shadow (0px 4px 12px rgba(0,0,0,0.05)). This makes status cards appear to "float" slightly above the canvas.
- **High-Contrast Overlays:** Modals and alert banners use a more aggressive elevation (0px 12px 24px rgba(0,0,0,0.1)) to command immediate attention.
- **Depth Tints:** In active states, elements may take on a 2% tint of the primary green or tertiary blue rather than a grey shadow to maintain the vivid brand profile.

## Shapes

The shape language is **Soft (0.25rem / 4px)**. This provides a professional and "engineered" look that feels more precise than rounder, consumer-focused systems. 

- **Primary Components:** Buttons, inputs, and tags use a 4px corner radius.
- **Large Containers:** Dashboard cards use `rounded-lg` (8px) to soften the overall layout.
- **Status Indicators:** Small status pips and circular avatars are the only fully rounded (pill/circle) elements, used to draw the eye through shape contrast.

## Components

- **Buttons:** Primary buttons use a solid Vivid Green background with white text. Danger actions use the Secondary Red. All buttons have a subtle 1px inner border for "tech-forward" crispness.
- **Status Cards:** Feature a vertical "accent bar" on the left edge (Green, Red, or Blue) to indicate status at a glance without reading text.
- **Data Tables:** Clean rows with no vertical borders. Alternating row highlights (2% grey) appear on hover. 
- **Colored Category Tags:** Low-saturation backgrounds with high-saturation text (e.g., a 10% Green tint background with 100% Green text) to ensure readability while maintaining the palette.
- **Alert Badges:** High-contrast circles placed on icons. Use White text on a Red or Blue background. For critical system alerts, use a pulsing animation.
- **Sidebar:** Dark Navy or deep Tertiary Blue background. Icons should be "Duotone" style, using a mix of the primary green and white to highlight the active page.
- **Input Fields:** Use a 1px border (#E0E0E0) that transitions to the Azure Blue on focus, accompanied by a soft glow effect.