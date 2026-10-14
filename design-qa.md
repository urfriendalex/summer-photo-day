# Ultra-wide Intro and Landing Design QA

- Source visual truth (broken intro): `/Users/ay/Desktop/Screenshot 2026-09-21 at 22.48.17.png`
- Source visual truth (broken final state): `/Users/ay/Desktop/Screenshot 2026-09-21 at 22.48.21.png`
- Implementation intro screenshot: `/tmp/summer-photo-day-ultrawide-intro-verified.png`
- Implementation final screenshot: `/tmp/summer-photo-day-ultrawide-final-pass.png`
- Combined before/after comparison: `/tmp/summer-photo-day-ultrawide-before-after.png`
- Reference viewport: 3250 × 1290 CSS px; source screenshots: 3440 × 1440 px; implementation screenshots: 3250 × 1290 px; both normalized to 1720 × 720 per panel for the combined comparison
- States: centered intro reveal and completed landing frame

## Full-view comparison evidence

The broken intro used the outer control box for vertical centering, leaving the visible italic ink low and showing the event label on top of the lettering. The corrected intro centers the rendered wordmark track at the viewport midpoint and keeps the event label hidden until the title lands.

The broken final state used a height-driven masthead reserve while title size was width-driven. The corrected ultra-wide breakpoint reserves width-proportional height, keeps the wordmark full-width, places the event label below the main strokes, and separates the nav and carousel. The `g` swash remains behind the carousel by design.

## Focused-region evidence

- Intro track center delta: less than 0.01px at 3250 × 1290.
- Final title bottom: y=672.2; nav begins at y=679.6; carousel begins at y=729.6.
- Event label ends at y=657.2, above the nav.
- No title/nav, label/nav, label/carousel, or nav/carousel collision.
- No horizontal overflow or framework error overlay.

## Required fidelity surfaces

- Fonts and typography: existing display and body fonts, weights, fitted width, and antialiasing remain unchanged.
- Spacing and layout rhythm: intro is optically centered; final ultra-wide masthead, metadata, nav, and carousel occupy distinct vertical bands.
- Colors and visual tokens: unchanged.
- Image quality and asset fidelity: original photography and crops are unchanged; no replacement assets were introduced.
- Copy and content: unchanged; unstable date remains omitted.

## Responsive and interaction verification

- Replayed intro and final states at 390×844, 768×1024, 1440×900, 2048×1152, and 3250×1290.
- Intro ink center delta was 0px at every tested viewport, and the event label remained hidden during the centered reveal.
- Final frames had no label/nav, label/content, or nav/content collision and no horizontal overflow.
- Browser console and framework overlay checks were clean.

## Comparison history

- P1: Intro wordmark was optically low and the event label collided with it. Fixed by centering from the rendered track bounds and delaying the label until the landing frame.
- P1: Final ultra-wide title collided with nav/meta because a height-based reserve diverged from width-fitted type. Fixed with a width-proportional ultra-wide masthead and optical clip offset.
- Post-fix evidence: `/tmp/summer-photo-day-ultrawide-before-after.png`.

## Findings

No actionable P0, P1, or P2 differences remain for the reported intro and final ultra-wide positioning defects.

## Follow-up polish

None required for this scope.

final result: passed
