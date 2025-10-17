# Surfshark Branch Implementation Notes

## Overview
Successfully created the `surfshark` branch with updated flow for Surfshark VPN referrals with AIR SP rebate offers.

## Changes Made

### 1. Hero Section (GetStartedView/index.tsx)
- Updated title: "Verify your Twitter account with over 100 followers to get 30% rebate in AIR SP for your Surfshark VPN purchase"
- Updated subtitle: "Quick verification. Exclusive AIR rewards for Surfshark subscribers."
- Updated feature cards:
  - Card 1: "Twitter Verification" - Verify account and unlock 30% AIR SP rebate
  - Card 2: "Instant AIR Rewards" - 30% of purchase airdropped as AIR SP tokens

### 2. Verification Modal (VerifierModal.tsx)
- Added state for tracking user's AIR address: `userAirAddress`
- Added `buildReferralUrl()` function that constructs dynamic Surfshark referral URLs
- Extracts user address from verification result: `result.address || result.airAddress`
- Sets referral URL as: `https://get.surfshark.net/aff_c?offer_id=6&aff_id=4253&url_id=1925&aff_unique1=[user_address]`

#### Success Screen
- Title: "Verified! Get 30% AIR SP rebate"
- Copy: "Sign up with this link and we will send you 30% of your purchase airdropped to you in AIR SP"
- Button: "Claim 30% rebate offer"
- Uses dynamic referral URL with user's address

#### Failure Screen
- Title: "Verification did not meet requirements"
- Copy: "Your Twitter account does not meet the 100+ followers requirement. You can still use your referral link, but won't receive the 30% AIR SP rebate benefit."
- Button: "Sign up for Surfshark"
- Still provides referral link (without AIR SP benefit)

#### CTA Button
- Changed from "Verify eligibility" to "Verify Twitter"

## Environment Variables (to be set)
- `NEXT_PUBLIC_ISSUER_URL`: `http://portal.0xmythril.xyz/twitter`
- `NEXT_PUBLIC_VERIFIER_PROGRAM_ID`: [existing value - no change needed]
- `NEXT_PUBLIC_PARTNER_ID`: [existing value - no change needed]

## How It Works

1. User lands on page with Surfshark hero messaging
2. Clicks "Verify Twitter" button
3. Gets redirected to Twitter verification portal (ISSUER_URL)
4. After verification:
   - If successful (compliant): Shows success screen with 30% AIR SP offer and referral link with their address
   - If failed (non-compliant): Shows failure screen, still provides referral link without AIR SP benefit
5. Referral link includes user's AIR address as `aff_unique1` parameter for Surfshark tracking

## Testing

Preview success state:
```
http://localhost:3000?previewSuccess=true
```

Preview failure state:
```
http://localhost:3000?previewFailure=true
```

## Git Info
- Branch: `surfshark`
- Commit: `81f0738` - Initial Surfshark referral flow implementation
- Files modified:
  - `app/(home)/_components/GetStartedView/index.tsx`
  - `app/(home)/_components/GetStartedView/components/VerifierModal.tsx`
