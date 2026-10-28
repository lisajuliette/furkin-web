# Website pages

Every page from the Furkin Website canvas. PNGs are 2x renders at full page height. HTML files open in a browser.


## Landing page

| Page | Image | HTML | Route | Notes |
|---|---|---|---|---|
| Landing, waitlist mode, desktop | [png](png/WebLanding.png) | [html](html/WebLanding.html) | `/` | Launch state `waitlist`. Interactive on the canvas: the colour profile toy works. |
| Landing, waitlist mode, 390 wide | [png](png/WebLandingMobile.png) | [html](html/WebLandingMobile.html) | `/` | Below 860 px. |
| Landing, dark mode | [png](png/WebLandingDark.png) | [html](html/WebLandingDark.html) | `/` | System dark or the footer toggle. Hero shows the dark Today screenshot. |
| Landing, after launch | [png](png/WebLandingLive.png) | [html](html/WebLandingLive.html) | `/` | Launch state `live`: header says Download, hero and final call to action show store badges. |
| Landing, after launch, 390 wide | [png](png/WebLandingLiveMobile.png) | [html](html/WebLandingLiveMobile.html) | `/` |  |

## Waitlist

| Page | Image | HTML | Route | Notes |
|---|---|---|---|---|
| Waitlist form states | [png](png/WebWaitlistStates.png) | [html](html/WebWaitlistStates.html) | `component` | Default, focus, invalid, sending, sent (same message whether or not the email exists), rate limited. |
| Waitlist confirmed | [png](png/WebConfirm.png) | [html](html/WebConfirm.html) | `/waitlist/confirm` | Expired or used token: the same page links to sign up again. |

## App link fallbacks

| Page | Image | HTML | Route | Notes |
|---|---|---|---|---|
| Invite, phone | [png](png/WebInvite.png) | [html](html/WebInvite.html) | `/invite/[code]` | Valid invite from `public_invite_preview`. Open in Furkin tries `furkin://invite/{code}`. Copy button copies the code. `noindex`. |
| Invite expired, used, revoked or unknown | [png](png/WebInviteExpired.png) | [html](html/WebInviteExpired.html) | `/invite/[code]` | One page for all four, so codes can't be probed. |
| Invite on a computer | [png](png/WebInviteDesktop.png) | [html](html/WebInviteDesktop.html) | `/invite/[code]` | Same content, centred. |
| Sign-in link on a phone without the app opening | [png](png/WebAuthMobile.png) | [html](html/WebAuthMobile.html) | `/auth/callback` | Tries `furkin://auth/callback` with the same query string; manual button. |
| Sign-in link opened on a computer | [png](png/WebAuth.png) | [html](html/WebAuth.html) | `/auth/callback` |  |

## Support, legal, 404 and sharing

| Page | Image | HTML | Route | Notes |
|---|---|---|---|---|
| Support | [png](png/WebSupport.png) | [html](html/WebSupport.html) | `/support` | FAQ as `details` elements; the App Store support URL. |
| Privacy policy layout | [png](png/WebPrivacy.png) | [html](html/WebPrivacy.html) | `/privacy` | Terms uses the same layout. Placeholder text in brackets; final text after legal review. |
| Privacy policy, 390 wide | [png](png/WebPrivacyMobile.png) | [html](html/WebPrivacyMobile.html) | `/privacy` |  |
| Page not found | [png](png/Web404.png) | [html](html/Web404.html) | `not-found.tsx` |  |
| Open Graph image | [png](png/WebOGImage.png) | [html](html/WebOGImage.html) | `opengraph-image.tsx` | 1200 x 630. |
