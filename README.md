
# JobIndians Portal - Professional Indian Citizen Services

Official unified portal for Indian exam results, admit cards, and recruitment notifications.

## Features
- **Official Service Directory**: Verified links to SSC, UPSC, NTA, and State Boards.
- **Exam Calendar**: Live schedules for major government exams.
- **Interactive Ticker**: Instant scrolling updates for active notifications.
- **Live Status Tracker**: Monitor official government server uptime (SSC, NTA, etc.).
- **Professional UI**: Premium typography-focused design optimized for mobile.

## AdSense Configuration
The portal is pre-configured with Google AdSense. 
- **Client ID**: `ca-pub-5471667535888198`
- **Slot ID**: `3693488562`

## Hosting & Deployment
This portal is built with Next.js and Firebase. To deploy:

1. **Connect GitHub**: Push this repository to your GitHub account.
2. **Firebase App Hosting**:
   - Go to the [Firebase Console](https://console.firebase.google.com/).
   - Select your project.
   - Navigate to "App Hosting" and connect your GitHub repository.
3. **Firestore Database Setup**:
   - Create a `services` collection.
   - Create a `config/tickerMessages` document for marquee updates.

## Performance & Security
- **Next.js 15**: Leveraging the latest App Router and Server Components.
- **Firebase Security Rules**: Pre-set to allow public reading of services.
