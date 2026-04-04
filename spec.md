# Rubin's American Donut

## Current State
The landing page has:
- Hero section
- Today's Favorites (individual donuts - display only)
- Popular Packs (Party Donut Boxes & Mini Donut Party Packs with Add to Cart)
- Customization Banner
- Donut Cake Tower section with gallery + pricing tiers
- Footer

Individual donuts currently have "Add to Cart" buttons via DonutCard component.

## Requested Changes (Diff)

### Add
- New **"Shop by Event"** section on the landing page, placed prominently (after the hero, before the menu/donuts section)
- 6 event type cards as clickable blocks: Wedding, Engagement, Corporate Party, Small Gathering, House Parties, Kitty Parties
- Each card has an icon/emoji, event name, and a short tagline (e.g. "Perfect for your big day")
- Clicking an event card scrolls down to the Popular Packs section (or highlights the relevant packages)
- The individual donuts section should be reframed as "Our Flavors" or "Explore Our Donuts" with a subtitle explaining these are the flavors available in packages, NOT sold individually

### Modify
- Rename the "Today's Favorites" section to "Our Flavors" with a subtitle: "Available in all our party packages"
- Remove "Add to Cart" buttons from individual donuts (DonutCard component) -- they are for display only
- The DonutCard should show flavors without a cart button (read-only display)
- Reorder sections: Hero → Shop by Event → Our Flavors → Popular Packs → Customization Banner → Donut Cake Tower → Footer

### Remove
- Remove "Add to Cart" / cart functionality from individual DonutCard components

## Implementation Plan
1. Update LandingPage.tsx:
   - Add EVENTS array with 6 event types (name, emoji, tagline)
   - Add "Shop by Event" section after hero, before donuts section
   - Rename "Today's Favorites" → "Our Flavors" with clarifying subtitle
   - Reorder sections as specified
2. Update DonutCard.tsx: remove Add to Cart button, make it a display-only flavor card
