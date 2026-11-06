# Cudna & Śmietanowska — design

Autorska strona polskiej pracowni florystycznej, nie sklepu. Web only.

## Identity
- Warm ivory #f8f6f1, olive #475345, sage #e4e8df, burgundy #76515a, charcoal #30392f.
- Cormorant Garamond headlines and wordmark, Manrope body and controls; Polish glyphs.
- Original botanical line logo: two stems sharing one root, serif wordmark and spaced descriptor.
- 8px spacing system, large editorial unboxed sections, hairline dividers, square photos, generous whitespace.

## Layout and scope
- Split hero: large left copy, full-height floral photo right with inset caption.
- Service photographic grid, studio story, filterable inspirations, process, visible example testimonials, sage contact section and FAQ.
- Mobile stacked layout with collapsible navigation. Touch targets, focus rings and reduced-motion support.
- Frontend page in pages/home.tsx composed by pages/index.tsx. Existing API unchanged; no new tables.

## User flows and integrity
- Anchor navigation, category filters, accessible gallery lightbox, service details, FAQ accordions.
- Contact form creates a downloadable brief, does not claim email delivery or availability. No invented contact details or area of service.
- Testimonials clearly marked as fictional examples. No fake ratings, sources, portraits, or press logos.
- Stock photos explicitly labeled inspiration, not verified studio work.
