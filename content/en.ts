// Furkin website copy, as designed on the Furkin Website canvas.
// Start apps/web/content/en.ts from this file. No em dashes in copy. Metric units, 24-hour time.

export const site = {
  name: 'Furkin',
  domain: 'furkin.app',
  email: 'lisa@pixelwitch.dev',
  title: 'Furkin: Track and Coordinate Pet Care',
  description: 'Furkin keeps everyone who cares for your pets on the same page: a shared daily list, reminders and who did what, for cats and dogs.',
  tagline: 'Track and coordinate pet care.',
  ogLead: 'Track and coordinate pet care with everyone in your Household.',
  footer: {
    privacy: 'Privacy', terms: 'Terms', support: 'Support',
    copyright: '© {year} Pixel Witch. All rights reserved. KvK 96974990. Made in The Hague, Netherlands.',
    themeLight: 'Light', themeDark: 'Dark', themeGroup: 'Theme',
  },
};

export const nav = {
  how: 'How it works', features: 'Features', support: 'Support',
  ctaWaitlist: 'Get early access', ctaLive: 'Download', home: 'Furkin home',
};

export const hero = {
  label: 'Shared pet care for iPhone and Android',
  title: 'Who fed the cat?',
  lead: "Furkin keeps everyone who cares for your pets on the same page. See what's done, what's due and who did it.",
  liveNote: 'Available on iPhone and Android.',
  stickerFed: 'Fed by Daan · 08:10',
  stickerLogged: 'Dinner logged. Mallow approves.',
  phoneAlt: 'The Furkin Today screen: three jobs left, with breakfast and the morning walk already done by Lisa and Daan',
};

export const waitlist = {
  emailLabel: 'Email', placeholder: 'Your email', button: 'Get early access', sending: 'Sending',
  smallPrint: "We'll email you once when Furkin launches. No spam, unsubscribe any time.",
  invalid: 'That email looks incomplete. Check the part after the @.',
  sentTitle: 'Check your inbox',
  sentBody: 'We sent a link to {email}. Tap it to confirm your spot.',
  rateTitle: 'Too many tries', rateBody: 'Please wait a few minutes and try again.',
  honeypot: 'Leave this empty',
  emailSubject: 'Confirm your spot on the Furkin waitlist',
  // TODO(question): the docs name the subject and not the message. This line exists so the link can be sent.
  emailBody: 'Tap the link to confirm your spot on the Furkin waitlist: {url}',
  confirmTitle: "You're on the list",
  confirmBody: "Thanks for confirming. We'll email you once, when Furkin launches. Until then, give the pets a scratch from us.",
  confirmBack: 'Back to Furkin',
  confirmExpired: "Link expired or already used? Sign up again and we'll send a fresh one.",
};

export const problems = {
  label: 'Sound familiar?',
  title: 'One pet, three people, nobody sure who fed her.',
  items: [
    { icon: 'feed', title: 'The double breakfast', body: 'Two people, one very convincing dog. She ate twice and told nobody.' },
    { icon: 'medication', title: 'The forgotten pill', body: 'Was the 08:00 tablet given? Everyone thinks so. Nobody is sure.' },
    { icon: 'note', title: 'The 2,000-word sitter message', body: "Feeding times, the vet's number and where the lead lives, lost somewhere in a group chat." },
  ],
};

export const how = {
  label: 'How it works',
  title: 'Set it up once. Then just tap Done.',
  steps: [
    { shot: 'A7Routine', alt: "Furkin's routine setup with breakfast, morning walk, dinner and evening walk ticked", title: 'Add your pets and their routine', body: 'Meals, walks, meds and the litter box, with times. Furkin turns them into a daily list.' },
    { shot: 'A8Invite', alt: "Furkin's invite screen with a code, a share link and a QR code", title: 'Invite your people', body: 'Send a link to whoever shares the care. They see the same pets and the same list.' },
    { shot: 'B1DayView', alt: "Furkin's Day view showing the morning's walk, breakfasts and medication done", title: 'Tap Done. Everyone sees it.', body: 'Tap or swipe when a job is done. The whole Household sees who did it, straight away.' },
  ],
};

export const features = {
  label: 'Features',
  title: 'Everything the pets need, in one shared place.',
  items: [
    { shot: 'PGlacierLightToday', alt: 'Today list with done and due jobs', crop: -230, title: 'A shared daily list', body: 'One list for the whole Household, with who did what and when.' },
    { shot: 'B2Guard', alt: 'The warning that Mallow was already fed by Daan at 18:05', crop: -330, title: 'No double dinners', body: 'Log a meal that has already been given and Furkin checks with you first.' },
    { shot: 'C6Health', alt: 'Health records with a deworming due soon', crop: -40, title: 'Health and vet records', body: 'Vaccinations, vet visits and worming, with reminders a week and a day before.' },
    { shot: 'C7Weight', alt: 'Weight chart for Mallow', crop: -60, title: 'Weight over time', body: 'A clear chart and plain words: up 0.2 kg since 3 October.' },
    { shot: 'C10CareGuide', alt: 'Care guide for Mallow and Pepper', crop: -40, title: 'A Care guide for sitters', body: 'Everything a sitter needs on one calm page. Export it as a PDF.' },
    { shot: 'B1DayView', alt: 'Day view by the hour', crop: -230, title: 'List or Day view', body: 'Tick jobs off a list, or see the day by the hour with a line for now.' },
  ],
};

export const toy = {
  label: 'Make it yours',
  title: 'Five colour profiles. Light and dark.',
  lead: 'Everyone in the Household picks their own. Try them on the phone.',
  profileGroup: 'Colour profile', modeGroup: 'Mode', light: 'Light', dark: 'Dark',
  profiles: { glacier: 'Glacier', lavender: 'Lavender Mist', tangerine: 'Tangerine Pop', matcha: 'Matcha', nordic: 'Nordic' },
};

export const cta = {
  title: 'Get Furkin for your Household',
  leadWaitlist: 'Be the first to know when it lands on the App Store and Google Play.',
  leadLive: 'Download it and invite your people in a minute.',
};

export const invite = {
  label: "You're invited",
  title: '{inviter} invited you to help look after {pets}.',
  body: "Join {inviter}'s Household on Furkin to see their daily routine and who did what.",
  step1: 'Get the app', step2: 'Open the invite in Furkin', open: 'Open in Furkin',
  step3: 'Or enter this code in the app', copy: 'Copy', copied: 'Copied', codeNote: 'The code works for 7 days and once.',
  badgeApp: '[Official App Store badge]',
  badgePlay: '[Official Google Play badge]',
  goneTitle: "This invite can't be used any more",
  goneBody: 'Invites last 7 days and work once. Ask the person who invited you to send a new one from the Household tab in Furkin.',
  back: 'Back to Furkin',
};

export const auth = {
  desktopTitle: 'Open this link on your phone',
  desktopBody: "This sign-in link is for the Furkin app. Open the email on the phone where you're signing in and tap the link there.",
  desktopNote: "Nothing happened here, and you're not signed in on this computer. Furkin has no web version.",
  mobileTitle: 'Opening Furkin',
  mobileBody: "If the app didn't open, tap the button. You'll land back in the app, signed in.",
  mobileButton: 'Open Furkin',
  mobileNoApp: 'No app yet? Get it from the App Store or Google Play first, then tap the link in your email again.',
};

export const support = {
  label: 'Support', title: 'How can we help?',
  lead: 'Answers to the common questions. Anything else, email lisa@pixelwitch.dev and a real person replies within two working days.',
  faq: [
    { q: 'Who is Furkin for?', a: "Anyone who shares the care of a cat or dog: couples, families, housemates, and later the sitter or friend who steps in while you're away." },
    { q: 'Does everyone need the app?', a: 'Yes. Each person signs in with their own account so the log can show who did what. Invite them from the Household tab.' },
    { q: 'How do I stop two people feeding the same meal?', a: 'Tap Done when a meal is given. If someone tries to log another meal soon after, Furkin shows who already fed the pet and asks before saving.' },
    { q: 'Can a pet sitter use it?', a: 'Sitter access with start and end dates is coming after launch. Until then, share the Care guide as a PDF.' },
    { q: 'Where is my data stored?', a: 'In the EU (Frankfurt). Only people in your Household can see your pets and logs. The privacy policy has the details.' },
    { q: 'How do I delete my account?', a: 'In the app: Settings › Your profile › Delete account. It explains what happens to your logs and Households before anything is deleted.' },
  ],
  stuckTitle: 'Still stuck?', stuckBody: 'Tell us what happened and which phone you use. A screenshot helps.', stuckButton: 'Email support',
};

export const notFound = {
  title: 'This page wandered off',
  body: "Probably chasing a squirrel. Let's get you back home.",
  button: 'Go to the home page',
};

export const legal = {
  label: 'Legal',
  updated: 'Last updated {date}',
  onThisPage: 'On this page',
  draft: 'Draft for layout. The final text comes from {file} after a legal review.',
  privacyTitle: 'Privacy policy',
  termsTitle: 'Terms',
};
