import { FeatureContent } from '@/lib/types/game';

export const FEW_SHOT_EXAMPLES: Record<string, FeatureContent> = {
  Authentication: {
    dangerZone: {
      headline: 'If someone can pretend to be your user, nothing else in your app matters',
      hiddenComplexity:
        'Login looks simple — an email field, a password field, a button. But behind that button is a whole world of things that need to go right: remembering who\'s logged in across page refreshes, making sure "forgot password" links can\'t be guessed, stopping someone from trying a million passwords, and handling what happens when people sign in with Google or GitHub. Every shortcut here is a door left unlocked.',
      failureScenario:
        'You launch your app. 500 people sign up. Everything works great for a few months. Then someone figures out that your "stay logged in" tokens never expire — so a token leaked in a browser extension or shared computer lets them into someone else\'s account permanently. Now you\'re emailing 500 users about a security breach before you\'ve even made revenue.',
      riskLevel: 'critical',
      timeToBreak: '6-18 months before someone finds and exploits a weakness',
      commonMistakes: [
        'Passwords stored in a way that\'s easy to reverse (like a simple scramble instead of a proper one-way lock)',
        '"Stay logged in" tokens that never expire — so a leaked token works forever',
        '"Forgot password" links that follow a guessable pattern',
        'No limit on login attempts — someone can try thousands of passwords per minute',
        'Sign in with Google/GitHub that doesn\'t properly verify the response, letting attackers fake it',
      ],
    },
    auditPrompts: {
      service: [
        {
          title: 'Is your login service set up correctly?',
          prompt:
            'Look at how we\'ve connected our login service (like Clerk, Auth0, or Supabase Auth). Check these things: Do login sessions expire after a reasonable time? When the service sends us updates (webhooks), do we verify they\'re actually from the service? Are the URLs where users get redirected after login locked down to only our site? Is the login service\'s code library up to date? Are we using the service\'s built-in protections or bypassing them anywhere?',
          category: 'security',
          whyItMatters:
            'Even when you use a login service, a bad setup can leave holes. It\'s like having a great lock on your door but leaving the window open.',
        },
        {
          title: 'Can people access pages they shouldn\'t?',
          prompt:
            'Check every page and API endpoint that should require login. Are they actually checking if the user is logged in on the server (not just hiding the link in the menu)? Could someone access another user\'s data by changing a number in the URL? Are admin-only actions actually restricted, or just hidden from the UI?',
          category: 'security',
          whyItMatters:
            'The most common mistake with login services is hiding buttons in the UI but not actually locking down the pages behind them. It\'s like removing the doorknob but not the door.',
        },
        {
          title: 'What happens when someone forgets their password?',
          prompt:
            'Check our password reset setup. Do reset links expire quickly (within an hour)? Does the account lock after too many wrong password attempts? Is email verification required before someone can access the app? When someone types a wrong email on the login page, does the error message reveal whether that email has an account?',
          category: 'security',
          whyItMatters:
            '"Forgot password" is the back door to every account. If someone can guess or intercept a reset link, the actual password doesn\'t matter.',
        },
        {
          title: 'Is login slowing down your app?',
          prompt:
            'Check how our login system affects page speed. Is the app calling the login service on every single page load? Is it caching (remembering) login status so it doesn\'t need to re-check every time? When someone navigates around the app, does each page wait for a login check before showing anything?',
          category: 'performance',
          whyItMatters:
            'Login checks happen on every page. If each check takes an extra half-second because it\'s calling an external service, your whole app feels sluggish.',
        },
      ],
      diy: [
        {
          title: 'Are passwords stored safely?',
          prompt:
            'Look at how our app stores passwords and handles login sessions. Are passwords scrambled using a strong method (like bcrypt or argon2, not just MD5 or basic SHA)? Do "stay logged in" tokens expire and get refreshed? Is there a limit on how many times someone can try to log in before getting temporarily blocked? Show me exactly where in the code each of these happens.',
          category: 'security',
          whyItMatters:
            'If someone gets access to your database, properly scrambled passwords are nearly impossible to reverse. Weakly scrambled ones can be cracked in minutes.',
        },
        {
          title: 'Is "Sign in with Google" secure?',
          prompt:
            'Review our Google/GitHub/social login setup. When someone clicks "Sign in with Google", does our code verify the response is actually from Google (not faked)? Are redirect URLs locked to our domain only? What happens if someone signs up with email and later tries to sign in with Google using the same email — does it merge correctly or create a duplicate account?',
          category: 'security',
          whyItMatters:
            'Social login has a lot of back-and-forth between your app and Google/GitHub. If any step isn\'t verified, someone can fake the process and log in as anyone.',
        },
        {
          title: 'Can "forgot password" be exploited?',
          prompt:
            'Check our password reset flow. Are reset links random enough that they can\'t be guessed? Do they expire quickly (within an hour)? Can each link only be used once? Is there a limit on how many reset emails someone can request? When a reset fails, does the error message give away whether the email has an account?',
          category: 'security',
          whyItMatters:
            'Password reset is the back door to every account. If reset links follow a pattern or don\'t expire, someone can take over any account.',
        },
        {
          title: 'Can your login handle traffic?',
          prompt:
            'Check how our login system performs under load. How long does the password check take per request? How quickly can it look up session data? If 100 people try to log in at the same time, what happens? Does every page load require a database check to verify the user is logged in?',
          category: 'performance',
          whyItMatters:
            'Login runs on every single page. If it takes even a fraction of a second too long, multiply that by every user on every page — it adds up fast.',
        },
      ],
    },
    smartMove: {
      recommendation: 'use-a-service',
      reasoning:
        'Login is the riskiest thing to build yourself. One mistake exposes every user. Services like Clerk or Auth0 handle security updates, edge cases, and compliance across millions of apps — and most have generous free tiers. Unless you have a very specific reason to build your own, don\'t.',
      services: [
        {
          name: 'Clerk',
          description: 'Plug-and-play login pages, Google/GitHub sign-in, and user management — works great with Next.js',
          freeTier: '10,000 monthly active users free',
        },
        {
          name: 'Auth0',
          description: 'Enterprise-grade login with 30+ social sign-in options and compliance certifications',
          freeTier: '25,000 monthly active users free',
        },
        {
          name: 'Supabase Auth',
          description: 'Good choice if you already use Supabase for your database — login is built in',
          freeTier: '50,000 monthly active users free',
        },
      ],
      tradeoffs:
        'You\'re trusting a third party with your most critical system. If you ever need to switch services, it means rebuilding your entire login flow and migrating all user accounts. Worth it for the security you get in return.',
    },
    checklist: {
      service: [
        { item: 'Accounts lock after several wrong password attempts', category: 'security' },
        { item: 'Users get automatically logged out after a reasonable period (not left logged in forever)', category: 'security' },
        { item: 'Protected pages check login on the server, not just by hiding the link', category: 'security' },
        { item: '"Sign in with Google" redirect URLs point only to your site (no wildcards)', category: 'security' },
        { item: 'Webhook endpoints (notifications from your auth service) verify they\'re really from the service', category: 'security' },
        { item: 'Password reset links expire within an hour', category: 'security' },
        { item: 'The login page doesn\'t reveal whether an email address has an account', category: 'security' },
        { item: 'Your auth service\'s code library is on a recent version', category: 'reliability' },
        { item: 'Your app still works (gracefully) if the auth service goes down temporarily', category: 'reliability' },
        { item: 'Login checks don\'t noticeably slow down page loads', category: 'performance' },
      ],
      diy: [
        { item: 'Passwords are scrambled with a strong method (bcrypt or argon2) — not MD5 or plain SHA', category: 'security' },
        { item: '"Stay logged in" tokens are long, random, and impossible to guess', category: 'security' },
        { item: 'Users get a new token when they change their password or gain new permissions', category: 'security' },
        { item: 'Login attempts are limited (e.g., 10 tries per minute) to prevent password guessing', category: 'security' },
        { item: 'Password reset links expire within an hour and can only be used once', category: 'security' },
        { item: 'Error messages don\'t reveal whether a specific email has an account', category: 'security' },
        { item: 'Forms that change account state (login, password change) are protected against cross-site request forgery', category: 'security' },
        { item: 'Checking if someone is logged in doesn\'t noticeably slow down page loads', category: 'performance' },
        { item: 'Failed login attempts are recorded with timestamps for investigation', category: 'reliability' },
        { item: 'The app shows a helpful error (not a crash) if the login system is temporarily unavailable', category: 'reliability' },
      ],
    },
    didYouKnow: {
      stat: '86% of web application breaches involve stolen login credentials, and it takes an average of 287 days to even detect that it happened.',
      source: 'Verizon 2024 Data Breach Investigations Report',
    },
  },

  Payments: {
    dangerZone: {
      headline: 'A billing bug doesn\'t just lose data — it loses real money and real trust at the same time',
      hiddenComplexity:
        'Adding payments looks like dropping in a Stripe widget. But behind that widget is a maze of things that need to work perfectly: what happens when someone upgrades mid-month, how to retry failed cards without annoying people, calculating tax for different countries, handling refunds and disputes, and making sure your app and your payment provider agree on who\'s paid and who hasn\'t. Every billing bug is either lost revenue or an angry customer.',
      failureScenario:
        'You launch a SaaS with monthly billing. Everything\'s great for a few months. Then a customer downgrades their plan mid-cycle and gets charged full price anyway. You never built the logic for partial refunds. Now you have 200 support emails, a public complaint thread, and your payment provider is flagging you for too many disputes.',
      riskLevel: 'critical',
      timeToBreak: '1-3 months before the first billing dispute becomes a real problem',
      commonMistakes: [
        'Processing the same payment notification twice, causing double charges',
        'No logic for what happens when someone changes plan mid-month (they get overcharged)',
        'Not tagging payments with unique IDs, so retries create duplicate charges',
        'Accidentally logging credit card numbers or payment secrets in error reports',
        'When a card fails, immediately canceling instead of retrying a few times over a few weeks',
      ],
    },
    auditPrompts: {
      service: [
        {
          title: 'Are payment notifications handled correctly?',
          prompt:
            'Look at how we handle notifications (webhooks) from our payment provider like Stripe or Paddle. Check: Do we verify each notification is actually from the provider (not faked)? If the same notification arrives twice, does it only get processed once? Are we listening for all the important events — successful payments, failed payments, subscription changes, cancellations? Is there logging so we can investigate when something goes wrong?',
          category: 'reliability',
          whyItMatters:
            'Payment notifications are how your app knows someone paid. If one gets missed, a paying customer loses access. If one gets processed twice, someone gets charged twice.',
        },
        {
          title: 'Does your app agree with your payment provider about who\'s paid?',
          prompt:
            'Check that our app and our payment provider (Stripe, Paddle, etc.) always agree on subscription status. If someone upgrades, downgrades, or cancels through the provider\'s dashboard (not just our UI), does our app update? Is there a way to detect when they get out of sync? Are we using the provider\'s built-in proration (partial billing) instead of trying to calculate it ourselves?',
          category: 'cost',
          whyItMatters:
            'If your database says someone is paying but Stripe says they canceled, either they\'re getting free access or you\'re losing track of revenue.',
        },
        {
          title: 'Is payment data kept secure?',
          prompt:
            'Check our payment setup for basic security. Are secret API keys only used on the server (never in browser code)? Do credit card numbers show up anywhere in our logs or error tracking? Are we using the payment provider\'s pre-built payment forms (not collecting card numbers ourselves)? Are test and live modes properly separated?',
          category: 'security',
          whyItMatters:
            'Handling credit card data incorrectly can result in fines and losing the ability to accept payments entirely. Using the provider\'s payment forms keeps you safe.',
        },
        {
          title: 'What happens when a payment fails?',
          prompt:
            'Check what happens when someone\'s card gets declined. Is there an automatic retry sequence (trying again in a few days, then a week)? Does the user get an email telling them to update their card? Do they lose access immediately or get a grace period? Is there a page where they can easily update their payment method?',
          category: 'cost',
          whyItMatters:
            'Failed cards cause 20-40% of subscription cancellations. The difference between "immediately cancel" and "retry with a friendly email" can be thousands of dollars in saved revenue.',
        },
      ],
      diy: [
        {
          title: 'Will payment notifications break if something goes wrong?',
          prompt:
            'Look at how we handle payment notifications (webhooks). If the same notification arrives twice, does it only get processed once? Do we verify each notification is really from Stripe (not someone faking it)? If notifications arrive out of order, does our code handle it? If our server was down when a notification came in, will it get retried? Is there a record of failed notifications so we can investigate?',
          category: 'reliability',
          whyItMatters:
            'Webhooks are how your app knows someone paid. Miss one and a paying customer loses access. Process one twice and someone gets double-charged.',
        },
        {
          title: 'Does every billing scenario actually work?',
          prompt:
            'Walk through every possible billing situation: someone signs up, upgrades, downgrades, cancels, pauses, reactivates, their trial expires, their card fails. For each one: does the charge amount make sense (especially for mid-month changes)? Does their access update immediately? Do they get a notification? Does your database match what Stripe shows?',
          category: 'cost',
          whyItMatters:
            'Subscriptions have 15+ possible scenarios. Missing even one means either you\'re losing money or a customer is getting locked out of something they paid for.',
        },
        {
          title: 'Is credit card data being handled safely?',
          prompt:
            'Search our entire codebase for anything that looks like credit card handling. Are card numbers showing up in any logs? Are we using Stripe\'s payment forms (Elements/Checkout) so card numbers never touch our server? Are API keys only on the server (never in browser code)? Are test and production environments properly separated?',
          category: 'security',
          whyItMatters:
            'Mishandling credit card data can result in fines of $5,000-$100,000 per month and permanently losing the ability to accept payments.',
        },
        {
          title: 'Are you quietly losing money?',
          prompt:
            'Look for ways revenue might be leaking. When a card fails, do we retry a few times before canceling? Do free trials actually end when they\'re supposed to? Do discount codes have expiration dates and usage limits? Are refunds restricted to authorized users? Does the amount charged always match what the customer sees?',
          category: 'cost',
          whyItMatters:
            'The average subscription business loses 1-5% of revenue to billing bugs. That\'s money quietly disappearing every month.',
        },
      ],
    },
    smartMove: {
      recommendation: 'use-a-service',
      reasoning:
        'Handling real money means legal requirements, fraud risk, and hundreds of edge cases across currencies, taxes, and payment methods. Nobody should build their own payment processing. The only question is which service to use.',
      services: [
        {
          name: 'Stripe',
          description: 'The industry standard — handles one-time payments, subscriptions, invoicing, tax, and fraud detection',
          freeTier: 'No monthly fee — 2.9% + 30 cents per transaction',
        },
        {
          name: 'Paddle',
          description: 'Handles global tax and compliance for you — you never think about VAT or sales tax',
          freeTier: '5% + 50 cents per transaction (but no tax headaches)',
        },
        {
          name: 'LemonSqueezy',
          description: 'Simpler alternative to Paddle, popular with solo founders and indie products',
          freeTier: '5% + 50 cents per transaction',
        },
      ],
      tradeoffs:
        'Transaction fees add up as you grow, and you\'re subject to the provider\'s rules on disputes and payouts. Stripe gives more control but more responsibility; Paddle/Lemon handle taxes automatically but take a bigger cut.',
    },
    checklist: {
      service: [
        { item: 'Payment notifications are verified as actually coming from your provider (not faked)', category: 'security' },
        { item: 'If the same notification arrives twice, it doesn\'t cause a double charge', category: 'reliability' },
        { item: 'Upgrading or downgrading mid-month charges the right amount (not the full new price)', category: 'data' },
        { item: 'Failed cards get retried a few times before the subscription is canceled', category: 'reliability' },
        { item: 'Credit card numbers don\'t appear anywhere in your logs or error reports', category: 'security' },
        { item: 'Your app and your payment provider always agree on who has an active subscription', category: 'data' },
        { item: 'Tax is handled by your provider or a tax service (you\'re not calculating it yourself)', category: 'data' },
        { item: 'Only authorized people can issue refunds', category: 'security' },
        { item: 'Users get notified when their payment fails (not just silently cut off)', category: 'reliability' },
        { item: 'The payment form uses your provider\'s pre-built UI (you never touch raw card numbers)', category: 'security' },
      ],
      diy: [
        { item: 'Payment notifications are verified as actually from Stripe (signature checked)', category: 'security' },
        { item: 'Each payment request has a unique ID so retries don\'t create duplicate charges', category: 'reliability' },
        { item: 'Mid-month plan changes calculate the correct prorated amount', category: 'data' },
        { item: 'Failed cards are retried over 2-4 weeks before canceling (not immediately)', category: 'reliability' },
        { item: 'No credit card numbers appear in any logs or error tracking', category: 'security' },
        { item: 'Your database and Stripe always agree on who\'s subscribed', category: 'data' },
        { item: 'Tax calculations cover every country/state you sell to', category: 'data' },
        { item: 'Refunds have proper authorization and an audit trail', category: 'security' },
        { item: 'If a payment notification fails to process, it\'s saved for investigation (not lost)', category: 'reliability' },
        { item: 'Money amounts are stored as whole numbers (cents, not dollars with decimals) to avoid rounding errors', category: 'data' },
      ],
    },
    didYouKnow: {
      stat: 'Each payment dispute costs an average of $190 in fees, penalties, and lost product — and if more than 1% of your payments get disputed, your payment provider can shut down your account.',
      source: 'Chargebacks911 2024 Industry Report',
    },
  },
};
