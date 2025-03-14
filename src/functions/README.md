
# Firebase Cloud Functions for Email Notifications

These functions send email notifications when users submit the contact form or subscribe to the newsletter.

## Setup Instructions

1. Install the Firebase CLI globally:
   ```
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```
   firebase login
   ```

3. Initialize your project (if not already done):
   ```
   firebase init functions
   ```

4. Set up environment variables for the email service:
   ```
   firebase functions:config:set email.user="your-email@gmail.com" email.password="your-app-password"
   ```
   
   Note: For Gmail, you'll need to create an "App Password" in your Google Account settings.

5. Deploy the functions:
   ```
   firebase deploy --only functions
   ```

## Important Notes

- The email will be sent to victoria@inspire-live.com for both contact form submissions and newsletter subscriptions.
- For Gmail, you need to use an App Password, not your regular password.
- These functions require the Blaze (pay-as-you-go) plan on Firebase.
