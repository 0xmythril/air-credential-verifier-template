# Brand Assets Guide for Twitter + Surfshark Integration

## Current Setup
- "Powered by AIR" badge - emphasizes AIR credential verification
- "Twitter + Surfshark VPN" branding badge - shows the partnership
- Clean, minimal UI without images currently

## Recommended Brand Assets to Add

### Option 1: Icon-Based (Recommended for Clean Design)
Add small brand logos to enhance visual recognition without cluttering:

**Suggested Assets:**
```
public/
├── icons/
│   ├── twitter-icon.svg      (Twitter/X official mark - use bird icon)
│   ├── surfshark-icon.svg    (Surfshark logo - shield with shark)
│   └── air-icon.svg          (AIR token icon if not in theme)
```

**Where to get:**
- **Twitter**: https://about.twitter.com/en/who-we-are/brand-toolkit
  - Use the classic bird icon (avoid "X" rebrand if keeping "Twitter" naming)
- **Surfshark**: https://surfshark.com/brand-assets
  - Official Surfshark logo and brand guidelines
- **AIR**: Check existing design system or from MocaNetwork

### Option 2: Enhanced Branding (More Visual Impact)
Add brand badges next to the feature cards:

**Suggested Implementation:**
```
Feature Cards Layout:
┌─────────────────────────────┐
│ 🛡️  Verified & Secure        │
│     Twitter Verification     │ ← Could add Twitter icon here
└─────────────────────────────┘

┌─────────────────────────────┐
│ ⚡  Instant Rewards          │
│     Surfshark VPN Rewards    │ ← Could add Surfshark icon here
└─────────────────────────────┘
```

### Option 3: Full Partnership Badge
Create a custom partnership badge combining Twitter + Surfshark + AIR logos:

```
Example Layout:
[Twitter Bird] + [Surfshark Shield] × [AIR Token]
   "Powered by AIR Credentials"
```

## Implementation Steps

### Step 1: Add SVG Icons to Public Folder
Save brand assets as SVGs in `public/icons/`:
- twitter-icon.svg
- surfshark-icon.svg

### Step 2: Create Icon Component (Optional)
```typescript
// components/BrandIcons.tsx
export const TwitterIcon = () => (
  <img src="/icons/twitter-icon.svg" alt="Twitter" className="h-4 w-4" />
);

export const SurfsharkIcon = () => (
  <img src="/icons/surfshark-icon.svg" alt="Surfshark" className="h-4 w-4" />
);
```

### Step 3: Integrate into UI
Update the branding badge to include icons:

```tsx
<div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 border border-white/10 w-fit">
  <TwitterIcon />
  <span className="text-xs font-medium text-white/70">Twitter</span>
  <span className="text-xs text-white/50">+</span>
  <SurfsharkIcon />
  <span className="text-xs font-medium text-white/70">Surfshark VPN</span>
</div>
```

## Current Status
✅ Branding text in place
✅ Clean layout with "Powered by AIR" + "Twitter + Surfshark VPN"
⏳ Ready for brand assets to be added

## Next Steps (When Assets Available)
1. Place SVG files in `public/icons/`
2. Update branding badge to display logos
3. Optionally enhance feature cards with brand logos
4. Test on different screen sizes for responsiveness

## Notes
- Keep SVGs simple and minimal to avoid visual clutter
- Ensure high contrast for accessibility
- Test icon sizes at different breakpoints (mobile, tablet, desktop)
- Consider adding hover effects to brand logos for interactivity
