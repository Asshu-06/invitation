# The Wedding Unfolded

# Build a Premium Interactive Indian Wedding Invitation Website

Act as a senior frontend developer, UI/UX designer, and creative animation specialist. Build a complete, production-quality, responsive Indian wedding invitation website using React, Vite, TypeScript, Tailwind CSS, custom CSS, and GSAP.

Do not create just a static invitation card. Build a complete interactive wedding invitation experience.

## 1. Main concept and design direction

Create an elegant, luxurious, traditional Indian wedding invitation website inspired by premium wedding stationery.

Visual theme:
- Deep burgundy and maroon
- Warm ivory and cream
- Champagne gold
- Soft watercolor pink flowers
- Subtle sage green leaves
- Traditional Indian ornamental patterns
- Delicate floral borders and gold detailing

Typography:
- Great Vibes for romantic script headings
- Cormorant Garamond for elegant text
- Playfair Display for section headings
- Cinzel for traditional uppercase labels

The design should feel premium, romantic, sophisticated, and cinematic.

Avoid a generic template appearance, excessive gradients, oversized empty sections, and flat rectangular card designs.

## 2. MOST IMPORTANT: Realistic 3D opening envelope

The first screen must display a realistic, physically layered, closed wedding invitation envelope.

This is the most important feature. Prioritize it before building the other sections.

Create the envelope using HTML elements and CSS 3D transforms rather than using one flat image.

Envelope construction must contain:
1. Back envelope layer.
2. Left triangular side fold.
3. Right triangular side fold.
4. Bottom triangular pocket.
5. Large top triangular closing flap.
6. Beautiful central circular gold wax seal.
7. Invitation card positioned behind the bottom pocket and initially hidden.

Use realistic paper textures, subtle shadows, elegant gold edges, and appropriate perspective.

The envelope must look like a real physical invitation envelope, not a flat rectangle or an ordinary card.

### Opening animation

Use GSAP for a carefully sequenced animation.

Initial state:
- Envelope fully closed.
- Invitation card hidden inside.
- Top flap closed.
- Wax seal visible.
- No automatic opening on page load.

On clicking anywhere on the envelope, the wax seal, or the "OPEN YOUR INVITATION" button:

1. Wax seal reacts and disappears or moves away elegantly.
2. Top triangular flap rotates backward using CSS 3D transforms.
3. Invitation card slides smoothly upward from behind the bottom pocket.
4. Card settles into a beautiful readable position.
5. Background and decorative elements transition smoothly.
6. Reveal the wedding invitation content.

Use proper z-index ordering, transform-origin, perspective, backface-visibility, and clipping layers.

IMPORTANT:
- The invitation card must slide from inside the envelope, not appear suddenly.
- The card must not be clipped by the envelope container while sliding upward.
- The flap must rotate in 3D, not simply fade away.
- The animation must work on desktop and mobile.
- Prevent multiple clicks while the animation is running.
- Add an elegant reset/replay experience if appropriate.
- Do not trigger the opening animation automatically.

## 3. Hero invitation screen

Before opening:
- Full-screen ivory or textured-paper background.
- Centered closed envelope.
- Small decorative floral elements.
- Text: "A NEW CHAPTER BEGINS"
- Text: "OPEN YOUR INVITATION"
- Elegant subtle floating particles.

After opening:
Display the wedding names beautifully:

Arun Sai Durga Reddy

&

Grashma Aniswa

Add:
"Together with our families, we invite you to celebrate our wedding."

Use elegant typography, ornamental dividers, and floral decoration.

## 4. Wedding details

Use a centralized configuration file:

src/data/weddingDetails.ts

Store all wedding information in this file and use it throughout the website.

Groom: Arun Sai Durga Reddy
Bride: Grashma Aniswa

Wedding date: Wednesday, 02 December 2026
Muhurtham time: 04:45 AM
Venue: Sridevi Function Hall A/c
Address: Ramavaram Road, Polamuru

Dinner:
Wednesday, 02 December 2026
6:00 PM onwards
Venue: Sridevi Function Hall A/c

Sender:
K. Arun Sai Durga Reddy (Chinnu)
ANAPARTHI
Cell: 8519892036

Best Compliments:
Kumari Flex
8500235279

IMPORTANT DATE NOTE:
The supplied wording says "Wednesday, 02 December 2026, 04:45 AM" and also "Early hours of Thursday." Do not silently change the date or wording. Keep the date and time in the central configuration so it can be corrected easily.

## 5. Countdown section

Create a live countdown to 02 December 2026 at 04:45 AM.

Display:
- Days
- Hours
- Minutes
- Seconds

Update every second.
Handle the wedding date passing gracefully.

## 6. Sumuhurtham section

Create a beautiful traditional wedding details section.

Include:
- Couple names
- Wedding date
- Muhurtham time
- Floral decorations
- Traditional ornamental separators
- Elegant typography

Make the section feel like a premium printed invitation.

## 7. Venue and directions section

Display:
Sridevi Function Hall A/c
Ramavaram Road, Polamuru

Add a "GET DIRECTIONS" button.

Use a Google Maps directions URL based on the venue name and address. Do not invent exact GPS coordinates.

## 8. Dinner invitation section

Create a separate elegant dinner invitation section.

Details:
Wednesday, 02 December 2026
6:00 PM onwards
Sridevi Function Hall A/c

Maintain the same visual palette and overall design consistency.

## 9. Wedding event timeline

Create a beautiful vertical timeline with elegant floral and gold details.

Use the confirmed wedding information only. Do not invent ceremony times or additional events.

## 10. Photo gallery

Build a responsive wedding photo gallery.

Requirements:
- Beautiful masonry or grid layout.
- Elegant image hover effects.
- Click to open a lightbox.
- Next and previous navigation.
- Close button.
- Keyboard navigation.
- Mobile swipe-friendly interaction if feasible.

Use supplied photographs if available. If no real photographs are supplied, use clearly replaceable placeholders. Do not present stock photographs as the actual couple.

## 11. Background music

Create a small elegant music player.

Requirements:
- Play/pause functionality.
- Mute/unmute.
- Music status indicator.
- Use a local audio asset placeholder.
- Never autoplay music without explicit user interaction.
- Handle missing audio files gracefully.

## 12. Navigation

Create an elegant responsive navigation bar.

Navigation links:
- Home
- Wedding Details
- Venue
- Gallery
- Contact

Navigation should be hidden or transparent over the initial envelope hero and appear elegantly after the hero is passed.

All navigation links must scroll to the correct sections.

Do not create dead links or nonfunctional buttons.

## 13. Closing section

Create a beautiful closing section with:

"With love and blessings, we look forward to celebrating with you."

Display the sender and best compliments information.

Add a "BACK TO TOP" button.

## 14. Technical requirements

Use:
- React
- Vite
- TypeScript
- Tailwind CSS
- GSAP
- GSAP ScrollTrigger
- Lucide React icons

Use reusable components and maintain a clean project structure.

Suggested structure:

src/
  components/
    Envelope/
      Envelope.tsx
      Envelope.css
    Hero/
    Countdown/
    WeddingDetails/
    Venue/
    Dinner/
    Timeline/
    Gallery/
    MusicPlayer/
    Navigation/
    Footer/
  data/
    weddingDetails.ts
  hooks/
  assets/
  App.tsx
  main.tsx

Technical rules:
- Use semantic HTML.
- Use reusable React components.
- Use proper TypeScript types.
- Clean up GSAP timelines and event listeners.
- Avoid unnecessary dependencies.
- Do not require paid APIs.
- Do not require a backend or database.
- Keep wedding data centralized.
- Ensure all buttons and navigation work.

## 15. Responsive design

Test and optimize for:
- 360px mobile
- 375px mobile
- 390px mobile
- 430px mobile
- 768px tablet
- 1024px laptop
- 1440px desktop
- 1920px desktop

The envelope must remain realistic and properly centered at every size.

On mobile, scale the envelope while preserving its proportions and the opening animation.

Prevent horizontal overflow.

## 16. Strict exclusions

DO NOT implement:
- RSVP functionality
- RSVP forms
- Guest registration
- Supabase
- Authentication
- Payment features
- Unnecessary backend services
- Fake guest data

There must be absolutely no RSVP section, button, navigation link, form, database table, or related dependency.

## 17. Implementation workflow

Build the project in this order:

Phase 1:
Create the project structure and implement the complete 3D envelope.

Phase 2:
Implement and test the GSAP envelope-opening animation.

Phase 3:
Implement the hero and wedding details.

Phase 4:
Implement countdown, venue, dinner, and timeline.

Phase 5:
Implement gallery, lightbox, and music player.

Phase 6:
Implement navigation and closing section.

Phase 7:
Perform responsive testing, fix visual issues, and verify all interactions.

IMPORTANT DEVELOPMENT INSTRUCTIONS:

Do not stop after generating a static design.

Actually implement the website, run it, inspect it in the browser, and fix errors.

First verify these three visual states:
1. Closed envelope.
2. Envelope during opening animation.
3. Invitation card fully revealed.

Do not proceed to polish the remaining website until the envelope looks convincing.

Finally:
- Run the production build.
- Fix TypeScript errors.
- Fix console errors.
- Verify all navigation and interactions.
- Report what is implemented and what still needs real assets.

The final result should feel like opening a luxurious physical Indian wedding invitation, followed by exploring a complete, elegant wedding website.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://the-wedding-unfolded.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/68451f08-1a1d-5dac-b121-36501ba66a06).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
